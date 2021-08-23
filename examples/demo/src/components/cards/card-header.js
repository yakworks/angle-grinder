// simple text component

class controller {
}

const template = `
<div class="card {{vm.cardClass}}">
  <header class="card-header">
      <p class="card-header-title">{{vm.title}}</p>
      <ag-button button-class="card-header-icon" icon="mdi mdi-pencil-outline"></ag-button>
  </header>
  <div class="card-content">
    Lorem ipsum dolor sit amet, consectetur
    adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut,
    porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum
    <a>felis venenatis</a> efficitur.
  </div>
</div>
`
export default () => ({
  replace: true,
  bindToController: true,
  scope: {
    cardClass: '@',
    title: '@'
  },
  controllerAs: 'vm',
  template: template,
  controller: controller
})
