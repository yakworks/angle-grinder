/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const gridz = angular.module("angleGrinder.gridz");

gridz.factory("ActionPopupHandler", [
  "$log", $log => (function(gridEl, scope, attrs) {
  // handles an action from the `actionPopup` menu
  const handleAction = function(action, id) {
    if (scope[action]?) {
      $log.info(`Trigger '${action}' for row '${id}'`);
      return scope.$apply(() => scope[action](id));
    } else {
      return $log.warn(`\`$scope.${action}\` is not defined`);
    }
  };

  // handles click on show action inside the dropdown menu
  gridEl.on("showAction", function(event, id) {
    event.preventDefault();
    const action = attrs.showAction ? attrs.showAction : "showRecord";
    return handleAction(action, id);
  });

  // handles click on edit action inside the dropdown menu
  gridEl.on("editAction", function(event, id) {
    event.preventDefault();
    const action = attrs.editAction ? attrs.editAction : "editRecord";
    return handleAction(action, id);
  });

  // handles click on delete action inside the dropdown menu
  gridEl.on("deleteAction", function(event, id) {
    event.preventDefault();
    const action = attrs.deleteAction ? attrs.deleteAction : "deleteRecord";
    return handleAction(action, id);
  });

  // handles click on massUpdate action inside the dropdown menu
  gridEl.on("massUpdateAction", function(event) {
    event.preventDefault();
    const action = attrs.massUpdateAction ? attrs.massUpdateAction : "massUpdate";
    return handleAction(action);
  });

  // handles click on the cell with `editActionLink` formatter
  return gridEl.on("click", "a.editActionLink", function(event) {
    event.preventDefault();
    const id = $(this).parents("tr:first").attr("id");
    const action = attrs.editAction ? attrs.editAction : "editRecord";
    return handleAction(action, id);
  });
})
]);
