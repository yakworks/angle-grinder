import ky from 'ky'
import globalLoader from '../tools/globalLoader'


// we wrap it like this so we can import the same instance
// and when setClientConfig it will set it up and then every where its used
// can ref it with kyApi.client and it will get the same reference
const kyApi = {
  client:{}
}

const defaultKy = ky.extend({
  hooks: {
    beforeRequest: [
      request => {
        globalLoader.start()
      }
    ],
    afterResponse: [
			(_request, _options, response) => {
       globalLoader.complete()
      }]
  }
})

export const setClientConfig = (config) => {
  kyApi.client = defaultKy.extend(config)
}

export default kyApi
