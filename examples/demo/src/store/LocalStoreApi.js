import SessionDatastore from '~/datastore/local/SessionDatastore'

// eslint-disable-next-line space-before-blocks
function makeDataApi(storageKey, sourceUrl){
  return SessionDatastore({ storageKey, sourceUrl })
}

const LocalStoreApi = {
  get customer(){ return makeDataApi('customers', 'data/Customers.json') },
  get batch(){ return makeDataApi('customers', 'data/Batch.json') },
  get invoice() { return makeDataApi('invoices', 'data/Invoices.json') },
  get tranState() { return makeDataApi('tranStates', 'data/TranStates.json') }
}

export default LocalStoreApi

