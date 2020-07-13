const delay = require('mocker-api/utils/delay')
const _ = require('lodash');
const generateApi = require('./generateApi')

const noProxy = process.env.NO_PROXY === 'true'

const invoiceData = require('../public/data/Invoices.json')
const tranStateData = require('../public/data/TranStates.json')
const customerData = require('../public/data/Customers.json')

const proxy = {
  ...generateApi("invoice", invoiceData),
  ...generateApi("tranState", tranStateData),
  ...generateApi("customer", customerData),

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
module.exports = (noProxy ? {} : delay(proxy, 0))
// module.exports = proxy;
