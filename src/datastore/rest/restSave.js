import mix from '../../utils/mix-it-with';

export const restSave = ({ api }) => ds => {

  const { ident } = ds

  return mix(ds).with({

    async create(item) {
      const newItem = await api.post({ json: item })
      return newItem
    },

    async update(item) {
      const id = item[ident]
      const newItem = await api.put({ op: id, json: item })
      return newItem
    },

    /** Returns a promise to remove (DELETE) an item. */
    async remove(id) {
      await api.delete({ op: id })
      return true
    },

    async bulkUpdate(muItem) {
      const results = await api.post({op: 'bulkUpdate', json: muItem })
      return results
    }

  })

}
