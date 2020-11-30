const { exec } = require('child_process');

// clone project - Project url should be passed in trough gitlab. Project should be cloned in /temp

// install project - npm i

// run project - npm start

console.log('Testing...');

const output = exec('npm run test -- --spec "cypress/integration/task-1.js"', {
  env: {
    ...process.env,
    CYPRESS_REPO_URL: "https://gitlab.com/mitkodkn/test-repo.git"
  }
});

output.stdout.on('data', (data) => {
  console.log(data);
});

output.stderr.on('data', () => {
  process.exit(1);
});
