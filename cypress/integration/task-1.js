context('task-1', () => {


  it('has 4 commits', () => {
    cy.task('gitLog', {
      dir: './.tmp'
    }).then((data) => {
      expect(data.length).to.be.at.least(1);
    })
  });
});
