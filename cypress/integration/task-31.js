const CustomError = require("../support/errors/CustomError");

context('task-31', () => {
  it('should have JS app', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp(new CustomError(CustomError.common.JS_APP_NOT_FOUNT)).then(app => expect(app).to.exist);
  });

  it('should have data set in Application.js', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {

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

  it('should have a data property called universe', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {

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

  it('should have StarWarsUniverse with property called species', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {

      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(app.data.universe.hasOwnProperty('species'), new CustomError({
          issue: `StarWarsUniverse няма сетнато property species`,
          tips: [
            `Увери се, че в StarWarsUniverse класа се сетва property species`,
            `Увери се, че data-та в init метода на Application.js се сетва, преди да се emit-не евента APP_READY`
          ]
        })).to.be.true;
      });
    });
  });

  it('should have StarWarsUniverse with property called species which is an Array', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {

      console.log()
      cy.wait(500).then(() => {
        cy.log(app.data.universe);
        expect(Array.isArray(app.data.universe.species), new CustomError({
          issue: `StarWarsUniverse.species не е масив`,
          tips: [
            `Увери се, че в StarWarsUniverse класа се сетва property species, което е масив`,
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

  it('should have a Species.js which is an es6 class', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Species.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Species.js не е es6 class',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Species'
        ]
      })).to.include('export default class Species');
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

  it('should have a Species.js which extends eventemitter3', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Species.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Species.js не е es6 class',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Species',
          'Увери се, че Species extend-ва eventemitter3',
        ]
      })).to.include('class Species extends');
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

  it('should have a Species.js which has static getter for events', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Species.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Species.js няма static getter за евентите',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Species',
          'Увери се, че Species има static getter с име events',
        ]
      })).to.include('static get events');
    });
  });

  it('should have species_created event emitted, on every new species added to StarWarsUniverse.species', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      app.data.universe.on('species_created', ({ speciesCount }) => {
        if (speciesCount === 10) {
          expect(app.data.universe.species.length, new CustomError({
            issue: `Евентът species_created не се емитва правилно от StarWarsUniverse.js`,
            tips: [
              `Увери се, че след добавяне на новата инстанция на Species в StarWarsUniverse.species масива, се емитва евент species_created`,
              `Увери се, че евентът е правилно наименуван, както е зададен в условието`,
              `Увери се, че евентът се emit-ва с payload обект, който има property с име speciesCount`
            ]
          })).to.be.eq(10);
        }
      });
    });
  });

  it('should have 10 species in StarWarsUniverse.species', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app.data.universe).onEvent('max_species_reached');

      cy.wait(500).then(() => {
        cy.log(app.data);
        expect(app.data.universe.species.length, new CustomError({
          issue: `При emit-ване на евента max_species_reached, не е достигнат максмумът на species, зададен в условието`,
          tips: [
            `Увери се, че в Application.data се сетват нужните property-та описани в условието`,
            `Увери се, че евентът max_species_reached се емитва, когато е достигнат максимумът на species зададен в условието`,
            `Увери се, че евентът max_species_reached се емитва, след като species обектът се добави в StarWarsUniverse.species array-а`
          ]
        })).to.be.eq(10);
      });
    });
  });

  it('should have species instances in StarWarsUniverse.species, with a name property', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app.data.universe).onEvent('max_species_reached');

      cy.wait(500).then(() => {
        cy.log(app.data);
        const species = app.data.universe.species[0];

        expect(species.hasOwnProperty('name'), new CustomError({
          issue: `Species класа няма property name`,
          tips: [
            `Увери се, че в Species.js се сетва property name`,
          ]
        })).to.be.true;
      });
    });
  });

  it('should have species instances in StarWarsUniverse.species, with a classification property', () => {
    cy.visit(Cypress.config('url'));

    cy.getJsApp().then(app => {
      cy.wrap(app.data.universe).onEvent('max_species_reached');

      cy.wait(500).then(() => {
        cy.log(app.data);
        const species = app.data.universe.species[0];

        expect(species.hasOwnProperty('classification'), new CustomError({
          issue: `Species класа няма property classification`,
          tips: [
            `Увери се, че в Species.js се сетва property classification`,
          ]
        })).to.be.true;
      });
    });
  });
});
