const CustomError = require("../support/errors/CustomError");

context(`task-8`, () => {

  it(`should have a merge commit from dev into master`, () => {
    cy.task('gitLog').then((data) => {
      cy.log('Git Log', data);

      expect(
        data[0].commit.message.split(" "),
        new CustomError({ 
          issue: 'Липсва merge commit-a от dev към master', 
          tips: [
            'Увери се, че наистина си fork-нал проекта описан в task-a"',
          ] 
        })
      ).to.include.members(["Merge", "branch"]);

      expect(
        data[0].commit.parent.length,
        new CustomError({ 
          issue: 'Липсва merge commit-a от dev към master', 
          tips: [
            'Увери се, че наистина си fork-нал проекта описан в task-a"',
          ] 
        })
      ).to.eq(2);
    });
  });
  
  it(`should not have a tag with a value of v9.0.0`, () => {
    cy.task('gitListTags').then((data) => {
      cy.log('Git Tags', data);

      expect(
        data,
        new CustomError({ 
          issue: 'Липсва tag-a v9.0.0', 
          tips: [
            'Увери се, че си изтрил тага от remote-a (origin)',
          ] 
        })
      ).to.not.include('v9.0.0');
    });
  });

});
