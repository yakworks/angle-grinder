import orgStates from '../org/states'
import userStates from '../user/states'
import './fresh'

export const packet = {
  abstract: true,
  url:'^',
  name: 'app',
  template: require('./packet/index.html'),
  children: [orgStates, userStates]
}

export const fresh = {
  abstract: true,
  url:'^',
  name: 'app',
  component: 'freshApp',
  children: [orgStates, userStates]
}

export default { packet, fresh }
// export default appRoot
