// turn off formly's api-check before its loaded. should never be on in production
const apiCheck = require('api-check')
apiCheck.globalConfig.disabled = true

import formsModule from './formsModule'
import './formlyTypes'
import './directives/agBind'
import './directives/agDeleteButton'
import './directives/agMaxLines'
import './directives/agNumber'
import './directives/agPanels'
import './directives/agSelectBind'
import './directives/agSubmit'
import './directives/agSubmitButton'
import './directives/agTabs'
import './directives/autofillPrevent'
import './directives/buttons'
import './directives/datepicker'
import './directives/editableCustom'
import './directives/editableDatepicker'
import './directives/editableDirectiveFactory'
import './directives/editableFormButtons'

import './directives/editablePanelHeading'
import './directives/editableSelect2'
import './directives/focus'
import './directives/validations'

import './services/DialogCrudCtrlMixin'
import './services/FormDialogServ'
import './services/MassUpdateHandler'
import './services/MassUpdateMixin'
import './services/PanelFormMixin'
import './services/SinglePageCrudMixin'

export default formsModule
