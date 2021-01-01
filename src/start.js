
const util = require('util');
const waitOn = require('wait-on');
const exec = util.promisify(require('child_process').exec);
const CustomError = require('../cypress/support/errors/CustomError');

/**
 * Starts the development server 
 * @param {String} dir - The directory where the repository will be cloned
 */
module.exports = async ({ dir = './' }) => {
  try {
    console.log(`Starting dev server in ${dir}...`);

    const { stderr } = exec('npm start', { cwd: dir });
    if(stderr) console.log('stderr:', stderr);
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
    console.log(`Waiting for dev server to start...`);

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