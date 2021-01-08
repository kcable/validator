const CustomError = require("../support/errors/CustomError");
const files = [
  'src/components/Rocket.js',
  'src/components/ProgressBar.js',
  'src/components/Stats.js',
  'src/components/Arrow.js',
  'src/components/Rocket.js',
  'src/components/rockets/Rocket1.js',
  'src/components/rockets/Rocket2.js',
  'src/components/rockets/Rocket3.js',
  'src/components/rockets/Rocket4.js',
];

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

  files.forEach((file) => {
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
  
        expect(data, error).to.include(file);
      });
    });
  });

  files.forEach((file) => {
    it(`should have a ${file}.js which is a es6 class`, () => {
      cy.task('readFileSync', { file }).then((data) => {
        const path = file.split('/');
        const name = path[path.length - 1].split('.')[0]; // src/components/rockets/Rocket4.js => Rocket4
        const error = new CustomError({ 
          issue: `${file}.js не е es6 class`, 
          tips: [
            `Увери се, че използваш es6 синтаксиса за създаване на класове "export default class MyClass..."`,
            `Увери се, че класа ти се казва ${name}`,
          ] 
        });

        expect(data, error).to.include(`export default class ${name}`);
      });
    });
  });

  it(`should have a Rocket on the stage with a "name" of rocket-1 which is a PIXI.Container`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'rocket-1';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element} не PIXI.Container`, 
          tips: [
            `Увери се, че Rocket1 extend-ва Rocket`,
            `Увери се, че Rocket extend-ва PIXI.Container`,
            `Rocket класа приема "name" в конструктора`,
          ] 
        });

        expect(element instanceof PIXI.Container, error).to.be.true;
      });
    });
  });

  it(`should have a Rocket on the stage with a "name" of rocket-1 and a "_inner" property which is a PIXI.Container`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'rocket-1';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element}._inner не PIXI.Container`, 
          tips: [
            `Увери се, че Rocket1 extend-ва Rocket`,
            `Увери се, че Rocket extend-ва PIXI.Container`,
            `Rocket класа приема "name" в конструктора`,
          ] 
        });

        expect(element._inner instanceof PIXI.Container, error).to.be.true;
      });
    });
  });

  it(`should have a Rocket on the stage with a "name" of rocket-1 and a "_fire" property which is a PIXI.Container`, () => {
    cy.getPixi().then((PIXI) => {
      const element = 'rocket-1';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element}._fire не PIXI.Container`, 
          tips: [
            `Увери се, че си закачил правилно огъня (this._fire = new Fire())`,
          ] 
        });

        expect(element._fire instanceof PIXI.Container, error).to.be.true;
        expect(element._fire.ignite, error).to.exist;
        expect(element._fire.extinguish, error).to.exist;
      });
    });
  });

  ['ignite', 'extinguish'].forEach((method) => {
    it(`should have a Rocket on the stage with a "name" of rocket-1 and a "${method}" method`, () => {
      const element = 'rocket-1';
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `${element}.${method} не е функция`, 
          tips: [
            `Увери се, че си закачил дефинирал ${method} метода в Rocket.js`,
          ] 
        });

        expect(element[method], error).to.be.a('function');
      });
    });
  });

  it(`should have a Stats instance`, () => {
    const element = 'stats';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    )
  });

  ['progressbar-Speed', 'progressbar-Acceleration', 'progressbar-Handling'].forEach((element) => {
    it(`should have a Progressbar instance with a "${element}" getter which is a PIXI.Graphics`, () => {
      cy.getPixi().then((PIXI) => {
        cy.getPixiStage().getPixiElementByName(
          element,
          new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
        ).then((element) => {
          const error = new CustomError({ 
            issue: `Не съществува .bar getter в ${element}`, 
            tips: [
              `Увери се, че си закачил дефинирал getter-a в Progressbar.js - get bar() { ... }`,
            ] 
          });

          expect(element.bar instanceof PIXI.Graphics, error).to.be.true;
        });
      });
    });
  });

  ['progressbar-Speed', 'progressbar-Acceleration', 'progressbar-Handling'].forEach((element) => {
    it(`should have a Progressbar with a "bar" getter which has a width which correlates with the progressbar value`, () => {
      cy.getPixiStage().getPixiElementByName(
        element,
        new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
      ).then((element) => {
        const error = new CustomError({ 
          issue: `bar-a в Progressbar не е с правилната ширина. Ширината трябва да отговаря на value-то на progressbar-a спрямо max-a.`, 
          tips: [
            `Увери се, че калкулацията за ширината на bar е правилна`,
            `Виж preview-то на задачата отново`,
            `Нещо такова - this.background.width * this._value / this._max`,
          ] 
        });

        let width = element.background.width * element._value / element._max;
        expect(element.bar.width, error).to.be.closeTo(width - 10, width + 10); // Showing leniency
      });
    });
  });

  it(`should have a Arrow with the name of "arrow-left" on the stage`, () => {
    const element = 'arrow-left';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    );
  });

  it(`should have a Arrow with the name of "arrow-right" on the stage`, () => {
    const element = 'arrow-right';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    );
  });

  it(`should have a Arrow with the name of "arrow-right" on the stage which changes the active rocket to the next index`, () => {
    const element = 'arrow-right';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      const oldRocket = element.parent.children.find((el) => el.name.includes('rocket'));
      const oldIndex = parseInt(oldRocket.name.split('-')[1]);

      element.emit('click');
      cy.wait(1000).then(() => {
        const newRocket = element.parent.children.find((el) => el.name.includes('rocket'));
        const newIndex = parseInt(newRocket.name.split('-')[1]);

        expect(newIndex).to.be.above(oldIndex);
      });
    });
  });

  it(`should have a Arrow with the name of "arrow-left" on the stage which changes the active rocket to the next index`, () => {
    const element = 'arrow-left';
    cy.getPixiStage().getPixiElementByName(
      element,
      new CustomError(CustomError.common.PIXI_ELEMENT_NOT_FOUND, null, { element })  
    ).then((element) => {
      const oldRocket = element.parent.children.find((el) => el.name.includes('rocket'));
      const oldIndex = parseInt(oldRocket.name.split('-')[1]);

      element.emit('click');
      cy.wait(1000).then(() => {
        const newRocket = element.parent.children.find((el) => el.name.includes('rocket'));
        const newIndex = parseInt(newRocket.name.split('-')[1]);

        expect(newIndex).to.be.below(oldIndex);
      });
    });
  });

});



