import { kyFetch } from '../ky'
import mix from '../../utils/mix-it-with';
import { restGet, restQuery } from './restFeatures';
import {Datastore} from '../datastore'

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
    Datastore,
    restGet({ api }),
    restQuery({ api })
  )
}

export default RestDatastore
