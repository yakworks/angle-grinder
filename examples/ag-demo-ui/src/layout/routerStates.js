import orgStates from '../org/states'
import userStates from '../user/states'
import './fresh'

const states = [{data:{icon: 'mdi mdi-id-card', title: 'Org Section'}, children:[orgStates]}, userStates]
export const packet = {
  abstract: true,
  url:'^',
  name: 'app',
  template: require('./packet/index.html'),
  children: states
}

export const fresh = {
  abstract: true,
  url:'^',
  name: 'app',
  component: 'freshApp',
  children: states
}

export default { packet, fresh }
// export default appRoot
