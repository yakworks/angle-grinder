import template from './index.html'
// import toast from 'angle-grinder/src/tools/toast'
import ky from 'ky'

class controller {
  loginUrl = 'https://rcm-dev-api.9ci.io/api/login'

  constructor($scope) {
    this.$scope = $scope
    this.formLogin = $scope.formLogin
  }
  // btnClick = function(event) {
  //   ky.post('api/auth/login').json()

  //   toast.success('logged in')
  // }

  async login() {
    console.log('vm', this.vm)
    console.log('scope', this.$scope)
    if (!this.vm) return

    try {
      const keyData = await ky.post(`${this.loginUrl}`,
        { json: { username: this.vm.login, password: this.vm.pword } }
      ).json()
      localStorage.setItem('bearer', keyData)
      // console.log('keyData', keyData)

    } catch (error) {
      console.error('Fetch error:', error)
      const resp = error.response
      if (resp.status === 401){
        this.response401 = 'invalid authentication credentials'
      }
      console.error('Fetch error response:', error.response)
    }

  }
}

export default angular
  .module('demo.fresh.login', [])
  .component('loginPage', {
    template,
    controller
  }).name
