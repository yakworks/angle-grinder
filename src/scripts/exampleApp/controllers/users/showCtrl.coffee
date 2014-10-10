app = angular.module "exampleApp"

app.directive "agCalendar", ["$compile", ($compile) ->
  restrict: "A"

  scope: true
  transclude: "element"
  replace: true

  link: (scope, element, attrs, controller, transclude) ->

    transclude scope, (clone) ->
      clone.attr("datepicker-popup", "MM/dd/yyyy")
      clone.attr("is-open", "opened")
      clone.removeAttr("ag-calendar")

      $compile(clone) scope, (clone) ->
        element.prepend(clone)

    scope.opened = false

    scope.open = ($event) ->
      $event.preventDefault()
      $event.stopPropagation()
      scope.opened = true

  template: """
    <div class="input-prepend">
      <button type="button" class="btn btn-default" ng-click="open($event)">
        <i class="icon-calendar"></i>
      </button>
    </div>
  """
]

# x-editable wrapper for calendar
app.directive "editableAgCalendar", [
  "editableDirectiveFactory", (editableDirectiveFactory) ->
    editableDirectiveFactory
      directiveName: "editableAgCalendar"
      inputTpl: """
        <input type="text" ng-change="change($data)" ag-calendar>
      """

      init: ->
        @parent.init()

        # workaround for ag-calendar new scope
        @scope.change = ($data) => @scope.$data = $data
]

class ShowCtrl extends BaseCtrl

  @register app, "users.ShowCtrl"
  @inject "$scope", "$location", "exampleGrid", "sampleData", "user"

  initialize: ->
    @expose @$scope, "user", "update", "delete"


    # generate the sample data
    sampleData = @sampleData.generate(100)

    # initialize the grid with generated data
    @$scope.gridOptions = @exampleGrid
      data: sampleData
      shrinkToFit: true
      multiselect: false
      actionPopup: false

    @user.notificationType ?= ""

    @$scope.notificationTypes = [
      { id: '', text: 'None' }
      { id: 'email', text: 'Email' }
      { id: 'fax', text: 'Fax' }
    ]

  update: (user) ->
    user.$update()

  delete: (user) ->
    promise = user.delete().$promise
    promise.then => @$location.path("/examples/users")
