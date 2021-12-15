/* eslint-disable no-unused-vars */
import _ from 'lodash'

export default class DataQuery {
  //the api endpoint key
  dataApi = ""

  // the q map or text
  q

  //qSearch if both using the map criteria in q and a text fuzzy search
  qSearch

  //initSearch is the initialSearch criteria
  initSearch

  // when grid is for child or detail data, restrictSearch is what to filter it by,
  // for example is showing invoices for customer then restrictSearch might be set to {custId:123}
  restrictSearch

  //sort map
  sort

  //page info
  max = '20'

  page = '1'
}
