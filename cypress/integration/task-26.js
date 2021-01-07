const CustomError = require("../support/errors/CustomError");

context('task-26', () => {
  it('should have gsap instance', () => {
    cy.visit('/');
    cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(module => {
      expect(module).to.exist;
    });
  });

  it('should have a gsap app', () => {
    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {
      expect(app).to.exist;
    });
  });

  it('when hovered a monster should be tweened', () => {
    cy.get('.monster:first').trigger('mouseenter');
    cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(module => {
      expect(module.getTweensOf('.monster:first-child').length).to.be.gt(0, new CustomError({
        issue: '.monster елементът не се туийнва при ховър.',
        tips: [
          'Провери синтаксиса и настройките на туийна си'
        ]
      }));
    });
  });

  it('should have a monster with a hovered monster with width of 80% on hover', () => {
    const container = '#container';
    const firstMonster = '.monster:first';
    const tweenId = 'expand';
    const hoverEvent = 'mouseenter';

    cy.visit('/');

    cy.get(firstMonster).then($monster => {
      cy.wrap($monster).trigger(hoverEvent);

      cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(async module => {
        await module.getById(tweenId);

        cy.get(container).then($container => {
          const widthPercent = ($monster.width() / $container.width()) * 100;

          expect(widthPercent).to.be.equal(80, new CustomError({
            issue: 'ховърнатият елемент не достига ширина с размер 80% след края на туийна',
            tips: [
              'Провери дали туийнваш правилните елементи',
              'Провери дали правилно си задал размерите за туийнване'
            ]
          }));
        });
      });
    });
  });

  it('should have unhovered monsters with width of 4%', () => {
    const container = '#container';
    const firstMonster = '.monster:first';
    const others = '.monster:not(:first-child)';
    const tweenId = 'contract';
    const hoverEvent = 'mouseenter';

    cy.visit('/');

    cy.get(firstMonster).then($monster => {
      cy.wrap($monster).trigger(hoverEvent);
      cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(async module => {
        await module.getById(tweenId);

        cy.get(container).then($container => {
          cy.get(others).then($others => {
            $others.each((_, element) => {
              const widthPercent = (element.offsetWidth / $container.width()) * 100;

              expect(widthPercent).to.be.equal(4, {
                issue: 'ховърнатият елемент не достига ширина с размер 4% след края на туийна',
                tips: [
                  'Провери дали туийнваш правилните елементи',
                  'Провери дали правилно си задал размерите за туийнване'
                ]
              });
            });
          });
        });
      });
    });
  });

  it('should have a monsters of equal size when none is hovered', () => {
    const container = '#container';
    const firstMonster = '.monster:first';
    const all = '.monster';
    const tweenId = 'contract';
    const resetTweenId = 'reset';
    const hoverInEvent = 'mouseenter';
    const hoverOutEvent = 'mouseleave';

    cy.visit('/');
    cy.get(firstMonster).then($monster => {
      cy.wrap($monster).trigger(hoverInEvent);
      cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(async module => {
        await module.getById(tweenId);
        cy.wrap($monster).trigger(hoverOutEvent);

        // We need to get the gsap instance again to see any new tweens that have been added. They will NOT appear on the old instance.
        cy.getGsap(CustomError.common.GSAP_APP_NOT_FOUND).then(async module => {
          await module.getById(resetTweenId);
          cy.get(container).then($container => {
            cy.get(all).each($monster => {
                const widthPercent = ($monster.width() / $container.width()) * 100;

                expect(widthPercent).to.be.equal(16.6, {
                issue: 'ховърнатият елемент не се връща към оригиналния си размер след края на туийна',
                tips: [
                  'Провери дали туийнваш правилните елементи',
                  'Провери дали правилно си задал размерите за туийнване'
                ]
              });
            });
          });
        });
      });
    });
  });

  it(`should have a 'src/app/custom/Monster.js' file`, () => {
    cy.task('gitListFiles').then((data) => {
      expect(
        data,
        new CustomError({
          issue: 'Липсва файла "src/app/custom/Monster.js"',
          tips: [
            'Увери се, че си създал файла на правилното място',
            'Провери разширението на файла',
            'Увери се, че си push-нал промените си',
          ]
        })
      ).to.include('src/app/custom/Monster.js');
    });
  });

  it(`should have a 'src/app/custom/Animation.js' file`, () => {
    cy.task('gitListFiles').then((data) => {
      expect(
        data,
        new CustomError({
          issue: 'Липсва файла "src/app/custom/Animation.js"',
          tips: [
            'Увери се, че си създал файла на правилното място',
            'Провери разширението на файла',
            'Увери се, че си push-нал промените си',
          ]
        })
      ).to.include('src/app/custom/Animation.js');
    });
  });

  it(`should have an animation property attached to the app.data`, () => {
    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {
      expect(app.data.animation, new CustomError({
        issue: `Не успяваме да намерим 'animation' параметъра в app.data`,
        tips: [
          `Увери се, че си кръстил параметъра правилно`,
          `Увери се, че метода е част от 'app.data'`,
        ]
      })).to.be.exist;
    });
  });

  it(`should have an instance of animation with a monsters property`, () => {
    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {
      expect(app.data.animation.monsters, new CustomError({
        issue: `Не успяваме да намерим 'monstersRUN=true OPEN=true TASK_ID=26 REPO_URL=https://gitlab.com/DanislavKamenov/task-26.git node index.js' параметъра в app.data`,
        tips: [
          `Увери се, че си кръстил параметъра правилно`,
          `Увери се, че метода е част от 'app.data'`,
        ]
      })).to.be.exist;
    });
  });

  it(`should have an animation with monsters which implement the expand method`, () => {
    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {
      expect(app.data.animation.monsters[0].expand, new CustomError({
        issue: `Не успяваме да намерим метода 'expand'`,
        tips: [
          `Увери се, че си кръстил метода правилно`,
          `Увери се, че метода е част от класа Monster`,
        ]
      })).to.be.exist;
    });
  });

  it(`should have an animation with monsters which implement the contract method`, () => {
    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {
      expect(app.data.animation.monsters[0].contract, new CustomError({
        issue: `Не успяваме да намерим метода 'contract'`,
        tips: [
          `Увери се, че си кръстил метода правилно`,
          `Увери се, че метода е част от класа Monster`,
        ]
      })).to.be.exist;
    });
  });

  it(`should have an animation with monsters which implement the reset method`, () => {
    cy.getGsapApp(CustomError.common.GSAP_APP_NOT_FOUND).then(app => {
      expect(app.data.animation.monsters[0].reset, new CustomError({
        issue: `Не успяваме да намерим метода 'reset'`,
        tips: [
          `Увери се, че си кръстил метода правилно`,
          `Увери се, че метода е част от класа Monster`,
        ]
      })).to.be.exist;
    });
  });

});