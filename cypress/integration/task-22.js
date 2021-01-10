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

 

  ['Pinata', 'Cactus'].forEach((file) => {
    it(`should have a '${file}' file`, () => {
      cy.task('gitListFiles').then((data) => {
        const error = new CustomError({ 
          issue: `Липсва файла "${file}"`, 
          tips: [
            'Увери се, че си създал файла на правилното място', 
            'Провери разширението на файла',
            'Увери се, че си push-нал промените си',
          ] 
        });
  
        expect(data, error).to.include(`src/components/${file}.js`);
      });
    });
  });

  ['Pinata', 'Cactus'].forEach((file) => {
    it(`should have a ${file}.js which is a es6 class`, () => {
      cy.log(`src/components/${file}.js`);
      cy.task('readFileSync', { file: `src/components/${file}.js` }).then((data) => {
        const error = new CustomError({ 
          issue: `${file}.js не е es6 class`, 
          tips: [
            `Увери се, че използваш es6 синтаксиса за създаване на класове "export default class MyClass..."`,
            `Увери се, че класа ти се казва ${file}`,
          ] 
        });

        expect(data, error).to.include(`export default class ${file}`);
      });
    });
  });

  it(`should have a background which has alpha 0 before the music has started`, () => {
    const element = 'background';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      const error = new CustomError({ 
        issue: `${element}.alpha не е 0 което значи, че вероятно сцената е все още светла преди да започне музиката`, 
        tips: [
          `Set-ни this.background.alpha = 0 в Play.js, за да се получи желания ефект`,
          `Ако използваш "visible" property-то го промени на alpha = 0`,
          `Увери се, че си скрил фона преди да започне музиката`,
        ] 
      });

      expect(element.alpha, error).to.eq(0);
    });
  });

  ['pinata', 'cactus-1', 'cactus-2'].forEach((file) => {
    it(`should have a element on the stage with a 'name' of '${file}' which is a PIXI.Container`, () => {
      cy.getPixi().then((PIXI) => {
        const element = file;
        cy.getPixiStage().getPixiElementByName(
          element,
          new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
        ).then((element) => {
          const error = new CustomError({ 
            issue: `${element} не PIXI.Container`, 
            tips: [
              `Увери се, че ${file} extend-ва PIXI.Container`,
              `Увери се, че е set-нато правилното име на елемента`,
            ] 
          });

          expect(element instanceof PIXI.Container, error).to.be.true;
        });
      });
    });
  });

  it(`should have a Pinata which contains a _body property which is an instance of PIXI.Sprite`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'pinata';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `Не откриваме ._body в ${element}`, 
          tips: [
            `Увери се, че си създал _body и е PIXI.Sprite`,
            `this._body = Sprite.from('pinata')`,
          ] 
        });

        expect(element._body instanceof PIXI.Sprite, error).to.be.true;
      });
    });
  });

  it(`should have a Pinata which contains a _elements property which is an instance of PIXI.Sprite`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'pinata';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `Не откриваме ._elements в ${element}`, 
          tips: [
            `Увери се, че си създал _elements и е PIXI.Sprite`,
            `this._elements = new Container()`,
          ] 
        });

        expect(element._elements instanceof PIXI.Container, error).to.be.true;
      });
    });
  });

  it(`should have a background which has alpha 1 after the music intro has played`, () => {
    const element = 'background';
    cy.getPixiApp().then((app) => {
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        cy.wrap(app.game.currentScene._music).pixiOn('intro').then(() => {
          const error = new CustomError({ 
            issue: `${app}.alpha не е 1 което значи, че вероятно сцената е все още тъмна след като е започнала музиката`, 
            tips: [
              `Set-ни this.background.alpha = 1 в Play.js, за да се получи желания ефект`,
              `Ако използваш "visible" property-то го промени на alpha = 1`,
              `Увери се, че си показал фона преди да започне музиката`,
            ] 
          });

          expect(element.alpha, error).to.eq(1);
        });
      });
    });
  });

  it(`should have a pinata which when dances creates particles inside of _elements`, () => {
    const element = 'pinata';
    cy.getPixiApp().then((app) => {
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        cy.wrap(app.game.currentScene._music).pixiOn('beat').then(() => {
          const error = new CustomError({ 
            issue: `Не успяваме да намерим елемент с име 'particle' след като pinata танцува`, 
            tips: [
              `Увери се, че добавяш нов PIXI.Sprite в _elements всеки път щом се извика dance`,
              `Увери се, че добавяш 'name' на Sprite-a`,
            ] 
          });
          const particle = 'particle';
          cy.getPixiStage().getPixiElementByName(
            particle,
            error  
          ).then((particle) => {
            expect(particle, error).to.exist;
          });
        });
      });
    });
  });

  it(`should have a Pinata which when clicked creates a chili`, () => {
    const element = 'pinata';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      element._body.emit('click');

      const error = new CustomError({ 
        issue: `Не успяваме да намерим елемент с име 'chili' след като кликнем върху Pinata`, 
        tips: [
          `Увери се, че добавяш нов PIXI.Sprite в _elements всеки път щом се извика dance`,
          `Увери се, че добавяш 'name' на Sprite-a`,
          `Увери се, че си закачил listener-а за click на _body елемента this._body.on('click', () => this._handleBodyClick());`,
        ] 
      });

      const chili = 'chili';
      cy.getPixiStage().getPixiElementByName(
        chili,
        error  
      ).then((chili) => {
        expect(chili, error).to.exist;
      })
    });
  });

  it(`should have a Pinata which has a dance method`, () => {
    const element = 'pinata';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {

      const error = new CustomError({ 
        issue: `Не успяваме да намерим метод 'dance' на pinata`, 
        tips: [
          `Увери се, че си закачил дефинирал dance метода в Pinata.js`,
        ] 
      });

      expect(element.dance, error).to.be.a('function');
    });
  });

  it(`should have a Cactus with the name of 'cactus-1' which has a dance method`, () => {
    const element = 'cactus-1';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {

      const error = new CustomError({ 
        issue: `Не успяваме да намерим метод 'dance' на Cactus`, 
        tips: [
          `Увери се, че си закачил дефинирал dance метода в Cactus.js`,
        ] 
      });

      expect(element.dance, error).to.be.a('function');
    });
  });

});



