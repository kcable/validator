const CustomError = require("../support/errors/CustomError");

// - MagicHat.js must have a "_item" property which is a PIXI Text. This is the element which shows the emojis.
// - MagicHat.js must have a "_body" property which should be a PIXI.Sprite containing the main image of the hat.

// - When the "_body" of the MagicHat is clicked a random emoji should be shown by the "_item"
// - The magic hat must have a "name" property of 'magic-hat'

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

  it(`should have a MagicHat.js file in /components`, () => {
    cy.task('gitListFiles').then((data) => {
      const error = new CustomError({ 
        issue: `Липсва файла MagicHat.js`, 
        tips: [
          'Увери се, че си създал файла на правилното място', 
          'Провери разширението на файла',
          'Увери се, че си push-нал промените си',
        ] 
      });

      expect(data, error).to.include(`src/components/MagicHat.js`);
    });
  });

  it(`should have a MagicHat.js which is a es6 class`, () => {
    cy.log(`src/components/MagicHat.js`);
    cy.task('readFileSync', { file: `src/components/MagicHat.js` }).then((data) => {
      const error = new CustomError({ 
        issue: `MagicHat.js не е es6 class`, 
        tips: [
          `Увери се, че използваш es6 синтаксиса за създаване на класове "export default class MyClass..."`,
          `Увери се, че класа ти се казва MagicHat`,
        ] 
      });

      expect(data, error).to.include(`export default class MagicHat`);
    });
  });

  it(`should have a element on the stage with a 'name' of MagicHat.js which  in /components a PIXI.Container`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'magic-hat';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element} не PIXI.Container`, 
          tips: [
            `Увери се, че ${element} extend-ва PIXI.Container`,
            `Увери се, че е set-нато правилното име на елемента`,
          ] 
        });

        expect(element instanceof PIXI.Container, error).to.be.true;
      });
    });
  });

  it(`should have a MagicHat with a _body property which is a PIXI.Sprite`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'magic-hat';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element}._body не e PIXI.Sprite`, 
          tips: [
            `Увери се, че си закачил правилно sprite-a this._body = new Sprite.from('hat');`,
          ] 
        });

        expect(element._body instanceof PIXI.Sprite, error).to.be.true;
      });
    });
  });

  it(`should have a MagicHat with a _item property which is a PIXI.Text`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'magic-hat';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element}._item не e PIXI.Text`, 
          tips: [
            `Увери се, че си закачил правилно sprite-a this._item = new Text('', { fontSize: 200 });`,
            `Увери се, че създаваш this._item само веднъж при инстанцирането на MagicHat`,
          ] 
        });

        expect(element._item instanceof PIXI.Text, error).to.be.true;
      });
    });
  });

  it(`should have a MagicHat with a _item property which is a PIXI.Text which has a PIXI.Sprite mask`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'magic-hat';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `Липсва маската на _item`, 
          tips: [
            `Увери се, че си задал маската правилно this._item.mask = mask;`,
            `Увери се, че маската е на сцената`,
          ] 
        });

        expect(element._item.mask instanceof PIXI.Sprite, error).to.be.true;
      });
    });
  });

  it(`should have a MagicHat which when clicked pulls out a random emoji`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'magic-hat';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const old = element._item.text;
        element._body.emit('click');

        const error = new CustomError({ 
          issue: `Липсва маската на _item`, 
          tips: [
            `Увери се, че си задал маската правилно this._item.mask = mask;`,
            `Увери се, че маската е на сцената`,
          ] 
        });

        cy.wait(1000).then(() => {
          expect(element._item.text, error).to.not.eq(old);
        });
      });
    });
  });
});



