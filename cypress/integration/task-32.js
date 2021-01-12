const CustomError = require("../support/errors/CustomError");

context('task-32', () => {
  it('should have JS app', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp(new CustomError(CustomError.common.JS_APP_NOT_FOUNT)).then(app => expect(app).to.exist);
  });

  it('should have a helper function called delay', () => {
    cy.task('readFileSync', { file: 'src/app/utils.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'в src/app/utils.js няма helper function с име delay',
        tips: [
          'Увери се, че е добавена helper function в src/app/utils.js, която се казва delay',
        ]
      })).to.include('delay');
    });
  });

  it('should have data set in Application.js', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data);
        expect(Object.keys(app.data).length, new CustomError({
          issue: `Няма set-ната data в Application.js`,
          tips: [
            `Увери се, че в Application.data се сетват нужните property-та описани в условието`,
            `Увери се, че APP_READY евентът се емитва, след като StarWarsUniverse.init се е изпълнил`
          ]
        })).to.be.gt(0);
      });
    });
  });

  it('should have a data property called universe', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data);
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

  it('should have a StarWarsUniverse.js which is an es6 class', () => {
    cy.task('readFileSync', { file: 'src/app/custom/StarWarsUniverse.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'StarWarsUniverse.js не е es6 class',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва StarWarsUniverse'
        ]
      })).to.include('export default class StarWarsUniverse');
    });
  });

  it('should have a Planet.js which is an es6 class', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Planet.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Planet.js не е es6 class',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Planet'
        ]
      })).to.include('export default class Planet');
    });
  });

  it('should have a Person.js which is an es6 class', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Person.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Person.js не е es6 class',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Person'
        ]
      })).to.include('export default class Person');
    });
  });

  it('should have a Film.js which is an es6 class', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Film.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Film.js не е es6 class',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Film'
        ]
      })).to.include('export default class Film');
    });
  });

  it('should have a StarWarsUniverse.js which extends eventemitter3', () => {
    cy.task('readFileSync', { file: 'src/app/custom/StarWarsUniverse.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'StarWarsUniverse.js не е es6 class',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва StarWarsUniverse',
          'Увери се, че StarWarsUniverse extend-ва eventemitter3',
        ]
      })).to.include('class StarWarsUniverse extends');
    });
  });

  it('should have a Planet.js which extends eventemitter3', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Planet.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Planet.js не е es6 class',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Planet',
          'Увери се, че Planet extend-ва eventemitter3',
        ]
      })).to.include('class Planet extends');
    });
  });

  it('should have a StarWarsUniverse.js which has static getter for events', () => {
    cy.task('readFileSync', { file: 'src/app/custom/StarWarsUniverse.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'StarWarsUniverse.js няма static getter за евентите',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва StarWarsUniverse',
          'Увери се, че StarWarsUniverse има static getter с име events',
        ]
      })).to.include('static get events');
    });
  });

  it('should have a Planet.js which has static getter for events', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Planet.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Planet.js няма static getter за евентите',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Planet',
          'Увери се, че Planet има static getter с име events',
        ]
      })).to.include('static get events');
    });
  });

  it('should have StarWarsUniverse with property called films which is an Array', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(Array.isArray(app.data.universe.films), new CustomError({
          issue: `StarWarsUniverse.films не е масив`,
          tips: [
            `Увери се, че в StarWarsUniverse класа се сетва property films, което е масив`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true;
      });
    });
  });

  it('should have 10 people in Planet.populationCount when universe_populated is emitted', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');
      cy.wait(500).then(() => {
        cy.wrap(app.data.universe).onEvent('universe_populated');

        cy.wait(500).then(() => {
          cy.log(app.data);
          expect(app.data.universe.planet.populationCount, new CustomError({
            issue: `При emit-ване на евента universe_populated, Planet.populationCount не е 10`,
            tips: [
              `Увери се, че app_ready се емитва от Application.js след като е създаден instance на StarWarsUniverse`,
              `Увери се, че в Application.data се сетват нужните property-та описани в условието`,
              `Увери се, че евентът universe_populated се емитва, когато е приключила рекурсията и са добавени всички елементи на Planet.population`,
              `Увери се, че Planet.populationCount е getter, който връща колко елемента има в Planet.population`
            ]
          })).to.be.eq(10);
        });
      });
    });
  });

  it('should have 6 films in StarWarsUniverse.films when universe_populated is emitted', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');
      cy.wait(500).then(() => {
        cy.wrap(app.data.universe).onEvent('universe_populated');

        cy.wait(1000).then(() => {
          cy.log(app.data);

          expect(app.data.universe.films.length, new CustomError({
            issue: `След изпълнение на рекурсията, не са добавени правилния брой филми в StarWarsUniverse.films`,
            tips: [
              `Увери се, че евентът universe_populated се емитва, когато е приключила рекурсията`,
              `Увери се, че правилно са създадени елементите в StarWarsUniverse.films`,
              `Увери се, че елементите в StarWarsUniverse.films не се повтарят`
            ]
          })).to.be.eq(6);
        });
      });
    });
  });
});

