const CustomError = require("../support/errors/CustomError");

context(`task-16`, () => {

  it(`should have a first commit with a commit message of 'fix: update console log'`, () => {
    cy.task('gitLog', { ref: 'origin/dev' }).then((data) => {
      cy.log('Git Log', data);
      cy.log(data[0]);

      expect(
        data[0].commit.message,
        new CustomError({ 
          issue: `Не е cherry pick-нат commit-a с message 'fix: update console log' в dev бранча`, 
          tips: [
            'Увери се, че си превключил на dev branch-a преди да cherry pick-неш', 
            'Увери се, че си cherry pick-нал commit-ите последователно както са в master',
            'Увери се, че наистина си import-нал проекта описан в task-a',
          ] 
        })
      ).to.contain('fix: update console log');
    });
  });

  it(`should have a second commit with a commit message of 'fix: change project name'`, () => {
    cy.task('gitLog', { ref: 'origin/dev' }).then((data) => {
      cy.log('Git Log', data);

      expect(
        data[1].commit.message,
        new CustomError({ 
          issue: `Не е cherry pick-нат commit-a с message 'fix: change project name' в dev бранча`, 
          tips: [
            'Увери се, че си превключил на dev branch-a преди да cherry pick-неш', 
            'Увери се, че си cherry pick-нал commit-ите последователно както са в master',
            'Увери се, че наистина си import-нал проекта описан в task-a',
          ] 
        })
      ).to.contain('fix: change project name');
    });
  });
  
});
