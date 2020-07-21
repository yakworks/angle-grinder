const _ = require('lodash');

const generateApi = require('./generateApi')
const customerData = require('../public/data/Customers.json')
const epoint = 'customer'
let custApi = generateApi(epoint, customerData)
const dataApi = custApi.dataApi

// overrides to we can simmulate some errors
let overrides = {
  urls: {
    [`POST /api/${epoint}`]: (req, res) => {
      const { body } = req
      let simEr = simError(body)
      if(simEr) {
        res.status(422).json(simEr)
      } else {
        dataApi.post(body).then((data) => {
          // console.log("POST invoice data", data)
          return res.json(data)
        })
      }
    },
    [`PUT /api/${epoint}`]: (req, res) => {
      const { body } = req
      let simEr = simError(body)
      if(simEr) {
        res.status(422).json(simEr)
      } else {
        dataApi.put(body).then((data) => {
          // console.log("POST invoice data", data)
          return res.json(data)
        })
      }
    }
  }
}

module.exports = _.merge(custApi,overrides)

function simError(data) {
  let errors = {}
  if(data.street ===  '911') errors.street = 'street cant be 911'
  if(data.nested && data.nested.foo ===  '911') errors.nested = { foo: 'foo 911'}

  return Object.keys(errors).length ? {errors} : false
}
