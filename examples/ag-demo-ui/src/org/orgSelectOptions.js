/* @ngInject */
export default class OrgSelectOptions {
  constructor(Select2Options, pathWithContext) {
    return function() {
      return Select2Options({
        width: 'resolve',
        ajax: {
          url: pathWithContext('/api/org/pickList')
        },

        // formatters for result and selection
        formatResult(org) { return org.name },
        formatSelection(org) { return org.name }
      })
    }
  }
}
