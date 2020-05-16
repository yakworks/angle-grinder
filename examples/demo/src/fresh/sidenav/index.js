import appState from 'angle-grinder/src/tools/AppState'
import _ from 'lodash'

const SIDENAV_MENU_LIST_ITEM = '.sidenav-menu .list-item'

export function toggleSidenav() {
  appState.sidenav.open ? minimizeSidenav() : openSidenav()
}

function openSidenav() {
  $(`${SIDENAV_MENU_LIST_ITEM}.is-active > .submenu`).show()
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
  constructor($element, $timeout) {
    this.$timeout = $timeout
    this.$state = appState.$state
    this.appState = appState
    this.layout = appState.layout
    this.sideMenuItems = appState.sideMenuConfig.children
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

  // checks if item is the active item
  isItemOpen(mitem) {
    return this.openItem?.startsWith(mitem.name)
  }

  toggleSidenav() {
    toggleSidenav()
  }

  itemClick(mitem, $event) {
    const $target = $($event.currentTarget)
    const $liTarget = $target.parent()
    const $ulMenuTarget = $target.parent().parent()
    const $childMenu = $target.next()
    // make sure sidenav is open
    appState.sidenav.open = true

    if($liTarget.hasClass('is-open')){
      //simple toggling item item closed if its open.
      this.openItem = ''
      $childMenu.slideToggle()
      $liTarget.removeClass('is-open')
    }
    else {
      //its wasn't open so make sure the others are closed
      //slide the open one up
      $('li > .submenu', $ulMenuTarget ).slideUp()
      //remove the open class
      $('li.is-open', $ulMenuTarget ).removeClass('is-open')

      if (mitem.children) {
        // has children so open it up
        $event.preventDefault()
        $liTarget.addClass('is-open')
        $childMenu.slideToggle()
        // if openItem is equal item then its open so null out to close it
        this.openItem = mitem.name
      } else {
        // it has no children, its a ui-router link
        // if not fixed then close (minimize) on click
        if (!this.isFixed) minimizeSidenav()
        appState.$state.go(mitem.name)
      }
    }
  }

  // final run, basically an "after init"
  $postLink() {
    // make sure the submenu is shown for active menu item
    this.$timeout(function() {
      openSidenav()
      //$(`${SIDENAV_MENU_LIST_ITEM}.is-active .submenu`).show()
      //$(`${SIDENAV_MENU_LIST_ITEM}.is-active`).addClass('is-open')
    })
  }
}

export default angular.module('demo.fresh.sidenav', [])
  .component('freshSidenav', {
    controller,
    template: require('./index.html')
  })
  .name
