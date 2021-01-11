
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const CustomError = require('../cypress/support/errors/CustomError');

/**
 * Installs the dependencies in a specified directory
 * @param {String} dir - The directory where the repository will be cloned
 */
module.exports = async ({ dir = './' }) => {
  try {
    console.log(`Installing dependencies in ${dir}...`);

    const { stderr } = await exec('npm i', { cwd: dir });
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
}