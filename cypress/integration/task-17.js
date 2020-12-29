const CustomError = require("../support/errors/CustomError");

context(`task-17`, () => {

  it(`should have a merge commit from feature-initiate into dev`, () => {
    cy.task('gitLog', { ref: 'origin/dev' }).then((data) => {
      cy.log('Git Log', data);

      expect(
        data[0].commit.message.split(" "),
        new CustomError({ 
          issue: 'Липсва merge commit-a от dev към master', 
          tips: [
            'Увери се, че наистина си fork-нал проекта описан в task-a"',
          ] 
        })
      ).to.include.members(["Merge", "branch"]);

      expect(
        data[0].commit.parent.length,
        new CustomError({ 
          issue: 'Липсва merge commit-a от dev към master', 
          tips: [
            'Увери се, че наистина си fork-нал проекта описан в task-a"',
          ] 
        })
      ).to.eq(2);
    });
  });

  it(`should have a index.html file in the project root`, () => {
    cy.task('gitListFiles', { ref: 'origin/dev' }).then((data) => {
      cy.log('Git Files', data);

      expect(
        data,
        new CustomError({ 
          issue: 'Липсва index.html в branch dev', 
          tips: [
            'Увери се, че си commit-нал файла index.html в branch feature-initiate',
            'Увери се, че си merge-нал feature-initiate в dev',
            'Увери се, че си push-нал промените си',
          ] 
        })
      ).to.include('index.html');
    });
  });

  it(`should have a config.js file in the project root`, () => {
    cy.task('gitListFiles', { ref: 'origin/dev' }).then((data) => {
      cy.log('Git Files', data);

      expect(
        data,
        new CustomError({ 
          issue: 'Липсва config.js в branch dev', 
          tips: [
            'Увери се, че си commit-нал файла config.js в branch feature-initiate',
            'Увери се, че си merge-нал feature-initiate в dev',
            'Увери се, че си push-нал промените си',
          ] 
        })
      ).to.include('config.js');
    });
  });

  it(`should have the feature-initiate branch`, () => {
    cy.task('gitListBranches').then((data) => {
      cy.log('Git Files', data);

      expect(
        data,
        new CustomError({ 
          issue: 'Липсва branch-a feature-initiate', 
          tips: [
            'Увери се, че си push-нал бранча feature-initiate',
            'Провери дали бранча feature-initiate съществува в страницата на проекта в gitlab',
          ] 
        })
      ).to.include('feature-initiate');
    });
  });
  
});
