const CustomError = require("../support/errors/CustomError");

context('task-27', () => {
  it('should have JS app', () => {
    cy.visit(Cypress.config('url'));
    cy.getJsApp(new CustomError(CustomError.common.JS_APP_NOT_FOUNT)).then(app => expect(app).to.exist);
  });

  it('should have data set in Application.js', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        expect(Object.keys(app.data).length, new CustomError({
          issue: `Няма set-ната data в Application.js`,
          tips: [
            `Увери се, че в Application.data се сетват нужните property-та описани в условието`
          ]
        })).to.be.gt(0);
      });
    });
  });

  it('data count should be 60', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data);
        expect(app.data.count, new CustomError({
          issue: `Data-та на Application-a няма property count или count-a не е правилно set-нат`,
          tips: [
            `Увери се, че в Application.js е сетнато count property на data-та`,
            `Увери се, че count property-то на Application.js отговаря на броя планети в API-то`
          ]
        })).to.eq(60);
      });
    });
  });

  it('data planets should be array', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data);
        expect(Array.isArray(app.data.planets), new CustomError({
          issue: `Data-та на Application.data.planets property-то не е масив`,
          tips: [
            `Увери се, че в Application.js е сетнато planets property на data-та, което е масив.`
          ]
        })).to.be.true;
      });
    });
  });

  it('elements in planets property should be equal to count proeprty', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data);
        expect(app.data.planets.length, new CustomError({
          issue: `Броя на планетите в planets property-то не е равен на броя set-нат в count property-то на data-та`,
          tips: [
            `Увери се, че броя на планетите е равен на елементите добавени в planets property-то на data-та в Application.js`
          ]
        })).to.be.eq(app.data.count);
      });
    });
  });
});