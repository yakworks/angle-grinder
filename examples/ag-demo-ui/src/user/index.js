import ListCtrl from './listCtrl'
import FormCtrl from './formCtrl'
import SearchForm from './searchFormCtrl'
import user from './userModule'

angular.module(user)
  .controller("user.FormCtrl", FormCtrl)
  .controller("user.ListCtrl", ListCtrl)
  .controller("user.SearchForm", SearchForm);


export default user
