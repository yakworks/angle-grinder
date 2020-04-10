/* @ngInject */
export default class OrgSelectOptions {
  constructor(Select2Options, pathWithContext) {
    return function() {
      return Select2Options({
        width: 190,
        ajax: {
          url: pathWithContext('/org/pickList')
        },

        // formatters for result and selection
        formatResult(org) { return org.name },
        formatSelection(org) { return org.name }
      })
    }
  }
}
