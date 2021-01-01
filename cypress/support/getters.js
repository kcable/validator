import objectPath from 'object-path';

/**
 * Searches the provided PIXI object's children and their children
 * for a particular element ex: LoadingScreen
 * @param searchObject
 * @param element
 * @returns {element}
 */
const getPixiElementByName = (searchObject, element) => {
  const elements = [];

  const find = (children) => {
    children.forEach((item) => {
      item.name === element && elements.push(item);
      item.children.length > 0 && find(item.children);
    });
  };

  find(searchObject.children);

  return elements[0];
};

/**
 * Simulates cypress' retry functionality for custom cy. methods
 * @param callback
 * @returns {Promise}
 */
const searchUntil = (callback) => {
  return new Promise((resolve, reject) => {
    const timeLimit = Cypress.config().defaultCommandTimeout;
    let result = null,
      counter = 0;
    let intervalId = setInterval(() => {
      result = callback();
      if (result) {
        clearInterval(intervalId);
        resolve(result);
      } else {
        counter += 100;
      }
      if (counter >= timeLimit) resolve(result);
    }, 100);
  });
};

Cypress.Commands.add('getPixiApp', () => {
  cy.window().then((win) => {
    cy.wrap(win).its('__PIXI_APP').then(__PIXI_APP => __PIXI_APP);
  });
});

Cypress.Commands.add('getPixiStage', () => {
  cy.getPixiApp().its('stage');
});

Cypress.Commands.add('getPixiElementByName', {
  prevSubject: true
}, (searchObject, element) => searchUntil(() => getPixiElementByName(searchObject, element)));

Cypress.Commands.add('getPixiChildAt', {
  prevSubject: true
}, (searchObject, index) => {
  return searchUntil(() => {
    return searchObject.children[index];
  });
});

Cypress.Commands.add('getPixiElementByPath', {
  prevSubject: true
}, (searchObject, path) => {
  return searchUntil(() => {
    return objectPath.get(searchObject, path);
  });
});