import angular from 'angular'
import commonModule from '../commonModule'

// Makes it possible to reference embedded json from html into angular controllers
angular.module(commonModule).factory('EmbeddedJsonServ', ['$document', function($document) {
  return function(name) {
    const selector = "script[type='application/embedded-json'][name='" + name + "']"
    const node = $(selector)
    let val
    if (node.length > 0) {
      val = angular.fromJson(node[0].innerHTML.replace(/&quot;/g, '"'))
    }

    return val
  }
}

])
