/* @ngInject */
export default class NoteListCtrl {
  constructor($scope, resourceBuilder, DialogCrudCtrlMixin, $stateParams) {
    // Create resource for users (contacts)
    const Notes = resourceBuilder('/note')
    $scope.gridOptions = {
      path: `/api/org/listNotes/${$stateParams.id}?format=json`,
      colModel: this.colModel(),
      multiselect: false, // turn off multiselect
      shrinkToFit: true, // makes columns fit to width
      autowidth: true,
      sortname: 'name',
      sortorder: 'asc'
    }

    DialogCrudCtrlMixin($scope, {
      Resource: Notes,
      gridName: 'notesGrid',
      templateUrl: '/templates/note/form.html',
      beforeCreate(note) {
        // assign parent org to the note
        note.org = { id: $stateParams.id }
        return note
      }
    }
    )
  }

  colModel() {
    return [
      { name: 'id', label: 'ID', width: 30 },
      { name: 'name', label: 'Name', width: 100, formatter: 'editActionLink' },
      { name: 'content', sortable: false, label: 'Content', width: 300, formatter: 'editActionLink' }
    ]
  }
}
