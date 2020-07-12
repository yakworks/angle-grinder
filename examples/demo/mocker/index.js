//import {invoices, countriesWithId} from '../src/data/selects'
const data = require('../src/data/selects')
const invoices = require('../src/data/invoices')
const delay = require('mocker-api/utils/delay')
const _ = require('lodash');
const MemStoreApi = require('../src/store/MemStoreApi');

const noProxy = process.env.NO_PROXY === 'true'

const REST_DELAY = 500
const countriesWithId = data.countriesWithId()

const invoiceData = require('../public/data/invoices.json')
const invoiceStore = new MemStoreApi(invoiceData, REST_DELAY)


const proxy = {
  'GET /api/invoice/:id': (req, res) => {
    console.log("get invoice id params", req.params)
    invoiceStore.get(req.params.id)
    .then((data) => {
      return res.json(data)
    })
  },

  'GET /api/invoice': (req, res) => {
    console.log("get invoice req.query  ", req.query)
    const { query } = req
    invoiceStore.search(query)
    .then((data) => {
      // console.log("get invoice data", data)
      return res.json(data)
    })
  },

  'POST /api/invoice': (req, res) => {
    // console.log('PUT /api/invoice req.body', req.body)
    const { body } = req
    invoiceStore.post(body)
    .then((data) => {
      // console.log("POST invoice data", data)
      return res.json(data)
    })
  },

  'PUT /api/invoice': (req, res) => {
    // console.log('PUT /api/invoice req.body', req.body)
    const { body } = req
    invoiceStore.put(body)
    .then((data) => {
      // console.log("PUT invoice data", data)
      return res.json(data)
    })
  },

  'DELETE /api/invoice/:id': (req, res) => {
    console.log("get invoice id params", req.params)
    invoiceStore.remove(req.params.id)
    .then(() => {
      return res.status(204).end()
    })
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
  }
}
module.exports = (noProxy ? {} : delay(proxy, 0))
// module.exports = proxy;
