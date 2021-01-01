const fs = require('fs');
const http = require('isomorphic-git/http/node');
const git = require('isomorphic-git');
const util = require('util');
const rmfr = require('rmfr');
const CustomError = require('./cypress/support/errors/CustomError');
const exec = util.promisify(require('child_process').exec);
const execCb = require('child_process').exec;

if (!process.env.RUN) {
  process.exit(0);
}

const taskId = process.env.TASK_ID;
const headed = process.env.HEADED ? '--headed' : '';
const repoUrl = process.env.REPO_URL;
const tempDir = `./.tmp`;

console.log(`Initiating tests for task ${taskId}...`);

// Clone 
// Install
// Run
// Test 

(async () => {
  try {
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
  
  // The Cypress task is a bit weird that's why we're using outside of primises 
  const output = execCb(
    `npm run test -- ${headed} --spec "cypress/integration/task-${taskId}.js"`, {
      env: process.env
    }
  );
  
  output.stdout.on('data', (data) => {
    console.log(data);
  });
  
  output.stderr.on('data', (data) => {
    console.log(data);
    process.exit(1);
  });
})();

