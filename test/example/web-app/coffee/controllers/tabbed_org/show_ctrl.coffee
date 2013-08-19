class ShowCtrl

  # TODO create separate controller for contacts
  @$inject = ["$scope", "$location", "pathWithContext", "alerts", "org", "editDialog", "resourceBuilder"]
  constructor: ($scope, $location, pathWithContext, alerts, org, editDialog, resourceBuilder) ->
    $scope.org = org

    # Create resource for users (contacts)
    Users = resourceBuilder("/user")

    $scope.initGrid = =>
      $scope.gridOptions =
        url: pathWithContext("/org/listUsers/#{org.id}.json")
        colModel: [
          { name: "id", label: "ID", width: 30 }
          { name: "contact.name", label: "Contact Name", width: 100, formatter: "editActionLink" }
          { name: "contact.email", label: "Contact Email", width: 70, align: "right", formatter: "email" }
          { name: "login", label: "Login", width: 70 }
          { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
        ]
        multiselect: false # turn off multiselect
        shrinkToFit: true # makes columns fit to width
        autowidth: true
        sortname: "login"
        sortorder: "asc"

    $scope.save = (org) ->
      return if $scope.editForm.$invalid

      onSuccess = -> alerts.info("Org address has been updated.")

      onError = (response) ->
        if response.status is 422
          errors = response.data.errors
          $scope.serverValidationErrors = errors.org

      org.save success: onSuccess, error: onError

    # Displays a form for editing an exiting user
    $scope.editItem = (id) ->
      Users.get { id: id }, (user) ->
        editDialog.open(pathWithContext("/user/formTemplate"), user)

angular.module("angleGrinder")
  .controller("tabbedOrg.ShowCtrl", ShowCtrl)
