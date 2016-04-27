app = angular.module("angleGrinder.forms")

app.directive "editableFormButtons", [
  "$parse", ($parse) ->
    restrict: "A"
    scope: true

    link: (scope, element, attrs) ->
      scope.form = $parse(attrs.editableFormButtons)(scope)

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
          <button type="submit" class="btn btn-default btn-primary"
                  ng-disabled="form.$invalid || form.$waiting">
            Save
          </button>

          <button type="button" class="btn btn-default"
                  ng-disabled="form.$waiting"
                  ng-click="form.$cancel()">
            Cancel
          </button>
        </span>
      </div>
    """
]
