# Data Provider Pattern for jasmine specs
# see http://blog.jphpsf.com/2012/08/30/drying-up-your-javascript-jasmine-tests
window.using = (name, values, fn) ->
  for value in values
    if Object.prototype.toString.call(value) isnt '[object Array]'
      value = [value]

    fn.apply(this, value)
    jasmine.currentEnv_.currentSpec.description += ' (with "' + name + '" using ' + value.join(', ') + ')'

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
