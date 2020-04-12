import ListCtrl from './listCtrl'
import FormCtrl from './formCtrl'
import SearchForm from './searchFormCtrl'
import user from './userModule'
import orgSelectOptions from "../org/orgSelectOptions";

angular.module(user)
  .controller('user.FormCtrl', FormCtrl)
  .controller('user.ListCtrl', ListCtrl)
  .controller('user.SearchForm', SearchForm)
  .service('orgSelectOptions', orgSelectOptions)

export default user
