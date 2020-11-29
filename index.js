const { exec } = require('child_process');

// clone project - Project url should be passed in trough gitlab. Project should be cloned in /temp

// install project - npm i

// run project - npm start

// test project - cypress run --spec "cypress/integration/{{SPEC}}". {{SPEC}} should be passed in trough gitlab

console.log('Running...')

const output = exec('npm run test -- --spec "cypress/integration/task-1.js"');

output.stdout.on('data', function(data) {
  console.log(data); 
});