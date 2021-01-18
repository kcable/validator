const CustomError = require("../support/errors/CustomError");

context('task-35', () => {
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

  it('should have a property called _tl set in Animation.js', () => {
    cy.visit(Cypress.config('url'));

    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

      expect(app.data.animation._tl, new CustomError({
        issue:'Няма property _tl в Animation.js',
        tips: [
          'Провери, дали правилно създаваш timeline и го закачаш на property с име _tl в Animation.js'
        ]
      })).to.exist;
    });
  });

  it('should have start the timeline when we click on the scaleBtn', () => {
    cy.visit(Cypress.config('url'));

    const scaleBtn = '#scale-button';

    cy.get(scaleBtn).then($scaleBtn => {
      cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

        cy.wait(500).then(() => {
          const timeline = app.data.animation._tl;

          cy.wrap($scaleBtn).click({ force: true });

          cy.wait(1000).then(() => {
            expect(timeline.isActive(), new CustomError({
              issue:'Timeline-а не се стартира, когато натиснем scaleBtn елемента',
              tips: [
                'Провери, дали имаш закачен click евент на scaleBtn елемента',
                'Провери, дали стартираш правилно timeline-a, когато натиснеш scaleBtn елемента',
              ]
            })).to.be.true;
          });
        });
      });
    });
  });

    it('should have start the timeline when we click on the positionBtn', () => {
      cy.visit(Cypress.config('url'));

      const positionBtn = '#position-button';

      cy.get(positionBtn).then($positionBtn => {
        cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

          cy.wait(500).then(() => {
            const timeline = app.data.animation._tl;

            cy.wrap($positionBtn).click({ force: true });

            cy.wait(1000).then(() => {
              expect(timeline.isActive(), new CustomError({
                issue:'Timeline-а не се стартира, когато натиснем positionBtn елемента',
                tips: [
                  'Провери, дали имаш закачен click евент на positionBtn елемента',
                  'Провери, дали стартираш правилно timeline-a, когато натиснеш positionBtn елемента',
                ]
            })).to.be.true;
          });
        });
      });
    });
  });

  it('should have the timeline inactive when stopBtn element is clicked after being activated with scaleBtn', () => {
    cy.visit(Cypress.config('url'));

    const scaleBtn = '#scale-button';
    const stopBtn = '#stop-button';

    cy.get(scaleBtn).then($scaleBtn => {
      cy.get(stopBtn).then($stopBtn => {
        cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

          cy.wait(500).then(() => {
            const timeline = app.data.animation._tl;

            cy.wrap($scaleBtn).click({ force: true });

            cy.wait(1000).then(() => {

            cy.wrap($stopBtn).click({ force: true });

            cy.wait(1000).then(() => {
              expect(timeline.isActive(), new CustomError({
                issue:'Timeline-а не се се деактивира при натискане на scaleBtn и след това stopBtn',
                tips: [
                  'Провери, спираш правилно timeline-a, когато се натисне stopBtn, след като timeline-а е бил активен от scaleBtn елемента',
                ]
              })).to.be.false;
             });
            });
          });
        });
      });
    });
  });

  it('should have the timeline inactive when stopBtn element is clicked after being activated with positionBtn', () => {
    cy.visit(Cypress.config('url'));

    const positionBtn = '#position-button';
    const stopBtn = '#stop-button';

    cy.get(positionBtn).then($positionBtn => {
      cy.get(stopBtn).then($stopBtn => {
        cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

          cy.wait(500).then(() => {
            const timeline = app.data.animation._tl;

            cy.wrap($positionBtn).click({ force: true });

            cy.wait(1000).then(() => {

            cy.wrap($stopBtn).click({ force: true });

            cy.wait(1000).then(() => {
              expect(timeline.isActive(), new CustomError({
                issue:'Timeline-а не се се деактивира при натискане на positionBtn и след това stopBtn',
                tips: [
                  'Провери, спираш правилно timeline-a, когато се натисне stopBtn, след като timeline-а е бил активен от positionBtn елемента',
                ]
              })).to.be.false;
             });
            });
          });
        });
      });
    });
  });

  it('should have the timeline change its tween after scaleBtn is clicked and after that positionBtn is clicked', () => {
    cy.visit(Cypress.config('url'));

    const scaleBtn = '#scale-button';
    const positionBtn = '#position-button';

    cy.get(scaleBtn).then($scaleBtn => {
      cy.get(positionBtn).then($positionBtn => {
        cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

          cy.wait(500).then(() => {
            const timeline = app.data.animation._tl;

            cy.wrap($scaleBtn).click({ force: true });

            cy.wait(1000).then(() => {

            cy.wrap($positionBtn).click({ force: true });

            cy.wait(1000).then(() => {
              const tween = timeline.getById('positionStagger');

              expect(tween, new CustomError({
                issue:'Timeline-а не си сменя tween-a, когато е натиснат scaleBtn, след което positionBtn',
                tips: [
                  'Провери, дали tween-a в timeline-a се сменя, при настискане на scaleBtn и след това positionBtn',
                  'Провери, дали правилно задаваш id-то на tween-a на timeline-a, зададени в условието',
                ]
              })).to.exist;
             });
            });
          });
        });
      });
    });
  });

  it('should have the timeline change its tween after positionBtn is clicked and after that scaleBtn is clicked', () => {
    cy.visit(Cypress.config('url'));

    const scaleBtn = '#scale-button';
    const positionBtn = '#position-button';

    cy.get(scaleBtn).then($scaleBtn => {
      cy.get(positionBtn).then($positionBtn => {
        cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

          cy.wait(500).then(() => {
            const timeline = app.data.animation._tl;

            cy.wrap($positionBtn).click({ force: true });

            cy.wait(1000).then(() => {

            cy.wrap($scaleBtn).click({ force: true });

            cy.wait(1000).then(() => {
              const tween = timeline.getById('scaleStagger');

              expect(tween, new CustomError({
                issue:'Timeline-а не си сменя tween-a, когато е натиснат positionBtn, след което scaleBtn',
                tips: [
                  'Провери, дали tween-a в timeline-a се сменя, при настискане на positionBtn и след това scaleBtn',
                  'Провери, дали правилно задаваш id-то на tween-a на timeline-a, зададени в условието',
                ]
              })).to.exist;
             });
            });
          });
        });
      });
    });
  });
});
