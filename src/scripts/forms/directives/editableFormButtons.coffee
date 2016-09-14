app = angular.module("angleGrinder.forms")

app.directive "editableFormButtons", [
  "$parse", ($parse) ->
    restrict: "A"
    scope: {
      form: '=editableFormButtons'
      cancelCallBack: '&oncancel'
    }

    link: (scope, element, attrs) ->
      scope.cancel = () ->
        scope.form.$cancel()
        if scope.cancelCallBack?
          scope.cancelCallBack()

    template: """
      <div class="buttons">
        <!--
        <button type="button" class="btn btn-default"
                ng-click="form.$show()"
                ng-if="!form.$visible">
          Edit
        </button>
        -->
        <span ng-if="form.$visible">
          <button type="submit" class="btn btn-default btn-primary" ng-disabled="form.$invalid || form.$waiting"> Save </button>
          <button type="button" class="btn btn-default" ng-disabled="form.$waiting" ng-click="cancel()"> Cancel </button>
        </span>
      </div>
    """
]
