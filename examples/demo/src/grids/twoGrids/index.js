import customerList from './customerList'
import invoiceList from './invoistList'
import SelectedRows from "./SelectedRows";

const template = `
    <customer-list></customer-list>
  <invoice-list></invoice-list>

`
export default angular
  .module('ag.demo.twoGridsDemo', [])
  .service('selectedRow', SelectedRows)
  .component('invoiceList', invoiceList)
  .component('customerList', customerList)
  .component('twoGrids', {template})
  .name

