const CustomError = require("../support/errors/CustomError");

context(`task-7`, () => {

  it(`should have a merge commit from dev into master`, () => {
    cy.task('gitLog').then((data) => {
      cy.log('Git Log', data);

      expect(
        data[0].commit.message.split(" "),
        new CustomError({ 
          issue: 'Липсва merge commit-a от dev към master', 
          tips: [
            'Увери се, че не си използвал "Fast forward"', 
            'Увери се, че наистина си import-нал проекта описан в task-a',
            'Увери се, че си push-нал промените си'
          ] 
        })
      ).to.include.members(["Merge", "branch"]);

      expect(
        data[0].commit.parent.length,
        new CustomError({ 
          issue: 'Липсва merge commit-a от dev към master', 
          tips: [
            'Увери се, че не си използвал "Fast forward"', 
            'Увери се, че наистина си import-нал проекта описан в task-a',
            'Увери се, че си push-нал промените си'
          ] 
        })
      ).to.eq(2);
    });
  });
  
  it(`should have a tag with a value of v1.0.0`, () => {
    cy.task('gitListTags').then((data) => {
      cy.log('Git Tags', data);

      expect(
        data,
        new CustomError({ 
          issue: 'Липсва tag-a v1.0.0', 
          tips: [
            'Увери се, че си създал tag-a', 
            'Увери се, че си push-нал tag-a',
            'Увери се, че tag-a се е с име v1.0.0 (плюс v-то)',
          ] 
        })
      ).to.include('v1.0.0');
    });
  });

});
