
class Controller {
}

export default () => ({
  restrict: 'E',
  replace: true,
  controllerAs: 'tagListCtrl',
  bindToController: true,
  template: '<span class="tags is-pulled-right"><span ng-repeat="item in tagListCtrl.items" class="tag">{{item}}</span></span>',
  controller: Controller,
  scope: {
    items: '<'
  }
})
