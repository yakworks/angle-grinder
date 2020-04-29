import orgStates from '../org/states'
import userStates from '../user/states'

export const packet = {
  abstract: true,
  url:'^',
  name: 'app',
  template: require('./packet/index.html'),
  children: [orgStates, userStates]
}

export const fresh = {
  name: 'app',
  component: 'freshApp'
}

export default { packet, fresh }
// export default appRoot
