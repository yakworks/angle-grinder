// simple text component

class controller {
  items = [
    { title: 'Single Line' },
    { title: 'Two-line item', subtitle: 'Secondary text' },
    { title: 'Three-line item', subtitle: "If you don't know, the thing to do ", subtitle2: 'is not to get scared, but to learn.' }
  ]
}

const template = `
<div class="card">
  <div class="card-title"> {{vm.title}} </div>
  <hr>
  <div class="card-content p-0">
    <section class="listify {{vm.listClass}}"">
      <ul class="list-item-set">
        <li class="list-item" ng-repeat="item in vm.items">
          <div class="item-content">
            <div class="item-title"> {{item.title}} </div>
            <div class="item-subtitle"> {{item.subtitle}} </div>
            <div class="item-subtitle"> {{item.subtitle2}} </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</div>
`
export default () => ({
  replace: true,
  bindToController: true,
  scope: {
    listClass: '@',
    title: '@'
  },
  controllerAs: 'vm',
  template: template,
  controller: controller
})
