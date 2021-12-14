import prune from '../../utils/prune';
import {isObject} from '../../utils/inspect';
import { _defaults } from '../../utils/dash';
import { get, writable } from 'svelte/store';
import stringify from '../../utils/stringify';

export const restGet = ({ api }) => ds => {
  //defaults ensures it only gets merged if its not already overriden
  return _defaults(ds, {
    async get(id) {
      const item = await api.getById(id)
      ds.stores.item.set(item)
      return item
    }
  })

}

export const restQuery = ({ api }) => ds => {

  /**
   * when grid is for child or detail data, restrictSearch is what to filter it by,
   * for example is showing invoices for customer then restrictSearch might be set to {custId:123}
   */
  let { restrictSearch } = ds


  let ext = {

    /**
     * adds searchParams, which are the query params ( the part after the ? )
     * and then calls the get. if the params has a q property and its a string then
     * @param {*} params
     */
    async search(params) {
      let searchParams = ds.setupSearchParams(params)
      console.log("searchParams", searchParams)
      const page = await api.get({ searchParams })
      console.log("page", page)
      ds.stores.setPage(page)
      return page
    },

    // prunes params and stringifies the q param if exists
    setupSearchParams(params){
      let pruned = prune(params)
      let { q, sort } = pruned
      if(restrictSearch) q = {...q, ...restrictSearch}
      //save it before we stringify
      ds.stores.setQuery({...pruned, q, sort})

      if(q) pruned.q = stringify(q)
      //stringify sort and remove the quotes and brackets
      if(sort) pruned.sort = stringify(sort).replace(/{|}|"/g, '')
      return pruned
    }
  }

  return _defaults(ds, ext)
}
