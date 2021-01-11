const clone = require('./src/clone');
const install = require('./src/install');
const start = require('./src/start');
const test = require('./src/test');

const env = process.env;
const open = env.OPEN;
const taskId = env.TASK_ID;
const headed = env.HEADED ? '--headed' : '';
const url = env.REPO_URL;
const dir = `./.tmp`;

if (!env.RUN) process.exit(0);

(async () => {
  console.log(`Initiating tests for task ${taskId}...`);

  await clone({ dir, url });
  await install({ dir });

  // Run the start script if the project has one
  const package = require(`${dir}/package.json`);
  if(package.scripts.start) await start({ dir });

  test({ taskId, headed, open });
})();