const list = require('./list');

class CustomError {
  constructor(error, original) {
    if(!error) return Error(`No error type found. You can add one in 'cypress/support/errors/list.js'.`);

    return Error(`
ooo
----------------------------------------------------------------------------
Грешка: ${error.issue}
Препоръки: ${error.tips.map(s => `\n- ${s}`).join('') }
Оригинал: ${original}
----------------------------------------------------------------------------
`);

  }
}

CustomError.list = list;

module.exports = CustomError;