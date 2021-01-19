const fs = require('fs');
const http = require('isomorphic-git/http/node');
const git = require('isomorphic-git');
const rmfr = require('rmfr');
const CustomError = require('../cypress/support/errors/CustomError');

/**
 * Clones the project the tests will be cloned against
 * @param {String} url - The url of the git repository
 * @param {String} dir - The directory where the repository will be cloned
 */
module.exports = async ({ url, dir = './' }) => {
  try {
    console.log(`Cleaning up the directory ${dir}...`);
    await rmfr(dir);

    console.log(`Cloning repository...`);
    await git.clone({ fs, url, dir, http });

  } catch (error) {
    throw new CustomError({
      issue: `Не успяхме да клонираме repository-то`,
      tips: [
        'Увери се, че си копирал адреса правилно',
        'Увери се, че проекта е публичен, като отвориш адреса на проекта в incognito',
      ]
    }, error);
  }
}
