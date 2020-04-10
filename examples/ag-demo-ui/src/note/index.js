import module from './noteModule'
import NoteListCtrl from './noteListCtrl'

angular.module(module)
  .controller('demo.NoteListCtrl', NoteListCtrl)
export default module
