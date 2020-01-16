/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// TODO plurarize this one and contacts
class NoteListCtrl {
  static initClass() {
  
    this.$inject = ["$scope", "resourceBuilder", "DialogCrudCtrlMixin"];
  }
  constructor($scope, resourceBuilder, DialogCrudCtrlMixin) {
    // Create resource for users (contacts)
    const Notes = resourceBuilder("/note");

    $scope.gridOptions = {
      path: `/org/listNotes/${$scope.org.id}?format=json`,
      colModel: this.colModel(),
      multiselect: false, // turn off multiselect
      shrinkToFit: true, // makes columns fit to width
      autowidth: true,
      sortname: "name",
      sortorder: "asc"
    };

    DialogCrudCtrlMixin($scope, {
      Resource: Notes,
      gridName: "notesGrid",
      templateUrl: "/templates/note/form.html",
      beforeCreate(note) {
        // assign parent org to the note
        note.org = $scope.$org;
        return note;
      }
    }
    );
  }

  colModel() {
    return [
      { name: "id", label: "ID", width: 30 },
      { name: "name", label: "Name", width: 100, formatter: "editActionLink" },
      { name: "content", sortable: false, label: "Content", width: 300, formatter: "editActionLink" }
    ];
  }
}
NoteListCtrl.initClass();

angular.module("angleGrinder")
  .controller("tabbedOrg.NoteListCtrl", NoteListCtrl);
