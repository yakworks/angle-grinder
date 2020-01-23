import ListCtrl from './listCtrl'
import FormCtrl from './formCtrl'
import ShowCtrl from './showCtrl'
import MassUpdateFormCtrl from './MassUpdateFormCtrl'
import adminOrg from './adminOrgModule'
import NoteListCtrl from "./noteListCtrl";

angular.module("admin.org")
  .controller("org.FormCtrl", FormCtrl)
  .controller("org.ListCtrl", ListCtrl)
  .controller("org.ShowCtrl", ShowCtrl)
  .controller("org.MassUpdateFormCtrl", MassUpdateFormCtrl)

angular.module("angleGrinder")
  .controller("tabbedOrg.ContactListCtrl", ContactListCtrl);

angular.module("angleGrinder")
  .controller("tabbedOrg.NoteListCtrl", NoteListCtrl);


angular.module("angleGrinder")
  .controller("tabbedOrg.orgShowCaseCtrl", orgShowCaseCtrl);


angular.module("angleGrinder")
  .controller("tabbedOrg.ShowCtrl", ShowCtrl);
export default adminOrg
