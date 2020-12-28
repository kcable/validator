const CustomError = require("../support/errors/CustomError");

context(`task-6`, () => {
  
  it(`should have a first commit in it's git log`, () => {
    cy.task('gitListFiles', { ref: 'origin/feature-test' }).then((data) => {
      cy.log('Git Files', data);

      expect(
        data,
        new CustomError({ 
          issue: 'Липсва test.html в branch feature-test', 
          tips: [
            'Увери се, че си създал бранча feature-test', 
            'Увери се, че си commit-нал файла test.html в branch feature-test',
            'Увери се, че си push-нал промените си',
          ] 
        })
      ).to.include('test.html');
    });
  });

});
