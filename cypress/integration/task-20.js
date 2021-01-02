const CustomError = require("../support/errors/CustomError");

context('task-20', () => {
  it('should have a PIXI app', () => {
    cy.visit('/');
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

  it(`should have a Button which when clicked shuffles the text property of Pokeball`, { retries: 5 }, () => {
    cy.getPixiStage().getPixiElementByName(
      'button',
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'button' })  
    ).then((button) => {
      cy.getPixiStage().getPixiElementByName(
        'pokeball',
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'pokeball' })  
      ).then((pokeball) => {
        let value = pokeball.text.text;
        button.emit('click');
        
        cy.wait(500).then(() => {
          expect(pokeball.text.text).to.not.eq(value)
        });

        //Wait for the animation to end before proceeding to the next test
        cy.getPixiStage().getPixiElementByName('pokeball').pixiOn('close_end');
      });
    });
  });

  it(`should have a Button which when clicked shuffles the text property of Pokeball`, () => {
    cy.getPixiStage().getPixiElementByName(
      'button',
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'button' })  
    ).then((button) => {
      cy.getPixiStage().getPixiElementByName(
        'pokeball',
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element: 'pokeball' })  
      ).then((pokeball) => {
        cy.spy(pokeball, 'open');
        button.emit('click');
        expect(pokeball.open).to.be.called
      });
    });
  });

});



