// simple text component

class controller {
  items = [
    { name: 'Health Potion', cost: 4, icon: 'fas fa-flask' },
    { name: 'Mana Potion', cost: 5, icon: 'mdi mdi-flask-outline' },
    { name: 'Iron Sword', cost: 12, icon: 'mdi mdi-sword' }
  ]
}

const template = `
<div class="tile is-child card">
  <div editable-card-heading="editForm">{{vm.title}}</div>
  <div class="card-content p-0">
    <section class="listify {{vm.listClass}}">
      <div class="list-item-set">
        <div class="list-item" ng-repeat="item in vm.items">
          <div class="item-icon">
            <span class="icon"><i class="{{item.icon}}"></i></span>
          </div>
          <div class="item-content">
            <span class="item-title"> {{item.name}} </span>
          </div>
          <!-- <div class="item-action">
             <span class="tag is-primary is-light">{{item.cost}}</span>
           </div> -->
          <div class="item-action">
            <ag-button button-class="" icon="mdi mdi-information">
            </ag-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
`
export default () => ({
  scope: {
    listClass: '@',
    title: '@'
  },
  replace: true,
  bindToController: true,
  controllerAs: 'vm',
  template: template,
  controller: controller
})
