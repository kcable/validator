const CustomError = require("../support/errors/CustomError");

context('task-19', () => {
  it('should load the Play scene', () => {
    cy.visit('/');

    cy.getPixiStage().getPixiElementByName('footer').then((el) => {
      console.log(el);
    })
  });
});
