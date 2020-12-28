const CustomError = require("../support/errors/CustomError");

context('task-1', () => {
  it('should have at least 1 commit', () => {
    cy.task('gitLog').then((data) => {
      cy.log('Git Log', data);

      expect(
        data[0],
        new CustomError({ 
          issue: 'Липсва първия commit в repository-то', 
          tips: [
            'Виж клипа и описанието в урока за fork-ване отново', 
            'Увери се, че наистина си fork-нал проекта описан в task-a'
          ] 
        })
      ).to.exist;

      expect(
        data[0].oid,
        new CustomError({ 
          issue: 'Първия commit от repository-то не съвпада с този описан в task-a.', 
          tips: [
            'Увери се, че първия commit в repository-то ти е с SHA 7981f4d68785045b36bea101686240f6d4245070', 
            'Увери се, че наистина си fork-нал проекта описан в task-a'
          ] 
        })
      ).to.equal('7981f4d68785045b36bea101686240f6d4245070');
    })
  });
});
