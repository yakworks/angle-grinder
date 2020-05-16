import orgStates from '../org/states'
import userStates from '../user/states'
import './fresh'

const states = [{data:{icon: 'mdi mdi-id-card', title: 'Org Section'}, children:[orgStates]}, userStates]

export const fresh = {
  abstract: true,
  url:'^',
  name: 'app',
  component: 'freshApp',
  children: states
}

export default { fresh }
// export default appRoot
