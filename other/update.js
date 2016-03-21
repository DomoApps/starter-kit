'use strict';

const shelljs = require('shelljs');
const path = require('path');
const chalk = require('chalk');

if (hasUncommittedChanges()) {
  console.log(`${chalk.red('ERROR:')} you have uncommitted changes. Please commit or stash them before updating.`);
  process.exit(1);
}

if (!hasGeneratorRemote()) {
  console.log(`${chalk.red('ERROR:')} no ${chalk.bold('generator')} remote found. Exiting.`);
  process.exit(1);
}

update();

console.log(`${chalk.yellow('WARNING:')} Make sure to review the changes with ${chalk.bold('git diff HEAD')} before ` +
            `committing, so no accidental changes are made to your app.`);

function hasUncommittedChanges() {
  const statusOutput = shelljs.exec('git status --porcelain', { silent: true }).output;
  return (statusOutput !== '');
}

function hasGeneratorRemote() {
  const remoteOutput = shelljs.exec('git remote -v', { silent: true }).output;

  let found = false;
  remoteOutput.split('\n').forEach(line => {
    if (line.indexOf('generator') === 0) {
      found = true;
    }
  });

  return found;
}

function update() {
  shelljs.exec('git fetch generator');
  shelljs.exec('git merge --no-commit generator/master');
}
