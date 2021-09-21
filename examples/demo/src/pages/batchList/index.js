import listComp from './list'
import editComp from './edit'
/*import paymentGrid from '~/autocash/paymentList'
import paymentDetailGrid from '~/autocash/paymentDetailList'
import pdArTranGrid from '~/autocash/pdArTranList'*/

export default angular
  .module('rcm.arBatchGrid', [])
  .component('batchList', listComp)
  .component('batchEdit', editComp)
  .name
