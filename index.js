const fs = require('fs');
const http = require('isomorphic-git/http/node');
const git = require('isomorphic-git');
const util = require('util');
const rmfr = require('rmfr');
const CustomError = require('./cypress/support/errors/CustomError');
const exec = util.promisify(require('child_process').exec);
const execCb = require('child_process').exec;
const waitOn = require('wait-on');

if (!process.env.RUN) {
  process.exit(0);
}

const open = process.env.OPEN;
const taskId = process.env.TASK_ID;
const headed = process.env.HEADED ? '--headed' : '';
const repoUrl = process.env.REPO_URL;
const tempDir = `./.tmp`;

console.log(`Initiating tests for task ${taskId}...`);

(async () => {
  try {
    console.log(`Cleaning up temp repository ${tempDir}...`);
    await rmfr(tempDir);

    console.log(`Cloning repository ${repoUrl}...`);
    await git.clone({
      fs,
      url: repoUrl,
      dir: tempDir,
      http
    });
  } catch (error) {
    throw new CustomError({
      issue: `Не успяхме да клонираме repository-то`,
      tips: [
        'Увери се, че си копирал адреса правилно',
        'Увери се, че проекта е публичен, като отвориш адреса на проекта в incognito',
      ]
    }, error);
  }
  
  try {
    console.log(`Installing dependencies ${repoUrl}...`);

    const { stdout, stderr } = await exec('npm i', { cwd: tempDir });
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (error) {
    throw new CustomError({
      issue: `Не успяхме да изпълним "npm install" на repository-то`,
      tips: [
        'Увери се, че си направил fork-а правилно и прочети повече тук: https://app.booost.bg/courses/5/steps/31?trackId=2',
        'Увери се, че съществува package.json',
        'Увери се, че съществува package-lock.json',
      ]
    }, error);
  }

  // If the project has a start script run it and wait for the dev server to be started
  const package = require(`${tempDir}/package.json`);
  if(package.scripts.start) {
    try {
      console.log(`Starting dev server ${repoUrl}...`);
  
      const { stdout, stderr } = exec('npm start', { cwd: tempDir });
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    } catch (error) {
      throw new CustomError({
        issue: `Не успяхме да изпълним "npm install" на repository-то`,
        tips: [
          'Увери се, че си направил fork-а правилно и прочети повече тук: https://app.booost.bg/courses/5/steps/31?trackId=2',
          'Увери се, че съществува package.json',
          'Увери се, че съществува package-lock.json',
        ]
      }, error);
    }

    try {
      console.log(`Waiting for dev server to start ${repoUrl}...`);
  
      await waitOn({
        resources: [
          'http://localhost:8080',
        ]
      });
    } catch (error) {
      throw new CustomError({
        issue: `Не успяхме да изпълним "npm install" на repository-то`,
        tips: [
          'Увери се, че си направил fork-а правилно и прочети повече тук: https://app.booost.bg/courses/5/steps/31?trackId=2',
          'Увери се, че съществува package.json',
          'Увери се, че съществува package-lock.json',
        ]
      }, error);
    }
  }
  
  console.log(`Starting to run tests ${repoUrl}...`);
  // The Cypress task is a bit weird that's why we're using outside of primises 
  const cmd = open ? `npm run cypress:open` : `npm run test -- ${headed} --spec "cypress/integration/task-${taskId}.js"`;
  const output = execCb(cmd, { env: process.env });
  
  output.stdout.on('data', (data) => {
    console.log(data);
  });
  
  output.stderr.on('data', (data) => {
    console.log(data);
    process.exit(1);
  });
})();