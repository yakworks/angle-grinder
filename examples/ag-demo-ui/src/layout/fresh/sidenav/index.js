import appState from 'angle-grinder/src/tools/AppState'
// import routerStates from '../../routerStates.js'
import _ from 'lodash'
// import feather from 'feather-icons'
// import * as sidenav from './sidenav'

const SIDENAV_MENU_LIST_ITEM = '.sidenav-menu .list-item'

export function toggleSidenav() {
  appState.sidenav.open ? minimizeSidenav() : openSidenav()
}

function openSidenav() {
  $(`${SIDENAV_MENU_LIST_ITEM}.is-active .submenu`).slideDown()
  // ui-router sref set is-active, make sure the active link is-open too
  $(`${SIDENAV_MENU_LIST_ITEM}.is-active`).addClass('is-open')
  appState.sidenav.open = true
}

function minimizeSidenav() {
  appState.sidenav.open = false
  // close submenus
  $(SIDENAV_MENU_LIST_ITEM).removeClass('is-open')
  $(`${SIDENAV_MENU_LIST_ITEM} .submenu`).slideUp()
}

class controller {
  constructor($element, $timeout, $window, $location, ConfigCache) {
    this.$timeout = $timeout
    this.$state = appState.$state
    this.appState = appState
    this.layout = appState.layout
    this.$window = $window
    this.$location = $location
    ConfigCache.get('/api/config/sidebar').then((resp) => {
      this.sideMenuItems = Object.values(resp)
    })
  }

  get isOpen() {
    return appState.sidenav.open
  }

  get logo() {
    // todo replace
    return 'assets/images/logos/yak-white.svg'
  }

  // checks if item is the active item
  get isFixed() {
    return appState.layout.isSidenavFixed
  }

  // checks if item is the active item
  isItemActive(mitem) {
    return appState.$state.includes(mitem.name)
  }

  toggleSidenav() {
    toggleSidenav()
  }

  itemClick(mitem, $event) {
    const $target = $($event.currentTarget)

    // make sure sidenav is open
    appState.sidenav.open = true
    console.log('$target', $target)

    // if it has children then expand it
    if (mitem.children) {
      $event.preventDefault()
      if (!$target.parent().hasClass('is-open')) {
        $(`${SIDENAV_MENU_LIST_ITEM} .submenu`).slideUp()
        $target.next().slideToggle()
        $(SIDENAV_MENU_LIST_ITEM).removeClass('is-open')
        $target.parent().addClass('is-open')
      } else {
        $target.next().slideToggle()
        $(SIDENAV_MENU_LIST_ITEM).removeClass('is-open')
      }
      // if openItem is equal item then its open so null out to close it
      this.openItem = (this.openItem === mitem.name) ? '' : mitem.name
    } else {
      // it has no children, its a ui-router link
      // if not fixed then close (minimize) on click
      if (!this.isFixed) minimizeSidenav()
      // make sure others are closed
      // if its a link on header without children then it will parent will NOT be a submenu
      if (!$target.parent().parent().hasClass('submenu')) {
        $(`${SIDENAV_MENU_LIST_ITEM} .submenu`).slideUp()
        $(SIDENAV_MENU_LIST_ITEM).removeClass('is-open')
        $target.parent().addClass('is-open')
      }
      if (mitem.href){
        this.$window.location.href = mitem.href
      } else {
        appState.$state.go(mitem.name)
      }

    }
  }
  getCurrentUrl = () => this.$location.absUrl().split('#')[0].split('/')[3]
  // final run, basically an "after init"
  $postLink() {
    // make sure the submenu is shown for active menu item
    this.$timeout(function() {
      $(`${SIDENAV_MENU_LIST_ITEM}.is-active .submenu`).show()
      $(`${SIDENAV_MENU_LIST_ITEM}.is-active`).addClass('is-open')
    })
  }
}

export default angular.module('demo.fresh.sidenav', [])
  .component('freshSidenav', {
    controller,
    template: require('./index.html')
  })
  .name
