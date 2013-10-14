# Compile the template
# @param {String} template The string to compile
# @return {Object} A reference to the compiled template and the scope
window.compileTemplate = (template, $injector, $scope = null) ->
  # Create a new scope if necassary
  $scope or= (->
    $rootScope = $injector.get("$rootScope")
    $rootScope.$new()
  )()

  # Compile and link an element with the given scope
  $compile = $injector.get("$compile")
  element = angular.element(template)
  $scope.$apply -> $compile(element)($scope)

  element: element, $scope: $scope
