const CustomError = require("../support/errors/CustomError");

context('task-33', () => {
  it('should have gsap instance', () => {
    cy.visit(Cypress.config('url'));

    cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(module => {
      expect(module).to.exist;
    });
  });

  it('should have a gsap app', () => {
    cy.visit(Cypress.config('url'));

    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {
      expect(app).to.exist;
    });
  });

  it('should have an Animation.js es6 class', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Animation.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Animation.js не е es6 class',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
        ]
      })).to.include('export default class Animation');
    });
  });

  it('should have an Animation.js class which implements montionPath', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Animation.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'MotionPathPlugin-а не е използван в Animation.js',
        tips: [
          'Увери се, че използваш motionPath plugin-а в Animation.js класа',
        ]
      })).to.include('motionPath');
    });
  });

  it('should have a tween which uses autoRotate property of the MotionPathPlugin', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Animation.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Ракетата не се движи правилно спрямо svgPath-a, зададен в условието',
        tips: [
          'Увери се, че използваш autoRotate property-то, когато tween-ваш _rocketElement-a',
        ]
      })).to.include('autoRotate');
    });
  });

  it('should have data set in Application.js', () => {
    cy.visit(Cypress.config('url'));

    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

      expect(app.data.animation, new CustomError({
        issue:'Няма закачена data в Application.js',
        tips: [
          'Провери, дали правилно се закача Animation.js класа на Application.data.animation'
        ]
      })).to.exist;
    });
  });

  it('should have a property called _rocketTween set in Animation.js', () => {
    cy.visit(Cypress.config('url'));

    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

      expect(app.data.animation._rocketTween, new CustomError({
        issue:'Няма property _rocketTween в Animation.js',
        tips: [
          'Провери, дали правилно създаваш timeline и го закачаш на property с име _rocketTween в Animation.js'
        ]
      })).to.exist;
    });
  });

  it('should have an active tween when application starts', () => {
    cy.visit(Cypress.config('url'));

    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

      cy.wait(1000).then(() => {
        const tween = app.data.animation._rocketTween;

        expect(tween.isActive(), new CustomError({
          issue:'Няма активен tween при стартиране на app-a',
          tips: [
            'Провери, дали се извиква start() метода след инициализиране на Animation.js',
            'Провери, дали е правилно закачена data-та на Application.data.animation'
          ]
        })).to.be.true;
      });
    });
  });

  it('should stop the tween when clicking on the _backgroundElement', () => {
    cy.visit(Cypress.config('url'));

    const backgroundElement = '.background';

    cy.get(backgroundElement).then($background => {
      cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

        cy.wait(500).then(() => {

          cy.wrap($background).click({ force: true });

          cy.wait(1000).then(() => {
            expect(app.data.animation._rocketTween, new CustomError({
              issue:'Не се kill-ва tween-a при click на _backgroundElement-a',
              tips: [
                'Провери, дали имаш закачен click евент на _backgroundElement-а',
                'Провери, дали kill-ваш tween-а при clicl-ване на _backgroundElement-a',
                'Провери, дали set-ваш _rocketTween на null, след като го kill-неш'
              ]
            })).to.eq(null);
          });
        });
      });
    });
  });

  it('should start the tween from the beginning when we click two times on the _backgroundElement', () => {
    cy.visit(Cypress.config('url'));

    const backgroundElement = '.background';

    cy.get(backgroundElement).then($background => {
      cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

        cy.wait(500).then(() => {
          const tween = app.data.animation._rocketTween;

          const firstProgress = tween.progress();
          cy.wrap($background).click({ force: true });

          cy.wait(500).then(() => {

          cy.wrap($background).click({ force: true });

          cy.wait(3000).then(() => {
            const secondProgress = app.data.animation._rocketTween.progress();

            expect(firstProgress, new CustomError({
              issue:'Timeline-а не се стартира, когато настиснем truckBtn елемента',
              tips: [
                'Провери, дали имаш закачен click евент на truckBtn елемента',
                'Провери, дали стартираш правилно timeline-a, когато натиснеш truckBtn елемента',
              ]
            })).to.not.eq(secondProgress);
            });
          });
        });
      });
    });
  });
});
