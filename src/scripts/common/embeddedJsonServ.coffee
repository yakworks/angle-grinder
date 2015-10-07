app = angular.module("angleGrinder.common")

#Makes it possible to reference embedded json from html into angular controllers
app.factory "embeddedJsonServe", ['$document', ($document) ->
  (name) ->
    selector = "script[type='application/embedded-json'][name='"+ name + "']"
    node = $(selector)
    val = undefined
    if(node.length > 0)
      val = angular.fromJson(node[0].innerHTML)

    val

]
