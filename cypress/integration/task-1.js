context('task-1', () => {
  // before(() => {
  //   cy.task('gitClone', {
  //     url: Cypress.env('REPO_URL'),
  //     dir: "./.tmp"
  //   })
  //     .then((data) => {
  //       expect(data).to.be.true;
  //     });
  // });

  it('should get the pipeline variable', () => {
    expect(Cypress.env('TEST_VARIABLE')).to.not.be.undefined;
  });

  // it('has 4 commits', () => {
  //   cy.task('gitLog', {
  //     dir: './.tmp'
  //   }).then((data) => {
  //     expect(data.length).to.equal(1);
  //   })
  // });
  //
  // after(() => {
  //   cy.task('rmDir', {
  //     dir: './.tmp'
  //   })
  //     .then((data) => {
  //       expect(data).to.be.true;
  //     });
  // });
});
