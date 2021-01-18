const CustomError = require("../support/errors/CustomError");

context('task-28', () => {
  it('should have gsap instance', () => {
    cy.visit(Cypress.config('url'));

    cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(module => {
      expect(module).to.exist;
    });
  });

  it('should have a gsap app', () => {
    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {
      expect(app).to.exist;
    });
  });

  it('should have a Saucer.js which has static getter for events', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Saucer.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Saucer.js няма static getter за евентите',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Saucer',
          'Увери се, че Saucer има static getter с име events',
        ]
      })).to.include('static get events');
    });
  });

  it('should have a Cow.js which has static getter for events', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Cow.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Cow.js няма static getter за евентите',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Cow',
          'Увери се, че Cow има static getter с име events',
        ]
      })).to.include('static get events');
    });
  });

  it('should have a Saucer.js which extends eventemitter3', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Saucer.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Saucer.js не extend-ва eventemitter3',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Saucer',
          'Увери се, че Saucer extend-ва eventemitter3',
        ]
      })).to.include('class Saucer extends');
    });
  });

  it('should have a Cow.js which extends eventemitter3', () => {
    cy.task('readFileSync', { file: 'src/app/custom/Cow.js'}).then((data) => {
      expect(data, new CustomError({
        issue: 'Cow.js не extend-ва eventemitter3',
        tips: [
          'Увери се, че използваш es6 синтаксиса за създаване на класове',
          'Увери се, че класа ти се казва Cow',
          'Увери се, че Cow extend-ва eventemitter3',
        ]
      })).to.include('class Cow extends');
    });
  });

  it('should have moved the saucer above the cow after the tween with id flyIn si completed', () => {
    const ufo = '.ufo';

    cy.visit(Cypress.config('url'));

    cy.getGsapApp().then(app => {
      cy.wait(500).then(() => {
        cy.wrap(app.data.animation.saucer).onEvent('fly_in');

        cy.wait(500).then(() => {
          cy.get(ufo).then($ufo => {

            const { x } = $ufo[0].getBoundingClientRect();

            expect(x, new CustomError({
              issue: 'При приключване на tween-a с id flyIn, елементът .ufo не е преместен над .cow',
              tips: [
                'Провери дали туийнваш правилните елементи',
                'Провери дали правилно си задал параметрите за tween-ване',
                'Провери дали преместваш .ufo елементът със зададените в условието px'
              ]
            })).to.be.equal(495);
          });
        });
      });
    });
  });

  it('should have a tween with id showTopBeam when flyIn tween is completed', () => {
    cy.visit(Cypress.config('url'));
    cy.getGsapApp().then(app => {
      cy.wait(500).then(() => {
        cy.wrap(app.data.animation.saucer).onEvent('fly_in');

        cy.wait(100).then(() => {
          cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(module => {
            const isShowBeamTween = module.getById('showTopBeam').vars.id ==='showTopBeam';

            expect(isShowBeamTween, new CustomError({
              issue: 'След приключване на flyIn tween-а, не е започнал tween с id showBTopBeam',
              tips: [
                `Увери се, че се dispatch-ва евент FLY_IN, когато приключи tween-а с id flyIn`,
                `Увери се, че tween-а с id showTopBeam започва веднага, след като приключи tween-a с id flyIn`
              ]
            })).to.be.true;
          });
        });
      });
    });

  });

  it('should have a tween with id showBottomBeam when flyIn tween is completed', () => {
    cy.visit(Cypress.config('url'));
    cy.getGsapApp().then(app => {
      cy.wait(500).then(() => {
        cy.wrap(app.data.animation.saucer).onEvent('fly_in');

        cy.wait(100).then(() => {
          cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(module => {
            const isShowBeamTween = module.getById('showBottomBeam').vars.id ==='showBottomBeam';

            expect(isShowBeamTween, new CustomError({
              issue: 'След приключване на flyIn tween-а, не е започнал tween с id showBottomBeam',
              tips: [
                `Увери се, че се dispatch-ва евент FLY_IN, когато приключи tween-а с id flyIn`,
                `Увери се, че tween-а с id showBottomBeam започва веднага, след като приключи tween-a с id flyIn`
              ]
            })).to.be.true;
          });
        });
      });
    });

  });

  it('should have opacity set to beamTopElement, after the beam_showed event is emitted', () => {
    const beam = '#beam-top';

    cy.visit(Cypress.config('url'));

    cy.getGsapApp().then(app => {
      cy.wait(500).then(() => {

        cy.wrap(app.data.animation.saucer).onEvent('beam_showed');

        cy.wait(500).then(() => {
          cy.get(beam).then($beam => {
            const opacity = Number($beam[0].style.opacity);

            expect(opacity, new CustomError({
              issue: 'След емитване на евента beam_showed, opacity-то на #beam-top елементът не съвпада със зададеното в условието',
              tips: [
                'Провери дали туийнваш правилните елементи',
                'Провери дали правилно си задал параметрите за tween-ване, опоменати в условието',
                'Увери се, че emit-ваш на правилното място евентът beam_showed'
              ]
            })).to.eq(0.6);
          })
        });
      })
    })
  });

  it('should have opacity set to beamBottomElement, after the beam_showed event is emitted', () => {
    const beam = '#beam-bottom';

    cy.visit(Cypress.config('url'));

    cy.getGsapApp().then(app => {
      cy.wait(500).then(() => {

        cy.wrap(app.data.animation.saucer).onEvent('beam_showed');

        cy.wait(500).then(() => {
          cy.get(beam).then($beam => {
            const opacity = Number($beam[0].style.opacity);

            expect(opacity, new CustomError({
              issue: 'След емитване на евента beam_showed, opacity-то на #beam-bottom елементът не съвпада със зададеното в условието',
              tips: [
                'Провери дали туийнваш правилните елементи',
                'Провери дали правилно си задал параметрите за tween-ване, опоменати в условието',
                'Увери се, че emit-ваш на правилното място евентът beam_showed'
              ]
            })).to.eq(0.6);
          })
        });
      })
    })
  });

  it('should have tween with id cowAbduction, after the beam is showed', () => {
    cy.visit(Cypress.config('url'));

    cy.getGsapApp().then(app => {
      cy.wrap(app.data.animation.saucer).onEvent('beam_showed');

      cy.wait(500).then(() => {
        cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(module => {

          expect(!!module.getById('cowAbduction'), new CustomError({
            issue: 'След приключване на tween-a showBeam, не е започнал tween с id cowAbduction',
            tips: [
              `Увери се, че се dispatch-ва евент beam_showed, когато приключи tween-а с id beamShowed`,
              `Увери се, че tween-а с id cowAbduction започва веднага, след като приключи tween-a с id beamShowed`
            ]
          })).to.be.true;
        });
      })
    })
  });

  it('should have .cow element moved to the saucer when the tween with id cowAbduction is completed', () => {
    cy.visit(Cypress.config('url'));

    const cow = '.cow';

    cy.getGsapApp().then(app => {
      cy.get(cow).then($cow => {
        cy.wrap(app.data.animation.cow).onEvent('abduct_completed');
        cy.wait(500).then(() => {
          expect($cow[0].style.transform, new CustomError({
            issue: 'След приключване на tween-a cowAbduction, .cow елементът не е преместен до .ufo елемента',
            tips: [
              `Увери се, че се emit-ва евент abduct_completed, след като се tween-е .cow елемнта`,
              `Увери се, че .cow елементът се tween-ва съз зададените по условие параметри`,
            ]
          })).to.include('-390px');
        });
      })
    })
  });

  it('should have a tween with id flyOut, when the beam_hide event is emitted', () => {
    cy.visit(Cypress.config('url'));

    cy.getGsapApp().then(app => {
      cy.wrap(app.data.animation.saucer).onEvent('beam_hide');
      cy.wait(1000).then(() => {
        cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(module => {
          expect(!!module.getById('flyOut'), new CustomError({
            issue: 'След емитване на евента beam_hide, не е започнал tween с id flyOut',
            tips: [
              `Увери се, че се emit-ва евент beam_hide, след като се скрива .beam елемента`,
              `Увери се, че правилно е зададено id на tween-а flyOut`
            ]
          })).to.be.true;
        })
      });
    });
  });
});
