import kyApi from '../dataApi/kyApi'
import prune from '../utils/prune';
import {isObject} from '../utils/inspect';

/**
 * A common wrapper around RESTful resource
 */
export const ListDatastore = ({
  endpoint
}) => {

  //the full data cache, optional use?
  let dataCache = []
  //the filtered data, unpaginated, after a search
  let viewData = []
  //the current paged view of the data {data:[...], page: , records: , total: }
  let pager

  let props = {endpoint, kyApi}

  let methods = {

    // getter makes sure it always pull the configured kyApi.ky
    get api(){
      return kyApi.ky
    },

    /**
     * calls ky with opts and method
     */
    ky(resource, {method = 'get', ...opts}){
      return this.api(`${this.endpoint}${resource}`, {...opts, method}).json()
    },

    async getData(){
      //if dataCache is empty then fill it.
      return dataCache
    },

    async getViewData(){
      return viewData
    },

    getPagerData(){
      return pagerData
    },

    // updates the dataView and the pager
    updateViewData(filteredData) {
      viewData = filteredData
    },

    // updates the dataView and the pager
    updatePager(pagedData) {
      pager = pagedData
    },

    // saves the current q query so when we move to next page or sort it can re use it
    updateQ(pagedData) {
      pager = pagedData
    },

    /**
     * adds searchParams, which are the query params ( the part after the ? )
     * and then calls the get. if the params has a q property and its a string then
     * @param {*} params
     */
    async search(params) {
      let cleanParams = this.setupQ(params)
      const opts = { searchParams: cleanParams }
      const data = await this.ky('', opts)
      this.updatePager(data)
      return data
    },

    // prunes params and stringifies the q param if exists
    setupQ(params){
      let pruned = prune(params)
      let { q, sort } = pruned
      if(isObject(q)) pruned.q = JSON.stringify(q)
      //stringify sort and remove the quotes and brackets
      if(isObject(sort)) pruned.sort = JSON.stringify(sort).replace(/{|}|"/g, '')
      return pruned
    },

    /**
     * paginates the current viewData, assigns the pager to page
     */
    async paginate({ page = 1, max = 20}) {
      let data = await this.getViewData()
      pagerData = {
        data: data.slice((page - 1) * max, page * max),
        page: page,
        records: data.length,
        total: Math.floor(data.length / max) + (data.length % max === 0 ? 0 : 1)
      }
      return pagerData
    },

    async countTotals(params) {
      const results = await this.api.post(`${this.endpoint}/countTotals`, { json: params }).json()
      return results
    }
  }

  return {
    ...props,
    ...methods,
  }
}

export default ListDatastore
