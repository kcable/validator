const CustomError = require("../support/errors/CustomError");

context('task-1', () => {
  it('should have at least 1 commit', () => {
    cy.task('gitLog').then((data) => {
      expect(
        data.length,
        new CustomError({ 
          issue: 'Repository-то няма достатъчно commit-и', 
          tips: [
            'Виж секцията cherry pick отново', 
            'Увери се, че си commit-нал и push-нал промените си'
          ] 
        })
      ).to.be.lessThan(2);
    })
  });
});
