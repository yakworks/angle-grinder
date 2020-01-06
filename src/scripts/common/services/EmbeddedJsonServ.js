/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common")

//Makes it possible to reference embedded json from html into angular controllers
app.factory("EmbeddedJsonServ", ['$document', $document => (function(name) {
  const selector = "script[type='application/embedded-json'][name='"+ name + "']"
  const node = $(selector)
  let val = undefined
  if(node.length > 0) {
    val = angular.fromJson(node[0].innerHTML.replace(/&quot;/g, "\""))
  }

  return val
})

])
