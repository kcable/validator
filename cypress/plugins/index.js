/// <reference types="cypress" />
const fs = require('fs');
const rmfr = require('rmfr');
const http = require('isomorphic-git/http/node');
const git = require('isomorphic-git');
const CustomError = require('../support/errors/CustomError');

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('task', {
    async gitLog({ dir = './.tmp', depth = 100, ref = 'HEAD' } = {}) {
      try {
        return await git.log({
          fs,
          dir,
          depth,
          ref
        })
      } catch (error) {
        throw new CustomError(CustomError.list.GIT_SHOW_LOG_NO_MASTER, error);
      }
    },

    async gitClone({ url, dir }) {
      await git.clone({
        fs,
        url,
        dir,
        http
      });
      return true;
    },

    async rmDir({ dir }) {
      await rmfr(dir);
      return true;
    }
  })
}
