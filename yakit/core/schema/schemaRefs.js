
/**
 * Holder 'statics' for $
 */

 import { get, isEmpty } from '../dash'

const schemaRefs = {
  refs:{},

  get(key){
    return get(schemaRefs.refs, key)
  },

  isEmpty(){
    return isEmpty(schemaRefs.refs)
  }
}

export default schemaRefs
