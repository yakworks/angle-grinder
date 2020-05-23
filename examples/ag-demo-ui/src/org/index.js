import orgform from './form'
import orgList from './list'
import search from'./searchForm'
import ShowCtrl from './show/showCtrl'
import MassUpdateFormCtrl from './massUpdate/MassUpdateFormCtrl'
import module from './module'
import OrgSelectOptions from './orgSelectOptions'

angular.module(module)
  .controller('org.ShowCtrl', ShowCtrl)
  .controller('org.MassUpdateFormCtrl', MassUpdateFormCtrl)
  .service('orgSelectOptions', OrgSelectOptions)

export default module
