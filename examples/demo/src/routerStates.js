import gridsStates from './grids/routes'
import componentsStates from './components/routes'
import formStates from './controls/routes'
import dashStates from './dashboards/routes'

const levelStates = {
  name: 'levels',
  abstract: true,
  template: '<div ui-view class="fade-in-up"></div>',
  data: {
    icon: 'fas fa-plug '
  },
  children: [
    {
      name: 'Foo Fuzz',
      children: [
        {
          name: 'level3a',
          data: {
            title: 'Foo Bar Baz Buzz Boogaloo'
          },
          template: '<h4>level3a</h4>'
        },
        {
          name: 'level3b',
          template: '<h4>level3b</h4>'
        }
      ]
    },
    {
      name: 'Bar Bazz',
      children: [
        {
          name: 'level3c',
          data: {
            title: 'Bar Bazz Boogaloo'
          },
          template: '<h4>level3c</h4>'
        },
        {
          name: 'level3d',
          template: '<h4>level3d</h4>'
        }
      ]
    }
  ]
}

export const packet = {
  name: 'packet',
  url: '/packet',
  template: require('./packet/index.html'),
  abstract: true,
  children: [dashStates, componentsStates, formStates, gridsStates]
}

export const fresh = {
  name: 'fresh',
  url: '/fresh',
  component: 'freshApp',
  abstract: true,
  children: [dashStates, componentsStates, formStates, gridsStates, levelStates]
}

export const login = {
  name: 'login',
  url: '/login',
  component: 'loginPage'
}

export default { packet, fresh, login }
// export default appRoot
