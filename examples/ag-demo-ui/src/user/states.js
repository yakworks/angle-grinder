export default {
  name: 'user',
  url: '/',
  template: require('../../public/templates/user/list.html'),
  controller: 'user.ListCtrl',
  data: {
    title: 'User',
    href: 'user',
    icon: 'mdi mdi-monitor-dashboard'
  }
}
