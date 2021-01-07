const CustomError = require("../support/errors/CustomError");

context('task-29', () => {
  it('should have JS app', () => {
    cy.visit('/');
    cy.getJsApp(new CustomError(CustomError.common.JS_APP_NOT_FOUNT)).then(app => expect(app).to.exist);
  });

  it('should have data set in Application.js', () => {
    cy.visit('/');
    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data);
        expect(Object.keys(app.data).length, new CustomError({
          issue: `Няма set-ната data в Application.js`,
          tips: [
            `Увери се, че в Application.data се сетват нужните property-та описани в условието`
          ]
        })).to.be.gt(0);
      });
    });
  });

  it('should have a StarWarsUniverse.js which is an es6 class', () => {
    cy.task('readFileSync', { file: 'src/app/custom/StarWarsUniverse.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'StarWarsUniverse.js не е es6 class',
        tips: [
          'Усерви се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва StarWarsUniverse'
        ]
      })).to.include('export default class StarWarsUniverse');
    });
  });

  it('should have a Entity.js which is an es6 class', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Entity.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Entity.js не е es6 class',
        tips: [
          'Усерви се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Entity'
        ]
      })).to.include('export default class Entity');
    });
  });

  it('should have a data property called universe', () => {
    cy.visit('/');
    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.hasOwnProperty('universe'), new CustomError({
          issue: `В Application.data няма сетнато property 'universe', което да сочи към StarWarsUniverse класа`,
          tips: [
            `Увери се, че в Application.data се сетват нужните property-та описани в условието`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true;
      });
    });
  });

  it('should have StarWarsUniverse with property called entitites', () => {
    cy.visit('/');
    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.universe.hasOwnProperty('entities'), new CustomError({
          issue: `StarWarsUniverse няма сетнато property 'entities'`,
          tips: [
            `Увери се, че в StarWarsUniverse класа се сетва property entitites`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true;
      });
    });
  });

  it('should StarWarsUniverse.entities which should be an array', () => {
    cy.visit('/');
    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(Array.isArray(app.data.universe.entities), new CustomError({
          issue: `StarWarsUniverse.entities трябва да е масив'`,
          tips: [
            `Увери се, че в StarWarsUniverse класа се сетва property entitites, което е масив`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true;
      });
    });
  });

  it('should have a StarWarsUniverse.entities with six elements', () => {
    cy.visit('/');
    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.universe.entities.length, new CustomError({
          issue: `StarWarsUniverse.entities трябва да е масив'`,
          tips: [
            `Увери се, че в StarWarsUniverse.entities са добавени всички елементи, fetch-нати от Root resource-a на API-то`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.eq(6);
      });
    });
  });

  it('should have entity object which have name property', () => {
    cy.visit('/');
    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.universe.entities[0].hasOwnProperty('name'), new CustomError({
          issue: `StarWarsUniverse.entities трябва да е масив'`,
          tips: [
            `Увери се, че всяко Entity в StarWarsUniverse.entities има property name`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true
      });
    });
  });

  it('should have entity object which have data property', () => {
    cy.visit('/');
    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.universe.entities[0].hasOwnProperty('data'), new CustomError({
          issue: `StarWarsUniverse.entities трябва да е масив'`,
          tips: [
            `Увери се, че всяко Entity в StarWarsUniverse.entities има property data`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true
      });
    });
  });

  it('should have an entity with data property with assigned count property', () => {
    cy.visit('/');
    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.universe.entities[0].data.hasOwnProperty('count'), new CustomError({
          issue: `StarWarsUniverse.entities трябва да е масив'`,
          tips: [
            `Увери се, че всяко Entity в StarWarsUniverse.entities има property data, в което има нужната информация fetch-ната от API-то`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true
      });
    });
  });
});

