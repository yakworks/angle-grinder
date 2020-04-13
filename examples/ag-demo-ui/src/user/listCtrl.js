/* @ngInject */
export default class ListCtrl {
  constructor($scope, $log, Resource, $filter, DialogCrudCtrlMixin, ConfigCache, $http) {
    this.$filter = $filter
    $scope.gridOptions = ConfigCache.get('/api/user/gridOptions')

    DialogCrudCtrlMixin($scope, {
      Resource,
      gridName: 'usersGrid',
      template: require('../../public/templates/user/form.html'),
      beforeEdit(record) {
        // saves data from server to compare retrieved data and data that will be send to the server
        $scope.tzShowCase = angular.copy(record)
        const user = angular.copy(record)
        // convert `Contact.type` enum field to the string
        user.contact.type = record.contact.type != null ? record.contact.type.name : undefined
        return user
      }
    })
  }
}
