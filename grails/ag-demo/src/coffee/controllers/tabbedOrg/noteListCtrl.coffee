# TODO plurarize this one and contacts
class NoteListCtrl

  @$inject = ["$scope", "resourceBuilder", "dialogCrudCtrlMixin"]
  constructor: ($scope, resourceBuilder, dialogCrudCtrlMixin) ->
    # Create resource for users (contacts)
    Notes = resourceBuilder("/note")

    $scope.gridOptions =
      path: "/org/listNotes/#{$scope.org.id}.json"
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
      beforeCreate: (note) ->
        # assign parent org to the note
        note.org = $scope.$org
        note

  colModel: ->
    [
      { name: "id", label: "ID", width: 30 }
      { name: "name", label: "Name", width: 100, formatter: "editActionLink" }
      { name: "content", sortable: false, label: "Content", width: 300, formatter: "editActionLink" }
    ]

angular.module("angleGrinder")
  .controller("tabbedOrg.NoteListCtrl", NoteListCtrl)
