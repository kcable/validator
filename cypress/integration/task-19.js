const CustomError = require("../support/errors/CustomError");

context('task-19', () => {
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

  it(`should have a 'src/components/Fish.js' file`, () => {
    cy.task('gitListFiles').then((data) => {
      expect(
        data,
        new CustomError({ 
          issue: 'Липсва файла "src/components/Fish.js"', 
          tips: [
            'Увери се, че си създал файла на правилното място', 
            'Провери разширението на файла',
            'Увери се, че си push-нал промените си',
          ] 
        })
      ).to.include('src/components/Fish.js');
    });
  });

  it(`should have a Fish.js which is a es6 class`, () => {
    cy.task('readFileSync', { file: 'src/components/Fish.js' }).then((data) => {

      expect(
        data,
        new CustomError({ 
          issue: 'Fish.js не е es6 class', 
          tips: [
            'Увери се, че използваш es6 синтаксиса за създаване на класове "export default class MyClass..."',
            'Увери се, че класа ти се казва Fish',
          ] 
        })
      ).to.include('export default class Fish');
    });
  });

  it(`should have a Fish.js which extends a PIXI sprite`, () => {
    cy.task('readFileSync', { file: 'src/components/Fish.js' }).then((data) => {

      expect(
        data,
        new CustomError({ 
          issue: 'Fish.js не extend-ва PIXI sprite', 
          tips: [
            `Увери се, че си import-нал sprite-a като "import { Sprite } from 'pixi.js'"`,
            `Увери се, че използваш es6 синтаксиса за extend-ване на класове`,
          ] 
        })
      ).to.include('extends Sprite');
    });
  });

  it(`should have a Fish class with a name property with a value of "fish"`, () => {
    const element = 'fish';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.name).to.eq('fish', new CustomError({ 
        issue: 'name property-то на Fish класа не е fish', 
        tips: [
          `Увери се, че си кръстил рибата правилно"`,
        ] 
      }));
    });
  });

  it(`should have a Fish class with a method named expand`, () => {
    const element = 'fish';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.expand, new CustomError({ 
        issue: `Не успяваме да намерим метода 'expand'`, 
        tips: [
          `Увери се, че си кръстил метода правилно`,
          `Увери се, че метода е част от класа Fish`,
        ] 
      })).to.exist;
    });
  });

  it(`should have a Fish class with a method named contract`, () => {
    const element = 'fish';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.contract, new CustomError({ 
        issue: `Не успяваме да намерим метода 'contract'`, 
        tips: [
          `Увери се, че си кръстил метода правилно`,
          `Увери се, че метода е част от класа Fish`,
        ] 
      })).to.exist;
    });
  });

  it(`should have a Fish which changes the mouse to a pointer on hover`, () => {
    const element = 'fish';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.buttonMode, new CustomError({ 
        issue: `Fish няма set-нат buttonMode, което значи, че курсора не е pointer при hover.`, 
        tips: [
          `Увери се, че си задал buttonMode на fish (this.buttonMode = true)`,
        ] 
      })).to.be.true;
    });
  });

  it(`should have a Fish which has the 'interactive' property set to true`, () => {
    const element = 'fish';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      expect(element.interactive, new CustomError({ 
        issue: `Fish няма set-нат interactive, което значи, че рибата няма да може да се кликва.`, 
        tips: [
          `Увери се, че си задал interactive на fish (this.interactive = true)`,
        ] 
      })).to.be.true;
    });
  });

  it(`should have a Fish expanding by x1.5 when clicked`, () => {
    const element = 'fish';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      const textureName = element.texture.textureCacheIds[0];

      element.emit('click');
      cy.wait(1000).then(() => {
        cy.log(element);

        const error = new CustomError({ 
          issue: `Fish не изглежда да е станала по-голяма след click-ване.`, 
          tips: [
            `Увери се, че променяш scale.x property-то`,
            `Увери се, че променяш scale.y property-то`,
            `Увери се, че променяш scale-а на самата Fish инстанция`,
          ] 
        });

        expect(element.scale.x, error).to.be.gt(1);
        expect(element.scale.y, error).to.be.gt(1);
      })
      cy.wait(5000);
    });
  });

  it(`should have a Fish which changes it's texture clicked`, () => {
    const element = 'fish';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      const textureName = element.texture.textureCacheIds[0];

      element.emit('click');
      cy.wait(1000).then(() => {
        cy.log(element);

        const error = new CustomError({ 
          issue: `Fish не изглежда да е сменя текстурата си при клик.`, 
          tips: [
            `Увери се, че променяш texture property-то на Fish`,
            `Увери се, че задаваш валидна текстура (PIXI.Texture)`,
          ] 
        });

        expect(element.texture.textureCacheIds[0], error).to.not.eq(textureName);
      })
    });
  });

});



