context('task-1', () => {
  it('Does have 4 commits', () => {
    cy.task('gitLog').then((data) => {
      expect(data.length).to.equal(4)
    })
  });
});