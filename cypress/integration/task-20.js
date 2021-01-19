const CustomError = require("../support/errors/CustomError");

context('task-20', () => {
  it('should have a PIXI app', () => {
    cy.visit(Cypress.config('url'));
    cy.getPixiApp(new CustomError(CustomError.common.PIXI_APP_NOT_FOUND)).then((app) => {
      expect(app).to.exist;
    });
  });

  it('should have a PIXI stage', () => {
    cy.getPixiStage(new CustomError(CustomError.common.PIXI_STAGE_NOT_FOUND)).then((stage) => {
      expect(stage).to.exist;
    });
  });

  it(`should have a 'src/components/Button.js' file`, () => {
    cy.task('gitListFiles').then((data) => {
      expect(
        data,
        new CustomError({ 
          issue: 'Липсва файла "src/components/Button.js"', 
          tips: [
            'Увери се, че си създал файла на правилното място', 
            'Провери разширението на файла',
            'Увери се, че си push-нал промените си',
          ] 
        })
      ).to.include('src/components/Button.js');
    });
  });

  it(`should have a 'src/components/Pokeball.js' file`, () => {
    cy.task('gitListFiles').then((data) => {
      expect(
        data,
        new CustomError({ 
          issue: 'Липсва файла "src/components/Pokeball.js"', 
          tips: [
            'Увери се, че си създал файла на правилното място', 
            'Провери разширението на файла',
            'Увери се, че си push-нал промените си',
          ] 
        })
      ).to.include('src/components/Pokeball.js');
    });
  });

  it(`should have a Button.js which is a es6 class`, () => {
    cy.task('readFileSync', { file: 'src/components/Button.js' }).then((data) => {

      expect(
        data,
        new CustomError({ 
          issue: 'Button.js не е es6 class', 
          tips: [
            'Увери се, че използваш es6 синтаксиса за създаване на класове "export default class MyClass..."',
            'Увери се, че класа ти се казва Button',
          ] 
        })
      ).to.include('export default class Button');
    });
  });

  it(`should have a Pokeball.js which is a es6 class`, () => {
    cy.task('readFileSync', { file: 'src/components/Pokeball.js' }).then((data) => {

      expect(
        data,
        new CustomError({ 
          issue: 'Pokeball.js не е es6 class', 
          tips: [
            'Увери се, че използваш es6 синтаксиса за създаване на класове "export default class MyClass..."',
            'Увери се, че класа ти се казва Pokeball',
          ] 
        })
      ).to.include('export default class Pokeball');
    });
  });

  it(`should have a Button.js which extends a PIXI container`, () => {
    cy.task('readFileSync', { file: 'src/components/Button.js' }).then((data) => {

      expect(
        data,
        new CustomError({ 
          issue: 'Button.js не extend-ва PIXI Container', 
          tips: [
            `Увери се, че си import-нал container-a като "import { Container } from 'pixi.js'"`,
            `Увери се, че използваш es6 синтаксиса за extend-ване на класове`,
          ] 
        })
      ).to.include('extends Container');
    });
  });

  it(`should have a Pokeball.js which extends a PIXI container`, () => {
    cy.task('readFileSync', { file: 'src/components/Pokeball.js' }).then((data) => {

      expect(
        data,
        new CustomError({ 
          issue: 'Pokeball.js не extend-ва PIXI Container', 
          tips: [
            `Увери се, че си import-нал container-a като "import { Container } from 'pixi.js'"`,
            `Увери се, че използваш es6 синтаксиса за extend-ване на класове`,
          ] 
        })
      ).to.include('extends Container');
    });
  });

  it(`should have a Button class with a name property with a value of "button"`, () => {
    const element = 'button';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.name).to.eq('button', new CustomError({ 
        issue: 'name property-то на Button класа не е button', 
        tips: [
          `Увери се, че си кръстил бутона правилно"`,
        ] 
      }));
    });
  });

  it(`should have a Pokeball class with a name property with a value of "pokeball"`, () => {
    const element = 'pokeball';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.name).to.eq('pokeball', new CustomError({ 
        issue: 'name property-то на Pokeball класа не е pokeball', 
        tips: [
          `Увери се, че си кръстил бутона правилно"`,
        ] 
      }));
    });
  });

  it(`should have a Button class with a method named show`, () => {
    const element = 'button';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.show, new CustomError({ 
        issue: `Не успяваме да намерим метода 'show'`, 
        tips: [
          `Увери се, че си кръстил метода правилно`,
          `Увери се, че метода е част от класа Button`,
        ] 
      })).to.exist;
    });
  });

  it(`should have a Button class with a method named hide`, () => {
    const element = 'button';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.hide, new CustomError({ 
        issue: `Не успяваме да намерим метода 'hide'`, 
        tips: [
          `Увери се, че си кръстил метода правилно`,
          `Увери се, че метода е част от класа Button`,
        ] 
      })).to.exist;
    });
  });

  it(`should have a Pokeball class with a method named open`, () => {
    const element = 'pokeball';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.open, new CustomError({ 
        issue: `Не успяваме да намерим метода 'open'`, 
        tips: [
          `Увери се, че си кръстил метода правилно`,
          `Увери се, че метода е част от класа Pokeball`,
        ] 
      })).to.exist;
    });
  });

  it(`should have a Pokeball class with a method named close`, () => {
    const element = 'pokeball';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.close, new CustomError({ 
        issue: `Не успяваме да намерим метода 'close'`, 
        tips: [
          `Увери се, че си кръстил метода правилно`,
          `Увери се, че метода е част от класа Pokeball`,
        ] 
      })).to.exist;
    });
  });

  it(`should have a Pokeball class with a property 'text' which is an instance of PIXI.Text`, () => {
    const element = 'pokeball';
    cy.getPixi().then((PIXI) => {
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        expect(element.text instanceof PIXI.Text).to.be.true;
      });
    });
  });

  it(`should have a Pokeball class with a property 'top' which is an instance of PIXI.Sprite`, () => {
    const element = 'pokeball';
    cy.getPixi().then((PIXI) => {
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        expect(element.top instanceof PIXI.Sprite).to.be.true;
      });
    });
  });
  
  it(`should have a Pokeball class with a property 'bottom' which is an instance of PIXI.Sprite`, () => {
    const element = 'pokeball';
    cy.getPixi().then((PIXI) => {
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        expect(element.bottom instanceof PIXI.Sprite).to.be.true;
      });
    });
  });

  it(`should have a Pokeball class with a property 'isOpened' which is false`, () => {
    const element = 'pokeball';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.isOpened).to.be.false;
    });
  });


  it(`should have a Button which changes the mouse to a pointer on hover`, () => {
    const element = 'button';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.buttonMode, new CustomError({ 
        issue: `Button няма set-нат buttonMode, което значи, че курсора не е pointer при hover.`, 
        tips: [
          `Увери се, че си задал buttonMode на button (this.buttonMode = true)`,
        ] 
      })).to.be.true;
    });
  });

  it(`should have a Button which has the 'interactive' property set to true`, () => {
    const element = 'button';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.interactive, new CustomError({ 
        issue: `Button няма set-нат interactive, което значи, че рибата няма да може да се кликва.`, 
        tips: [
          `Увери се, че си задал interactive на button (this.interactive = true)`,
        ] 
      })).to.be.true;
    });
  });

  it(`should have a Pokeball with a static events property`, () => {
    const element = 'pokeball';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      const error = new CustomError({ 
        issue: `Pokeball няма статичен getter .events`, 
        tips: [
          `Увери се, че си добавил статичен getter (static get events() { ... })`,
          `Увери се, че си добавил event property-то на класа Pokeball`,
          `Увери се, че event-ите връщат обект (static get events() { return { OPEN_START: 'open_start' } })`,
        ] 
      });

      expect(element.constructor.events, error).to.be.an('object');
    });
  });

  it(`should have a Pokeball with a static events property which contains OPEN_START`, () => {
    const element = 'pokeball';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      const error = new CustomError({ 
        issue: `Pokeball няма event OPEN_START`, 
        tips: [
          `Увери се, че си добавил статичен getter (static get events() { ... })`,
          `Увери се, че си добавил event property-то на класа Pokeball`,
          `Увери се, че event-ите връщат обект в, който е дефиниран OPEN_START (static get events() { return { OPEN_START: 'open_start' } })`,
        ] 
      });

      expect(element.constructor.events.OPEN_START, error).to.be.a('string');
    });
  });

  it(`should have a Pokeball with a static events property which contains OPEN_END`, () => {
    const element = 'pokeball';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      const error = new CustomError({ 
        issue: `Pokeball няма event OPEN_END`, 
        tips: [
          `Увери се, че си добавил статичен getter (static get events() { ... })`,
          `Увери се, че си добавил event property-то на класа Pokeball`,
          `Увери се, че event-ите връщат обект в, който е дефиниран OPEN_END (static get events() { return { OPEN_END: 'open_end' } })`,
        ] 
      });

      expect(element.constructor.events.OPEN_END, error).to.be.a('string');
    });
  });

  it(`should have a Pokeball with a static events property which contains CLOSE_START`, () => {
    const element = 'pokeball';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      const error = new CustomError({ 
        issue: `Pokeball няма event CLOSE_START`, 
        tips: [
          `Увери се, че си добавил статичен getter (static get events() { ... })`,
          `Увери се, че си добавил event property-то на класа Pokeball`,
          `Увери се, че event-ите връщат обект в, който е дефиниран CLOSE_START (static get events() { return { CLOSE_START: 'close_start' } })`,
        ] 
      });

      expect(element.constructor.events.CLOSE_START, error).to.be.a('string');
    });
  });

  it(`should have a Pokeball with a static events property which contains CLOSE_END`, () => {
    const element = 'pokeball';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      const error = new CustomError({ 
        issue: `Pokeball няма event CLOSE_END`, 
        tips: [
          `Увери се, че си добавил статичен getter (static get events() { ... })`,
          `Увери се, че си добавил event property-то на класа Pokeball`,
          `Увери се, че event-ите връщат обект в, който е дефиниран CLOSE_END (static get events() { return { CLOSE_END: 'close_end' } })`,
        ] 
      });

      expect(element.constructor.events.CLOSE_END, error).to.be.a('string');
    });
  });

  it(`should have a Button which when clicked shuffles the text property of Pokeball`, { retries: 5 }, () => {
    cy.visit(Cypress.config('url'));
    cy.getPixiStage().getPixiElementByName(
      'button',
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'button' })  
    ).then((button) => {
      cy.getPixiStage().getPixiElementByName(
        'pokeball',
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'pokeball' })  
      ).then((pokeball) => {
        const error = new CustomError({ 
          issue: `text-a на Pokeball класа не се променя (shuffle-ва)`, 
          tips: [
            `Увери се, че се променя стойноста на текста (.text) поне 50 пъти`,
          ] 
        });
        cy.wait(500);

        let value = pokeball.text.text;
        button.emit('click');
        
        cy.wait(500).then(() => {
          expect(pokeball.text.text, error).to.not.eq(value)
        });
      });
    });
  });

  it(`should have a Button which when clicked the 'open' method of Pokeball is called`, () => {
    cy.visit(Cypress.config('url'));
    cy.getPixiStage().getPixiElementByName(
      'button',
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'button' })  
    ).then((button) => {
      cy.getPixiStage().getPixiElementByName(
        'pokeball',
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'pokeball' })  
      ).then((pokeball) => {
        const error = new CustomError({ 
          issue: `Не се извика 'open' метода на Pokeball след click`, 
          tips: [
            `Увери се, че метода, който отваря Pokeball и активира shuffle-a се казва 'open'`,
            `Увери се, че метода 'open' е дефиниран в класа`,
          ] 
        });

        cy.spy(pokeball, 'open');
        button.emit('click');
        expect(pokeball.open, error).to.be.called;
      });
    });
  });

  it(`should have a Pokeball shuffle which does not exceed more than 7 seconds`, () => {
    cy.visit(Cypress.config('url'));
    cy.getPixiStage().getPixiElementByName(
      'button',
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'button' })  
    ).then((button) => {
      cy.getPixiStage().getPixiElementByName(
        'pokeball',
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'pokeball' })  
      ).then((pokeball) => {
        const error = new CustomError({ 
          issue: `Pokeball остана отворен повече от 7 секунди`, 
          tips: [
            `Увери се, че shuffle анимацията ти никога не надвишава 7 секунди`,
            `Увери се, че променяш isOpened property-то на Pokeball класа след като се затвори pokeball`,
          ] 
        });

        button.emit('click');
        cy.wait(7000).then(() => {
          expect(pokeball.isOpened, error).to.be.false
        });
      });
    });
  });

  it(`should have a Button which is hidden on click`, () => {
    cy.visit(Cypress.config('url'));
    cy.getPixiStage().getPixiElementByName(
      'button',
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'button' })  
    ).then((button) => {
      const error = new CustomError({ 
        issue: `Бутона не изглежда да се скрива след клик`, 
        tips: [
          `Увери се, че скриваш бутона използвайки alpha property-то`,
          `Увери се, че анимацията на скриване на бутона не надвишава 1 секунда`,
          `Увери се, че променяш alpha property-то на бутона директно не отделно на text-a и shape-a`,
        ] 
      });

      button.emit('click');
      cy.wait(1000).then(() => {
        expect(button.alpha, error).to.eq(0);
      });
    });
  });

  it(`should have a Button which reapears after the shuffle animation`, () => {
    cy.visit(Cypress.config('url'));
    cy.getPixiStage().getPixiElementByName(
      'button',
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'button' })  
    ).then((button) => {
      cy.getPixiStage().getPixiElementByName(
        'pokeball',
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'pokeball' })  
      ).then((pokeball) => {
        const error = new CustomError({ 
          issue: `Бутона не изглежда да се показва след като Pokeball се е затворил`, 
          tips: [
            `Увери се, че показваш бутона използвайки alpha property-то`,
            `Увери се, че анимацията показване на бутона не надвишава 1 секунда`,
            `Увери се, че променяш alpha property-то на бутона директно не отделно на text-a и shape-a`,
          ] 
        });

        button.emit('click');
        cy.log(pokeball);
        cy.wrap(pokeball).pixiOn('close_end');
        cy.wait(1000).then(() => {
          expect(button.alpha, error).to.eq(1);
        });
      });
    });
  });

});



