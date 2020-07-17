const delay = require('mocker-api/utils/delay')
const _ = require('lodash');
const yaml = require('js-yaml');
const fs = require('fs');
const generateApi = require('./generateApi')

const noProxy = process.env.NO_PROXY === 'true'

const invoiceData = require('../public/data/Invoices.json')
const tranStateData = require('../public/data/TranStates.json')
const customerData = require('../public/data/Customers.json')
//const invoiceConfigData = require('../public/data/InvoiceConfig.json')
//const custConfigYml = require('../public/data/CustomerConfig.yml')
//const custConfigData = yaml.load(fs.readFileSync('./examples/demo/public/data/CustomerConfig.yml', 'utf8'))

const proxy = {
  ...generateApi("invoice", invoiceData),
  ...generateApi("tranState", tranStateData),
  ...generateApi("customer", customerData),

  'GET /api/appConfig/invoice': (req, res) => {
    const invoiceConfigData = yaml.load(fs.readFileSync('./examples/demo/public/data/InvoiceConfig.yml', 'utf8'))
    return res.json(invoiceConfigData)
  },
  'GET /api/appConfig/customer': (req, res) => {
    const custConfigData = yaml.load(fs.readFileSync('./examples/demo/public/data/CustomerConfig.yml', 'utf8'))
    return res.json(custConfigData)
  },

  'GET /countries/pickList': (req, res) => {
    const q = req.query.q
    let rows = countriesWithId
    if(q) {
      rows = rows.filter(country =>  country.name.toLowerCase().indexOf(q.toLowerCase()) > -1)
    }
    return res.json({ page: 1, records: 3, rows: rows, total: 1 })
  },

  'GET /users': (req, res) => {
    const q = req.query.q
    let rows = data.people
    if(q) {
      rows = rows.filter(user =>  user.name.toLowerCase().indexOf(q.toLowerCase()) > -1)
    }

    return res.json({ page: 1, records: 3, rows: rows, total: 1 })
  },

  'POST /validation/mock': (req, res) => {
    if (req.body.name === 'bill') {
      return res.status(422).json({
          errors: {
            org: {
              name: 'no more bills in Org'
            },
            name: 'no more bills'
          }
      })
    }
    return res.json(req.body)
  }
}
module.exports = (noProxy ? {} : delay(proxy, 100))
// module.exports = proxy;
