//import SidebarCtrl from './sidebarCtrl'
import Fup from './fileUpload/FileUploadCtrl'
import GridList from './gridExample/listCtrl'
import PanelIndexCtrl from './panels/indexCtrl'
import TabIndexCtrl from './tabs/indexCtrl'
import * as userCtrls from './users/*'

import userListCtrl from './users/listCtrl'
import userFormCtrl from './users/formCtrl'
import userEditableFormCtrl from './users/editableFormCtrl'
import userMassUpdateFormCtrl from './users/massUpdateFormCtrl'
import userShowCtrl from './users/showCtrl'

import UserDialogListCtrl from './usersDialog/listCtrl'
import UserDialogSearchCtrl from './usersDialog/searchFormCtrl'
import XeditCtrl from './xeditable/indexCtrl'

Fup.initClass()
GridList.initClass()
PanelIndexCtrl.initClass()
TabIndexCtrl.initClass()
UserDialogListCtrl.initClass()
UserDialogSearchCtrl.initClass()
XeditCtrl.initClass()

userListCtrl.initClass()
userFormCtrl.initClass()
userEditableFormCtrl.initClass()
userMassUpdateFormCtrl.initClass()
userShowCtrl.initClass()
