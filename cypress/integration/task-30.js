const CustomError = require("../support/errors/CustomError");

context('task-30', () => {
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

  it('should have a Starship.js which is an es6 class', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Starship.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Starship.js не е es6 class',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Starship'
        ]
      })).to.include('export default class Starship');
    });
  });

  it('should have a data property called universe', () => {
    cy.visit(Cypress.config('url'));

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

  it('should have Starship object which have name property', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.universe.starships[0].hasOwnProperty('name'), new CustomError({
          issue: `Класът Starship трябва да има property name'`,
          tips: [
            `Увери се, че всеки елемент в StarWarsUniverse.starships има property name`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true
      });
    });
  });

  it('should have a StarWarsUniverse.js have _validateData method', () => {
    cy.task('readFileSync', { file: 'src/app/custom/StarWarsUniverse.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'StarWarsUniverse.js няма метод _validateData',
        tips: [
          'Увери се, че в StarWarsUniverse.js имаш метод _validateData',
          'Увери се, че класа ти се казва StarWarsUniverse'
        ]
      })).to.include('_validateData');
    });
  });

  it('should have Starship object which have _consumables property', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.universe.starships[0].hasOwnProperty('_consumables'), new CustomError({
          issue: `Класът Starship трябва да има property _consumables'`,
          tips: [
            `Увери се, че всеки елемент в StarWarsUniverse.starships има property _consumables`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true
      });
    });
  });

  it('should have Starship object which have _passengers property', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.universe.starships[0].hasOwnProperty('_passengers'), new CustomError({
          issue: `Класът Starship трябва да има property _passengers'`,
          tips: [
            `Увери се, че всеки елемент в StarWarsUniverse.starships има property _passengers`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true
      });
    });
  });

  it('should have StarWarsUniverse with property called starships', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.universe.hasOwnProperty('starships'), new CustomError({
          issue: `StarWarsUniverse няма сетнато property starships`,
          tips: [
            `Увери се, че в StarWarsUniverse класа се сетва property starships`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true;
      });
    });
  });

  it('should have a StarWarsUniverse.js which has getter called theBestStarship', () => {
    cy.task('readFileSync', { file: 'src/app/custom/StarWarsUniverse.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Starship.js няма getter с име theBestStarship',
        tips: [
          'Увери се, че имаш getter с име theBestStarship',
          'Увери се, че класа ти се казва StarWarsUniverse',
          `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
        ]
      })).to.include('get theBestStarship()');
    });
  });

  it('should have a Starship.js which has getter called maxDaysInSpace', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Starship.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Starship.js няма getter с име maxDaysInSpace',
        tips: [
          'Увери се, че имаш getter с име maxDaysInSpace',
          'Увери се, че класа ти се казва Starship',
          `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
        ]
      })).to.include('get maxDaysInSpace()');
    });
  });

  it('should have StarWarsUniverse.starships which should be an array', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(Array.isArray(app.data.universe.starships), new CustomError({
          issue: `StarWarsUniverse.starships трябва да е масив'`,
          tips: [
            `Увери се, че в StarWarsUniverse класа се сетва property e starships, което е масив`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true;
      });
    });
  });

  it('should have a StarWarsUniverse.starships with eleven elements', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.universe.starships.length, new CustomError({
          issue: `StarWarsUniverse.starships трябва да е масив с 11 елемента'`,
          tips: [
            `Увери се, че в StarWarsUniverse.starships са добавени всички елементи`,
            `Увери се, че data-та за всеки starship е правилно parse-ната`,
          ]
        })).to.eq(11);
      });
    });
  });

  it('should have theBestStarship getter which is equal to Millennium Falcon', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app).onEvent('app_ready');

      cy.wait(500).then(() => {
        cy.log(app.data.universe.theBestStarship);
        console.log(app.data.universe.theBestStarship);
        expect(app.data.universe.theBestStarship.name, new CustomError({
          issue: `Getter-a на StarShipUniverse.theBestStarship не връща правилния starship`,
          tips: [
            `Увери се, че правилно търсиш starship-а с най-голяма стойност на maxDaysInSpace`,
            `Увери се, че правилно си парснал data-та за всеки създаден Starship`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.eq('Millennium Falcon');
      });
    });
  });
});
