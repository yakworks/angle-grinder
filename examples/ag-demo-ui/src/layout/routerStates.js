export const packet = {
  abstract: true,
  url:'^',
  name: 'app',
  template: require('./packet/index.html')
}

export const fresh = {
  name: 'app',
  component: 'freshApp'
}

export default { packet, fresh }
// export default appRoot
