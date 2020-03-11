import appState from 'angle-grinder/src/tools/AppState'
import appRoot from '../../routerStates.js'
import _ from 'lodash'
//import feather from 'feather-icons'
//import * as sidenav from './sidenav'

export function toggleSidenav(){
  appState.sidenav.open ? closeSidenav() : openSidenav()
}

function openSidenav(){
  $(".sidebar-menu .list-item.active .submenu").slideDown()
  $(".sidebar-menu .list-item.active").addClass("is-open")
  appState.sidenav.open = true
}

function closeSidenav(){
  appState.sidenav.open = false
  // close submenus
  $(".sidebar-menu .list-item").removeClass("is-open");
  $(".sidebar-menu .list-item .submenu").slideUp()
}

class controller {

  constructor($element, $timeout) {
    this.$timeout = $timeout
    this.$state = appState.$state
    this.appState = appState
    this.sideMenuItems = appRoot.children
  }

  get isOpen() {
    return appState.sidenav.open
  }

  // checks if item is the active item
  isItemActive(mitem) {
    return this.$state.includes(mitem.name)
  }

  toggleSidenav(){
    toggleSidenav()
  }

  itemClick(mitem, $event){
    let $target = $($event.currentTarget)

    //make sure sidenav is open
    appState.sidenav.open = true
    console.log("$target", $target)

    // if it has children then expand it
    if(mitem.children){
      $event.preventDefault()
      if (!$target.parent().hasClass("is-open")) {
        $(".sidebar-menu .list-item .submenu").slideUp();
        $target.next().slideToggle();
        $(".sidebar-menu .list-item").removeClass("is-open");
        $target.parent().addClass("is-open");
      } else {
        $target.next().slideToggle();
        $(".sidebar-menu .list-item").removeClass("is-open");
      }
      // if openItem is equal item then its open so null out to close it
      this.openItem = (this.openItem === mitem.name) ? '' : mitem.name
    } else {
      // it has no children, its a ui-router link
      closeSidenav()
      appState.$state.go(mitem.name)
    }
  }

  // final run, basically an "after init"
  $postLink() {
    //make sure the submenu is shown for active menu item
    this.$timeout(function() {
      $(".sidebar-menu .list-item.active .submenu").show()
      $(".sidebar-menu .list-item.active").addClass("is-open")
    })
  }
  // init code here
  // $onInit() {
  //   this.openItem = this.$state.current.name
  // }
  // $onChanges(changesObj){
  //   console.log("sidebar $onChanges(changesObj)", changesObj)
  // }

}

export default angular.module('demo.fresh.sidenav',[])
  .component('freshSidenav', {
    controller,
    template: require('./index.html'),
  })
  .name
