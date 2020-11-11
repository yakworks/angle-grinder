const _ = require('lodash');

const makeUrls = require('./generateApi').makeUrls
const MemDataApi = require('../../../src/dataApi/MemDataApi');
const customerData = require('../public/data/Customers.json')
const epoint = 'customer'
const dataApi = new MemDataApi(customerData)
dataApi.picklistFields = ['id', 'num', 'name', 'country']

let custApi = makeUrls(epoint, dataApi)

// const epoint = 'customer'
// const generateApi = require('./generateApi').generateApi
// let custApi = generateApi(epoint, customerData)

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
  let errors
  if(data.street ===  '911') errors = [{message: 'street cant be 911', field: 'street'}]
  if(data.nested && data.nested.foo ===  '911') errors = [{ field: 'nested.foo', message: 'foo 911'}]

  return Object.keys(errors).length ? {errors} : false
}
