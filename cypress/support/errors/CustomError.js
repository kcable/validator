const common = require('./common');
const Mustache = require('mustache');

class CustomError {
  constructor(error, original, params) {
    if(!error) return Error(`No error type found. You can add one in 'cypress/support/errors/list.js'.`);

    const issue = Mustache.render(error.issue, params);
    const tips = error.tips.map(s => `\n- ${Mustache.render(s, params)}`).join('')

    return Error(`
ooo
----------------------------------------------------------------------------
Грешка: ${issue}
Препоръки: ${tips}
Оригинал: ${original}
----------------------------------------------------------------------------
`);

  }
}

CustomError.common = common;

module.exports = CustomError;