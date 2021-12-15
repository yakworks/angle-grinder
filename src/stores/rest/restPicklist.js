import mix from '../../utils/mix-it-with';

export const restPicklist = ({ api }) => ds => {

  return mix(ds).with({

    async picklist(params) {
      let cleanParams = ds.setupSearchParams(params)
      const o = { op: 'picklist', searchParams: cleanParams }
      const data = await api.get(o)
      return data
    }

  })

}
