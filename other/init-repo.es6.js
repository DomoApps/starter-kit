import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import kebabCase from 'lodash.kebabcase';
import shelljs from 'shelljs';

// TODO: update with the repo location on Github after we migrate
const STARTER_REPO = 'git@git.empdev.domo.com:AppTeam6/da-webpack.git';
const GENERATOR_KEYWORDS = ['da-webpack', 'starter-kit'];

const QUESTIONS = [
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

const remotes = getRemotesAsMap();
if (remotes.has('generator')) {
  console.log(`Your repo is already setup to receive dev tool updates. Run ${chalk.bold('npm run update-tools')} for updates.`);
} else if (hasChangedOriginRemote(remotes)) {
  addGeneratorRemote();
} else {
  initializeProject();
}

function getRemotesAsMap() {
  const remotes = new Map();

  const remotesOutput = shelljs.exec('git remote -v', { silent: true }).output;
  remotesOutput.trim()
    .split('\n')
    .filter(line => line.indexOf('(fetch)') !== -1)
    .forEach(remoteLine => {
      const [name, verboseLocation] = remoteLine.split('\t');
      const location = verboseLocation.replace(' (fetch)', '');
      remotes.set(name, location);
    });

  return remotes;
}

function hasChangedOriginRemote(remotes) {
  const originRemote = remotes.get('origin');

  let hasChanged = true;
  for (const keyword of GENERATOR_KEYWORDS) {
    if (originRemote.indexOf(keyword) !== -1) {
      hasChanged = false;
      break;
    }
  }

  return hasChanged;
}

function addGeneratorRemote() {
  const results = shelljs.exec(`git remote add generator ${STARTER_REPO}`);
  if (results.code === 0) {
    console.log(`${chalk.green('SUCCESS!')} The ${chalk.bold('generator')} remote has been setup. ` +
                `Run ${chalk.bold('npm run update-tools')} for updates.`);
  } else {
    console.log(`${chalk.red('ERROR:')} ${results.output}`);
  }
}

function initializeProject() {
  inquirer.prompt(QUESTIONS, answers => {
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
}

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


