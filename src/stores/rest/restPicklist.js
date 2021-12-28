import mix from '../../utils/mix-it-with';

/**
 *
 * @param {*} param0 pass in the api to use
 * @returns the function returned take the main object that will get merged into
 */
export const restPicklist = ({ api }) => obj => {

  return mix(obj).with({

    async picklist(params) {
      let cleanParams = obj.setupSearchParams(params)
      const o = { path: 'picklist', searchParams: cleanParams }
      const data = await api.get(o)
      return data
    }

  })

}
