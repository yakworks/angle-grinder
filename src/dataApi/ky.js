import ky from 'ky'

// TODO set defaults

let client = ky.extend({
  // ... some config ...
});

const setClientConfig = (config) => {
  client = client.extend(config);
};

export {client,
  setClientConfig
} // swalInstance
