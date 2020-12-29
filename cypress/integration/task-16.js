const CustomError = require("../support/errors/CustomError");

context(`task-2`, () => {

  it(`should have a first commit with a SHA of 2a0bd54ecbbcdc88a4eae7ed09b1b3aea7d57de4`, () => {
    cy.task('gitLog', { ref: 'origin/dev' }).then((data) => {
      cy.log('Git Log', data);

      expect(
        data[0].oid,
        new CustomError({ 
          issue: 'Не е cherry pick-нат commit-a с SHA 2a0bd54ecbbcdc88a4eae7ed09b1b3aea7d57de4 в dev бранча', 
          tips: [
            'Увери се, че си превключил на dev branch-a преди да cherry pick-неш', 
            'Увери се, че си cherry pick-нал commit-ите последователно както са в master',
            'Увери се, че наистина си fork-нал проекта описан в task-a',
          ] 
        })
      ).to.equal('2a0bd54ecbbcdc88a4eae7ed09b1b3aea7d57de4');
    });
  });

  it(`should have a second commit with a SHA of 235574808aa7641b045059e3310b873071a54578`, () => {
    cy.task('gitLog', { ref: 'origin/dev' }).then((data) => {
      cy.log('Git Log', data);

      expect(
        data[1].oid,
        new CustomError({ 
          issue: 'Не е cherry pick-нат commit-a с SHA 2a0bd54ecbbcdc88a4eae7ed09b1b3aea7d57de4 в dev бранча', 
          tips: [
            'Увери се, че си превключил на dev branch-a преди да cherry pick-неш', 
            'Увери се, че си cherry pick-нал commit-ите последователно както са в master',
            'Увери се, че наистина си fork-нал проекта описан в task-a',
          ] 
        })
      ).to.equal('235574808aa7641b045059e3310b873071a54578');
    });
  });
  
});
