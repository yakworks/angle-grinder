import _ from 'lodash'

/* @ngInject */
export default class ListCtrl {
  constructor($scope, $log, Resource, $filter, DialogCrudCtrlMixin, ConfigCache, $state) {
    this.$filter = $filter
    $scope.gridOptions = ConfigCache.get('/api/user/gridOptions')
    DialogCrudCtrlMixin($scope, {
      Resource,
      gridName: 'usersGrid',
      template: require('../form/form.html'),
      beforeEdit(record) {
        // saves data from server to compare retrieved data and data that will be send to the server
        $scope.tzShowCase = _.cloneDeep(record)
        const user = _.cloneDeep(record)
        // convert `Contact.type` enum field to the string
        user.contact.type = record.contact.type != null ? record.contact.type.name : undefined
        return user
      }
    })
  }
}
