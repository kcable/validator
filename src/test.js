
const exec = require('child_process').exec;

/**
 * Runs the tests via Cypress for a task
 * @param {String} taskId - This correlates with the name of the spec eg TASK_ID=1 will run spec cypress/integration/task-1.js
 * @param {String} headed - Whether to execute the test script in headed mode (the cypress window being visible)
 * @param {String} open - Whether to open the cypress window for test development and debugging
 */
module.exports = ({ taskId, headed, open }) => {
  console.log(`Starting to run tests...`);
  // The Cypress task is a bit weird that's why we're using outside of primises 
  const cmd = open ? `npm run cypress:open` : `npm run test -- ${headed} --spec "cypress/integration/task-${taskId}.js"`;
  const output = exec(cmd, { env: process.env });
  
  output.stdout.on('data', (data) => {
    console.log(data);

    // We have to exit manually because the task doesn't do it itself
    if(data.includes('(Run Finished)')) {
      process.exit(0);
    }
  });
  
  output.stderr.on('data', (data) => {
    console.log(data);
    process.exit(1);
  });
}