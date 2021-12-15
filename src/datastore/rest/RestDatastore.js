import { kyFetch } from '../ky'
import mix from '../../utils/mix-it-with';
import { restPicklist } from './restPicklist';
import { restQuery } from './restQuery';
import { restSave } from './restSave';
import { crudQueryModel } from '../crudQueryModel'

/**
 * A common wrapper around RESTful resource
 */
export const RestDatastore = ({ endpoint, ...opts }) => {
  let api = kyFetch(endpoint)

  let ds = {
    ...opts,
    api
  }

  return mix(ds).it(RestDatastore).with(
    restSave({ api }),
    restQuery({ api }),
    restPicklist({ api }),
    crudQueryModel
  )
}

export default RestDatastore
