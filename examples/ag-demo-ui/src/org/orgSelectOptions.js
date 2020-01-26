
export default class OrgSelectOptions {
  constructor(select2Options, pathWithContext){
    return function () {
      return select2Options({
        width: 190,
        ajax: {
          url: pathWithContext("/org/pickList")
        },

// formatters for result and selection
        formatResult(org) {  return org.name; },
        formatSelection(org) { return org.name; }
      })

    }
  }
}
