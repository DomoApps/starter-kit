import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import kebabCase from 'lodash.kebabcase';
import shelljs from 'shelljs';

const questions = [
  {
    type: 'input',
    name: 'name',
    message: `what is your app's name?`,
  },
  {
    type: 'input',
    name: 'description',
    message: 'what is a brief description of your app?',
  },
  {
    type: 'input',
    name: 'git',
    message: 'what is your git url?'
  }
];

inquirer.prompt(questions, answers => {
  setupPackage({ name: kebabCase(answers.name), description: answers.description, git: answers.git })
    .then(setupGit)
    .then(() => {
      console.log(chalk.green('Success!'));
      console.log(chalk.white('Don\'t forget to setup your manifest.json and run `domo publish`'));
    })
    .catch((err) => {
      console.log(chalk.red('There was an error!'));
      console.error(err);
    });
});

function setupPackage({ name, description, git }) {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, '../package.json');
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);

      const p = JSON.parse(data);
      p.name = name;
      p.version = '0.0.1';
      p.description = description;
      p.repository = git;

      fs.writeFile(filePath, JSON.stringify(p, null, 4), (err, data) => {
        if (err) reject(err);

        resolve({ name, description, git });
      });
    });
  });
}

function setupGit({ name, description, git }) {
  shelljs.exec('git remote rename origin generator');
  shelljs.exec(`git remote add origin ${git}`);
  shelljs.exec('git push -u origin master');
}


