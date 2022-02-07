import appState from '@yakit/ui/AppState'

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
  /* @ngInject */
  constructor($timeout) {
    this.$timeout = $timeout
    this.$state = appState.$state
    this.appState = appState
    this.layout = appState.layout
    this.sideMenuItems = appState.sideMenuConfig.children
    this.toggleSidenav = toggleSidenav
  }

  get isOpen() {
    return appState.sidenav.open
  }

  get logo() {
    return this.layout.logo
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

  hasChildren(item) {
    return item?.children?.filter((child) => !(child.isMenuItem === false)).length > 0
  }

  itemClick(mitem, $event) {
    const $target = $($event.currentTarget)
    const $liTarget = $target.parent() // li element container
    const $ulMenuTarget = $target.parent().parent() // the ul list ccontainer element
    const $childMenu = $target.next() // the child ul
    // make sure sidenav is open
    appState.sidenav.open = true

    if ($liTarget.hasClass('is-open')) {
      // simple toggling item item closed if its open.
      this.openItem = ''
      $childMenu.slideToggle()
      $liTarget.removeClass('is-open')
    } else {
      // its wasn't open so slide the open one up
      $('li > .submenu', $ulMenuTarget).slideUp()
      // remove the open class
      $('li.is-open', $ulMenuTarget).removeClass('is-open')

      if (this.hasChildren(mitem)) {
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
        // appState.$state.go(mitem.children ? mitem.children[0].name : mitem.name)
      }
    }
  }

  // final run, basically an "after init"
  $postLink() {
    // make sure the submenu is shown for active menu item
    this.$timeout(function() {
      // add listener to fire resize event for gridz after open/closed transition is finished
      $(SIDENAV_MENU_LIST_ITEM).on('transitionend', () => window.dispatchEvent(new Event('resize')))
      openSidenav()
    })
  }
}

export default {
  controller,
  template: require('./ag-sidenav.html')
}
