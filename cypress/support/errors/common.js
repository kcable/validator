module.exports = {
  GIT_SHOW_LOG_NO_REF: {
    issue: 'Repository-то изглежда, че няма бранч {{ref}}.',
    tips: [
      'Увери се, че си commit-нал и push-нал промените си',
      'Ако си създал нов бранч увери се, че си го push-нал. Може да провериш дали съществува в Gitlab или Github.',
      'Увери се, че си направил fork-а правилно и прочети повече тук: https://app.booost.bg/courses/5/steps/31?trackId=2'
    ]
  },
  GIT_LIST_FILES: {
    issue: 'Не успяваме да достъпим файловете на repo-то',
    tips: [
      'Увери се, че си направил fork-а правилно и прочети повече тук: https://app.booost.bg/courses/5/steps/31?trackId=2'
    ]
  },
  GIT_LIST_TAGS: {
    issue: 'Не успяваме да достъпим tag-овете на repo-то',
    tips: [
      'Увери се, че си направил fork-а правилно и прочети повече тук: https://app.booost.bg/courses/5/steps/31?trackId=2'
    ]
  },
  GIT_LIST_BRANCHES: {
    issue: 'Не успяваме да достъпим branch-овете на repo-то',
    tips: [
      'Увери се, че си направил fork-а правилно и прочети повече тук: https://app.booost.bg/courses/5/steps/31?trackId=2'
    ]
  },
  GIT_CHECKOUT: {
    issue: 'Не успяваме да превключим на бранч {{ref}}',
    tips: [
      'Увери се, че бранча съществува',
      'Увери се, че си commit-нал и push-нал промените си',
      'Увери се, че си направил fork-а правилно и прочети повече тук: https://app.booost.bg/courses/5/steps/31?trackId=2',
    ]
  },
  PIXI_ELEMENT_NOT_FOUND: {
    issue: 'Не успяваме да намерим елемента "{{element}}"',
    tips: [
      'Увери се, че си сложим "name" property на елемента',
      'Увери се, че елемента е добавен на сцената',
      'Увери се, че си commit-нал и push-нал промените си',
    ]
  },
  PIXI_STAGE_NOT_FOUND: {
    issue: 'Не успяваме да намерим PIXI сцената',
    tips: [
      'Увери се, че няма syntax error-и в конзолата',
      'Увери се, че си commit-нал и push-нал промените си',
    ]
  },
  PIXI_APP_NOT_FOUND: {
    issue: 'Не успяваме да намерим PIXI сцената',
    tips: [
      'Увери се, че няма syntax error-и в конзолата',
      'Увери се, че си commit-нал и push-нал промените си',
    ]
  },
  JS_APP_NOT_FOUNT: {
    issue: 'Не успяваме да намерим JS application-a',
    tips: [
      'Увери се, че няма syntax error-и в конзолата',
      'Увери се, че си commit-нал и push-нал промените си',
    ]
  },
  FILE_NOT_FOUND: {
    issue: 'Не успяваме да намерим файла {{file}} в {{dir}}.',
    tips: [
      'Увери се, че си направил fork-а правилно и прочети повече тук: https://app.booost.bg/courses/5/steps/31?trackId=2',
      'Увери се, че си създал правилния file описан в задачата ако е имало такъв',
    ]
  },
  FILE_NOT_JSON: {
    issue: 'Не успяваме да намерим файла или parse-нем JSON файла {{file}} в {{dir}}.',
    tips: [
      'Увери се, че си направил fork-а правилно и прочети повече тук: https://app.booost.bg/courses/5/steps/31?trackId=2',
      'Увери се, че си създал правилния file описан в задачата ако е имало такъв',
    ]
  }
};