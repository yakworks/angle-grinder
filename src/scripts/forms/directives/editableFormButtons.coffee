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
          <button type="button" class="btn" ng-disabled="form.$waiting" ng-click="cancel()"><i class="fa fa-times"></i> Cancel </button>
          <button type="submit" class="btn btn-default btn-primary" ng-disabled="form.$invalid || form.$waiting"><i class="fa fa-check fa-inverse"></i> Save </button>
        </span>
      </div>
    """
]
