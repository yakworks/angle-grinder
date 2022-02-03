import ky from 'ky'
import globalLoader from './globalLoader'


// we wrap it like this so we can import the same instance
// and when setClientConfig it will set it up and then every where its used
// can ref it with kyApi.ky and it will get the same reference

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

const kyApi = {
  ky: defaultKy
}

export const setClientConfig = (config) => {
  kyApi.ky = defaultKy.extend(config)
}

export default kyApi
