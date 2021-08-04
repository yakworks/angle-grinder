const _ = require('lodash')
const MemDataApi = require('../../../src/dataApi/MemDataApi')
const REST_DELAY = 100

function generateApi(epoint, data) {
  const store = new MemDataApi(data, REST_DELAY)
  return makeUrls(epoint, store)
}

function makeUrls(epoint, api) {
  return {
    dataApi: api,
    urls: {
      [`GET /api/${epoint}/picklist`]: (req, res) => {
        // console.log("get picklist req.query  ", req.query)
        const { query } = req
        api.picklist(query)
          .then((data) => {
            if (!_.isEmpty(query)) {
              const queriedData = data.data.filter(d => d.country === query.country)
              return res.json({ ...queriedData, data: queriedData })
            }
            // console.log("get picklist data", data)
            return res.json(data)
          })
      },

      [`GET /api/${epoint}/:id`]: (req, res) => {
        // console.log("get invoice id params", req.params)
        api.get(req.params.id)
          .then((data) => {
            return res.json(data)
          })
      },

      [`GET /api/${epoint}`]: (req, res) => {
        // console.log("get invoice req.query  ", req.query)
        const { query } = req
        // console.log("search query ", query)
        api.search(query).then((data) => {
          // console.log("get invoice data", data)
          return res.json(data)
        })
      },

      [`POST /api/${epoint}/countTotals`]: (req, res) => {
        // console.log("get invoice req.query  ", req.query)
        // const { query } = req
        // console.log("search query ", query)
        api.countTotals('amount').then(data => { return res.json(data) })
      },

      [`POST /api/${epoint}`]: (req, res) => {
        // console.log('PUT /api/invoice req.body', req.body)
        const { body } = req
        api.post(body)
          .then((data) => {
          // console.log("POST invoice data", data)
            return res.json(data)
          })
      },

      [`PUT /api/${epoint}/:id`]: (req, res) => {
        // console.log('PUT /api/invoice req.body', req.body)
        const { body } = req
        api.put(body)
          .then((data) => {
          // console.log("PUT invoice data", data)
            return res.json(data)
          })
      },

      [`POST /api/${epoint}/bulkUpdate`]: (req, res) => {
        // console.log('PUT /api/invoice req.body', req.body)
        const { body } = req
        api.bulkUpdate(body)
          .then((data) => {
          // console.log("PUT invoice data", data)
            return res.json(data)
          })
      },

      [`POST /api/${epoint}/ptp`]: (req, res) => {
        // console.log('PUT /api/invoice req.body', req.body)
        // const { body } = req

        const results = {
          ok: Math.floor((Math.random() * 10) + 1) > 5,
          failed: ['First row failed', 'Third row failed'],
          success: ['First row finished successfully', 'Third row finished successfully'],
          defaultMessage: 'PTP action'
        }
        return res.json(results)
      },

      [`DELETE /api/${epoint}/:id`]: (req, res) => {
        // console.log("get invoice id params", req.params)
        api.remove(req.params.id)
          .then(() => {
            return res.status(204).end()
          })
      }
    }
  }
}

exports.generateApi = generateApi
exports.makeUrls = makeUrls
