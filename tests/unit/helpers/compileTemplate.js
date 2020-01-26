
// Compile the template
// @param {String} template The string to compile
// @return {Object} A reference to the compiled template and the scope
export default function compileTemplate(template, $injector, $scope = null) {
  // Create a new scope if necessary
  if ($scope == null) { $scope = (function() {
    const $rootScope = $injector.get("$rootScope");
    return $rootScope.$new();
  })(); }

  // Compile and link an element with the given scope
  const $compile = $injector.get("$compile");
  const element = angular.element(template);
  $scope.$apply(() => $compile(element)($scope));

  return {element, $scope};
}
