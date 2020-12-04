const { exec } = require('child_process');

// clone project - Project url should be passed in trough gitlab. Project should be cloned in /temp

// install project - npm i

// run project - npm start

if (!process.env.RUN) {
  process.exit(0);
}

const taskId = process.env.TASK_ID;

console.log(`Running tests for task ${taskId}...`);

const output = exec(
  `npm run test -- --spec "cypress/integration/task-${taskId}.js`, {
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
