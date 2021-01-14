const CustomError = require("../support/errors/CustomError");

context('task-32', () => {
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

  it('should have a timeline which is paused when Animation.js is initialized', () => {
    cy.visit(Cypress.config('url'));

    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

      expect(app.data.animation._tl.paused(), new CustomError({
        issue:'При инициализиране на Animation класа, няма timeline сетнато в _tl property, която е паузирана',
        tips: [
          'Провери, дали създаваш timeline-а в constructur-а на Animation.js',
          'Провери, дали при създаване на timeline-a е паузиран'
        ]
      })).to.be.true;
    });
  });

  it('should have a timeline with 19 tweens in it', () => {
    cy.visit(Cypress.config('url'));

    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

      cy.wait(500).then(() => {
        const tweensCount = app.data.animation._tl.getChildren().length;

        expect(tweensCount, new CustomError({
          issue:'Timeline-а няма нужния брой tween-ове',
          tips: [
            'Провери, дали на timeline-а се сетват нужния брой tween-ове',
            'Всеки tween трябва да таргетира един елемент',
            'Провери, дали не комбинираш някъде няколко target елемента в един tween'
          ]
        })).to.eq(19);
      })
    });
  });

  it('should have start the timeline when we click on the truckBtn element', () => {
    cy.visit(Cypress.config('url'));

    const truckBtn = '#btn';

    cy.get(truckBtn).then($btn => {
      cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

        cy.wait(500).then(() => {
          const timeline = app.data.animation._tl;

          cy.wrap($btn).click({ force: true });

          cy.wait(1000).then(() => {
            expect(timeline.isActive(), new CustomError({
              issue:'Timeline-а не се стартира, когато настиснем truckBtn елемента',
              tips: [
                'Провери, дали имаш закачен click евент на truckBtn елемента',
                'Провери, дали стартираш правилно timeline-a, когато натиснеш truckBtn елемента',
              ]
            })).to.be.true;
          })
        });
      });
    });
  });

  it('should have start the timeline when we click on the playBtn element', () => {
    cy.visit(Cypress.config('url'));

    const playBtn = '#play-button';

    cy.get(playBtn).then($btn => {
      cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

        cy.wait(500).then(() => {
          const timeline = app.data.animation._tl;

          cy.wrap($btn).click({ force: true });

          cy.wait(1000).then(() => {
            expect(timeline.isActive(), new CustomError({
              issue:'Timeline-а не се стартира, когато настиснем playBtn елемента',
              tips: [
                'Провери, дали имаш закачен click евент на playBtn елемента',
                'Провери, дали стартираш правилно timeline-a, когато натиснеш playBtn елемента',
              ]
            })).to.be.true;
          })
        });
      });
    });
  });

  it('should have pause the timeline after the timeline is started and we click on the pauseBtn element', () => {
    cy.visit(Cypress.config('url'));

    const playBtn = '#play-button';
    const pauseBtn = '#toggle-pause-button'

    cy.get(playBtn).then($playBtn => {
      cy.get(pauseBtn).then($pauseBtn => {
        cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

          cy.wait(500).then(() => {
            const timeline = app.data.animation._tl;

            cy.wrap($playBtn).click({ force: true });

            cy.wait(500).then(() => {
              cy.wrap($pauseBtn).click({ force: true });

              cy.wait(1000).then(() => {
                expect(timeline.paused(), new CustomError({
                  issue:'Timeline-а не се паузира, след като е стартиран и след това е натиснат pauseBtn елемента',
                  tips: [
                    'Провери, дали имаш закачен click евент на pauseBtn елемента',
                    'Провери, дали стартираш паузираш timeline-a, когато натиснеш playBtn елемента',
                  ]
                })).to.be.true;
              });
            });
          });
        });
      });
    });
  });

  it('should have the timeline play from where it stopped when pauseBtn and then playBtn is clicked', () => {
    cy.visit(Cypress.config('url'));

    const playBtn = '#play-button';
    const pauseBtn = '#toggle-pause-button'

    cy.get(playBtn).then($playBtn => {
      cy.get(pauseBtn).then($pauseBtn => {
        cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

          cy.wait(500).then(() => {
            const timeline = app.data.animation._tl;

            cy.wrap($playBtn).click({ force: true });

            cy.wait(500).then(() => {
              cy.wrap($pauseBtn).click({ force: true });
              const pauseProgress = timeline.progress();

              cy.wait(1000).then(() => {

                cy.wrap($playBtn).click({ force: true });
                cy.wait(1000).then(() => {

                  const playProgress = timeline.progress();

                  expect(playProgress, new CustomError({
                    issue:'Timeline-а не продължава от прогреса, до който е стигнал, след като се натисне playBtn->pauseBtn->playBtn',
                    tips: [
                      'Провери, дали при timeline продължава от мястото, до което е стигнал, след като се паузира и пусне пак',
                    ]
                  })).to.gt(pauseProgress);
                })
              });
            });
          });
        });
      });
    });
  });

  it('should have timeline restarted after playBtn is clicked the second time', () => {
    cy.visit(Cypress.config('url'));

    const playBtn = '#play-button';

    cy.get(playBtn).then($playBtn => {
        cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {

        cy.wait(500).then(() => {
          const timeline = app.data.animation._tl;
          cy.wrap($playBtn).click({ force: true });
          cy.wait(1500).then(() => {
            const firstProgress = timeline.progress();

            cy.wrap($playBtn).click({ force: true });

            cy.wait(500).then(() => {
              const secondProgress = timeline.progress();

              expect(firstProgress, new CustomError({
                issue:'Timeline-а не се рестартира, след като е пуснат и се натисне отново playBtn',
                tips: [
                  'Провери, дали рестартираш timeline при повторно натискане на playBtn елемента',
                ]
              })).to.be.gt(secondProgress);
            });
          });
        });
      });
    });
  });
});
