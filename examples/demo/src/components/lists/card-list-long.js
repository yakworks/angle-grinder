// simple text component

class controller {
  custs = [
    { name: 'Walmart', adp: 32 },
    { name: 'Costco', adp: 35 },
    { name: 'Binnys', adp: 37 },
    { name: 'Space X', adp: 38 },
    { name: "Joe's Crab", adp: 40 },
    { name: 'Zerohedge', adp: 41 },
    { name: 'Wild Flower', adp: 41 },
    { name: 'Swig', adp: 42 },
    { name: 'El Rancho', adp: 45 },
    { name: 'Acme Corp', adp: 50 }
  ]
}

const template = `
<div class="tile is-child card">
  <header class="card-header">
    <p class="card-header-title">Top 10</p>
    <button class="card-header-icon">
      <span class="icon"><i class="mdi mdi-dots-vertical"></i></span>
    </button>
  </header>
  <div class="card-content p-0">
    <section class="listify">
      <div class="list-item-set">
        <div class="list-item" ng-repeat="item in vm.custs">
          <div class="item-avatar">
            <letter-icon data="{{item.name}}" char-count="2" color="auto" box="circle" size="sm"></letter-icon>
          </div>
          <div class="item-content">
            <span class="item-title"> {{item.name}} </span>
          </div>
          <div class="item-action">
            <span class="tag is-primary is-light">{{item.adp}}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
`
export default () => ({
  replace: true,
  scope: {},
  controllerAs: 'vm',
  template: template,
  controller: controller
})
