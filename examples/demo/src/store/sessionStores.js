import SessionDatastore from 'angle-grinder/src/datastore/local/SessionDatastore'

// eslint-disable-next-line space-before-blocks
function makeDatastore(storageKey, sourceUrl){
  return SessionDatastore({ storageKey, sourceUrl })
}

const sessionStores = {
  get customer(){ return makeDatastore('customers', 'data/Customers.json') },
  get batch(){ return makeDatastore('customers', 'data/Batch.json') },
  get invoice() { return makeDatastore('invoices', 'data/Invoices.json') },
  get tranState() { return makeDatastore('tranStates', 'data/TranStates.json') }
}

export default sessionStores

