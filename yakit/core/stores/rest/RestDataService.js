import { kyFetch } from '../ky'
import mix from '../../mix/mix-it-with';
import { restPicklist } from './restPicklist';
import { restQuery } from './restQuery';
import { restSave } from './restSave';
import { crudQueryModel } from '../crudQueryModel'

/**
 * A common wrapper around RESTful resource
 */
export const RestDataService = ({ key, ...args }) => {
  let api = kyFetch(key)

  let ds = {
    ...args,
    api,
    key
  }

  return mix(ds).it(RestDataService).with(
    restSave({ api }),
    restQuery({ api }),
    restPicklist({ api }),
    crudQueryModel
  )
}

export default RestDataService
