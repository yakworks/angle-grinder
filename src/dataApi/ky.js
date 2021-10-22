import ky from 'ky'
import globalLoader from '../tools/globalLoader'

// TODO set defaults

let client = ky.extend({
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

const setClientConfig = (config) => {
  client = client.extend(config)
}

export { client, setClientConfig }
