import { findIndexById } from '../utils/finders'
import { CommonStores } from './crudQueryStores';
import { _defaults } from '../utils/dash';
/** @typedef {import('svelte/store').Writable<{}>} Writable */

/**
 * Base Datastore model feature, this operates as a sort of interface contract.
 * to be used in composing
 */
export const crudQueryModel = (obj) => {

  const {initData = [], ident = 'id'} = obj

  const stores = CommonStores()
  if(initData) stores.setDataCache(initData)


  let ds = {
    stores,
    ident,

    /**
     * Create if no id prop or Update if it has id prop
     * Returns a promise to save the item.
     * It delegates to update() or create() if the object has or does not have an identifier set
     */
    async save(item){
      return item[ident] ? ds.update(item) : ds.create(item)
    },

    async create(item){ },

    /** Returns a promise to save (PUT) an existing item. */
    async update(item){ },

    /**
    * Returns a promise to remove (DELETE) an item.
    */
    async remove(id){ },

    /**
     * Bulk updates items
     */
    async bulkUpdate({ids, data}){ },

    async search(params){},

    /**
     * Fuzzy text search.
     * @param {string} searchKey
     * @returns the filtered items
     */
    async qSearch(text){ },

    async picklist(params){ },

    /**
     * Returns a promise for the item with the given identifier
     */
    async get(id){ },

    findById(list, id){
      const idx = ds.findIndexById(list, id)
      return idx === -1 ? false : list[idx]
    },

    findIndexById(list, id){
      return findIndexById({ list, id , ident })
    }
  }

  return _defaults(obj, ds)
}

// export default datastoreStores
