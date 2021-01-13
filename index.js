
const exec = require('child_process').exec;
const clone = require('./src/clone');
const install = require('./src/install');
const start = require('./src/start');

const env = process.env;
const open = env.OPEN;
const taskId = env.TASK_ID;
const headed = env.HEADED ? '--headed' : '';
const url = env.REPO_URL;
const dir = `./.tmp`;

if (!env.RUN) process.exit(0);

(async () => {
  console.log(`Initiating tests for task ${taskId}...`);
  console.log(` DIRECTORY: ${dir}`);

  await clone({ dir, url });
  await install({ dir });

  // Run the start script if the project has one
  const package = require(`${dir}/package.json`);
  if(package.scripts.start) await start({ dir });

  console.log(`Starting to run tests...`);
  // The Cypress task is a bit weird that's why we're using outside of primises 
  const cmd = open ? `npm run cypress:open` : `npm run test -- ${headed} --spec "cypress/integration/task-${taskId}.js"`;
  const output = exec(cmd, { env: process.env });
  
  output.stdout.on('data', (data) => {
    console.log(data);

    // We have to exit manually because the task doesn't do it itself
    if(data.includes('Run Finished')) {
      process.exit(0);
    }
  });
  
  output.stderr.on('data', (data) => {
    console.log(data);
    process.exit(1);
  });
})();