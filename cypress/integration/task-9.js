const CustomError = require("../support/errors/CustomError");

context(`task-9`, () => {

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
  
  it(`should have resolved the conflict with the ooo in package.json`, () => {
    cy.task('readFileSync', { file: 'package.json' }).then((data) => {

      expect(
        data,
        new CustomError({ 
          issue: 'Не са избрани правилните промени при resolve-ването на конфликта', 
          tips: [
            'Избери промените, които съдържат "ooo"',
            'Увери се, че си push-нал промените си',
          ] 
        })
      ).to.include('ooo');
    });
  });

  it(`should not contain conflicts in package.json`, () => {
    cy.task('readFileSync', { file: 'package.json' }).then((data) => {

      expect(
        data,
        new CustomError({ 
          issue: 'Не са resolve-нати conflict-ите в package.json', 
          tips: [
            'Гледай урока за resolve-ване на конфликти отново',
            'Увери се, че си push-нал промените си',
            'Избягвай използването на git през конзолата за resolve-ване на конфликти',
          ] 
        })
      ).to.not.include('<<<<<<<');
    });
  });

});
