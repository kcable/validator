context('task-1', () => {
  it('should have at least 1 commit', () => {
    cy.task('gitLog', {
      dir: './.tmp'
    }).then((data) => {
      expect(data.length).to.be.at.least(1);
    })
  });
});
