import ContactListCtrl from './contactListCtrl'
import orgShowCaseCtrl from './orgShowCaseCtrl'
import ShowCtrl from './showCtrl'
import adminOrgTabs from './tabbedOrgModule'
import NoteListCtrl from "./noteListCtrl";

angular.module(adminOrgTabs)
  .controller("tabbedOrg.ContactListCtrl", ContactListCtrl)
  .controller("tabbedOrg.NoteListCtrl", NoteListCtrl)
  .controller("tabbedOrg.orgShowCaseCtrl", orgShowCaseCtrl)
  .controller("tabbedOrg.ShowCtrl", ShowCtrl);
export default adminOrgTabs
