# TODO plurarize this one and contacts
class NoteListCtrl

  @$inject = ["$scope", "editDialog", "confirmationDialog", "resourceBuilder", "pathWithContext"]
  constructor: ($scope, editDialog, confirmationDialog, resourceBuilder, pathWithContext) ->
    # Create resource for users (contacts)
    Notes = resourceBuilder("/note")

    $scope.$org = null
    gridInitialized = false
    $scope.$on "initNotesGrid", (event, org) =>
      return if gridInitialized

      $scope.$org = org
      gridInitialized = true

      $scope.gridOptions =
        url: pathWithContext("/org/listNotes/#{org.id}.json")
        colModel: @colModel()
        multiselect: false # turn off multiselect
        shrinkToFit: true # makes columns fit to width
        autowidth: true
        sortname: "name"
        sortorder: "asc"

    # Displays a form for creating a new user
    $scope.createItem = ->
      note = new Notes(contact: org: $scope.$org)
      editDialog.open(pathWithContext("/note/formTemplate"), note)

    # Displays a form for editing an exiting user
    $scope.editItem = (id) ->
      Notes.get { id: id }, (note) ->
        editDialog.open(pathWithContext("/note/formTemplate"), note)

    $scope.deleteItem = (id) ->
      confirmationDialog.open().then (confirmed) ->
        return unless confirmed

        promise = Notes.delete(id: id).$promise
        promise.then (response) -> $scope.notesGrid.removeRow(response.id)

  colModel: ->
    [
      { name: "id", label: "ID", width: 30 }
      { name: "name", label: "Contact Name", width: 100, formatter: "editActionLink" }
      { name: "content", sortable: false, label: "Content", width: 300, formatter: "editActionLink" }
    ]

angular.module("angleGrinder")
  .controller("tabbedOrg.NoteListCtrl", NoteListCtrl)
