# TODO plurarize this one and contacts
class NoteListCtrl

  @$inject = ["$scope", "resourceBuilder", "editDialog", "pathWithContext", "dialogCrudCtrlMixin"]
  constructor: ($scope, resourceBuilder, editDialog, pathWithContext, dialogCrudCtrlMixin) ->
    # Create resource for users (contacts)
    Notes = resourceBuilder("/note")

    $scope.$org = null
    gridInitialized = false
    $scope.$on "initNotesGrid", (event, org) =>
      return if gridInitialized

      $scope.$org = org
      gridInitialized = true

      $scope.gridOptions =
        path: "/org/listNotes/#{org.id}.json"
        colModel: @colModel()
        multiselect: false # turn off multiselect
        shrinkToFit: true # makes columns fit to width
        autowidth: true
        sortname: "name"
        sortorder: "asc"

    dialogCrudCtrlMixin $scope,
      Resource: Notes
      gridName: "notesGrid"
      templateUrl: "/templates/note/form.html"

    # Displays a form for creating a new user
    # @override
    # TODO figure out how to assing default values before create
    $scope.createItem = ->
      note = new Notes(org: $scope.$org)
      editDialog.open(pathWithContext("/templates/note/form.html"), note, $scope.notesGrid)

  colModel: ->
    [
      { name: "id", label: "ID", width: 30 }
      { name: "name", label: "Name", width: 100, formatter: "editActionLink" }
      { name: "content", sortable: false, label: "Content", width: 300, formatter: "editActionLink" }
    ]

angular.module("angleGrinder")
  .controller("tabbedOrg.NoteListCtrl", NoteListCtrl)
