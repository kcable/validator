const CustomError = require("../support/errors/CustomError");

// - The Rocket must rotate around the earth


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

  ['Sun', 'Rocket', 'Earth', 'Stars'].forEach((file) => {
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

  ['sun', 'rocket', 'earth', 'stars'].forEach((file) => {
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

  it(`should have a Rocket which is a child of Earth`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'rocket';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element} не e child na Earth`, 
          tips: [
            `Увери се, че създаваш и добавяш Rocket в Earth`,
          ] 
        });

        expect(element.parent.name, error).to.eq('earth');
      });
    });
  });

  it(`should have a Rocket with a _body property which is a PIXI.Sprite instance`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'rocket';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element}._body не e PIXI.Sprite`, 
          tips: [
            `Увери се, че си закачил правилно sprite-a this._body = new Sprite.from('rocket');`,
          ] 
        });

        expect(element._body instanceof PIXI.Sprite, error).to.be.true;
      });
    });
  });

  it(`should a Sun which has a _blast property which is a PIXI.Sprite`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'sun';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element}._blast не e PIXI.Sprite`, 
          tips: [
            `Увери се, че си закачил правилно sprite-a this._blast = new Sprite.from('sunBlast');`,
          ] 
        });

        expect(element._blast instanceof PIXI.Sprite, error).to.be.true;
      });
    });
  });

  it(`should a Sun which has a _blast property which is used for a filter set on the viewport`, () => {
    cy.getPixiApp().then((app) => {
      const element = 'sun';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element}._blast не e PIXI.Sprite`, 
          tips: [
            `Увери се, че си закачил правилно sprite-a this._blast = new Sprite.from('sunBlast');`,
          ] 
        });

        expect(app.viewport.filters[0].maskSprite === element._blast, error).to.be.true;
      });
    });
  });

  it(`should have a Rocket with a _fire property which is a PIXI.Container instance`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'rocket';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element}._fire не e инстанция на Fire`, 
          tips: [
            `Увери се, че си закачил правилно sprite-a this._fire = new Fire();`,
          ] 
        });

        expect(element._fire instanceof PIXI.Container, error).to.be.true;
      });
    });
  });

  it(`should have a Rocket with a rotates around Earth`, () => {
    const element = 'rocket';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      const error = new CustomError({ 
        issue: `Не е set-нат pivot на Rocket, което е най-лесния начин да постигнеш ефекта от demo-то`, 
        tips: [
          `this._rocket.pivot.set(-350, 0);`,
        ] 
      });

      expect(element.pivot.x, error).to.be.lessThan(0);
    });
  });

  ['_glowTop', '_glowTop'].forEach((prop) => {
    it(`should a Sun which has a ${prop} property which is a PIXI.Sprite`, () => {
      cy.getPixi().then((PIXI) => {
        const element = 'sun';
        cy.getPixiStage().getPixiElementByName(
          element,
          new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
        ).then((element) => {
          const error = new CustomError({ 
            issue: `${prop} не e PIXI.Sprite`, 
            tips: [
              `Увери се, че си създал _${prop} и си го закачил правилно this._${prop} = new Sprite.from('sunGlow');`,
            ] 
          });
  
          expect(element[prop] instanceof PIXI.Sprite, error).to.be.true;
        });
      });
    });

    it(`should a Sun which has a ${prop} property which has a blendMode of BLEND_MODES.SCREEN`, () => {
      cy.getPixi().then((PIXI) => {
        const element = 'sun';
        cy.getPixiStage().getPixiElementByName(
          element,
          new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
        ).then((element) => {
          const error = new CustomError({ 
            issue: `${prop} не е с правилния blendMode`, 
            tips: [
              `Увери се, че си set-нал правилния blendMode this._${prop}.blendMode = BLEND_MODES.SCREEN;`,
            ] 
          });
  
          expect(element[prop].blendMode, error).to.be.eq(PIXI.BLEND_MODES.SCREEN);
        });
      });
    });
  });
});



