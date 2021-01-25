const CustomError = require("../support/errors/CustomError");

context(`task-2`, () => {

  it(`should have a first commit in it's git log`, () => {
    cy.task('gitLog').then((data) => {
      cy.log('Git Log', data);

      expect(
        data[0],
        new CustomError({ 
          issue: 'Липсва първия commit в repository-то', 
          tips: [
            'Виж клипа и описанието в урока за import-ване отново', 
            'Увери се, че наистина си import-нал проекта описан в task-a'
          ] 
        })
      ).to.exist;
    });
  });

  it(`should have a first commit with a SHA of 7981f4d68785045b36bea101686240f6d4245070`, () => {
    cy.task('gitLog').then((data) => {
      cy.log('Git Log', data);

      expect(
        data[0].oid,
        new CustomError({ 
          issue: 'Първия commit от repository-то не съвпада с този описан в task-a.', 
          tips: [
            'Увери се, че първия commit в repository-то ти е с SHA 7981f4d68785045b36bea101686240f6d4245070', 
            'Увери се, че наистина си import-нал проекта описан в task-a'
          ] 
        })
      ).to.equal('7981f4d68785045b36bea101686240f6d4245070');
    });
  });
  
});
