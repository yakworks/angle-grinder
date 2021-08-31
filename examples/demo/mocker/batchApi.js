const _ = require('lodash')

const makeUrls = require('./generateApi').makeUrls
const MemDataApi = require('../../../src/dataApi/MemDataApi')
const batchData = require('../public/data/Batch.json')
const epoint = 'batch'
const dataApi = new MemDataApi(batchData)
dataApi.picklistFields = ['id']

const api = makeUrls(epoint, dataApi)

// overrides to we can simmulate some errors
const overrides = {
/*  urls: {
  }*/
}

module.exports = _.merge(api, overrides)
