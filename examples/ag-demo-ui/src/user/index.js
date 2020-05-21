import user from './userModule'
import orgSelectOptions from '../org/orgSelectOptions'
import './list'
import './form'
import './searchForm'

angular.module(user)
  .service('orgSelectOptions', orgSelectOptions)

export default user
