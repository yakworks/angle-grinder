// simple text component

class controller {
  message = "Dream of the mind's eye circumnavigated as a patch of light Orion's sword star stuff harvesting star light Euclid."
}

const template = `
<article class="tile is-child card">
  <div class="card-content">
    {{ vm.message }}
  </div>
</article>
`
export default () => ({
  // restrict: 'E',
  replace: true,
  controllerAs: 'vm',
  scope: {},
  // bindToController: true,
  // transclude: true,
  template: template,
  controller: controller
})
