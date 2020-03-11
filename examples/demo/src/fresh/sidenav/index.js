import appState from 'angle-grinder/src/tools/AppState'
import appRoot from '../../routerStates.js'
import feather from 'feather-icons'
//import * as sidenav from './sidenav'

export function toggleSidenav(){
  appState.sidenav.open = !appState.sidenav.open
  if(appState.sidenav.open){
    $(".sidebar-menu .list-item.active ul").slideDown();
  } else {
    $(".sidebar-menu .list-item ul").slideUp();
  }
}

class controller {

  constructor() {
    this.$state = appState.$state
    this.appState = appState
    this.sideMenuItems = appRoot.children
  }

  // init code here
  $onInit() {
  }

  get isOpen() {
    return appState.sidenav.open
  }

  // checks if item is an open item
  isItemOpen(mitem) {
    return this.openItem == mitem.name
  }

  // checks if item is the active item
  isItemActive(mitem) {
    return this.$state.includes(mitem.name)
  }

  $onChanges(changesObj){
    console.log("sidebar $onChanges(changesObj)", changesObj)
  }

  toggleSidenav(){
    toggleSidenav()
  }

  itemClick(mitem, $event){

    //console.log("***********itemClick mitem**********", mitem)
    // if it has children then expand it
    if(mitem.children){
      $event.preventDefault()
      // if openItem is equal item then its open so null out to close it
      this.openItem = (this.openItem === mitem.name) ? '' : mitem.name

      //mitem.active = !mitem.active
    } else {
      // it has no children then its a link
      // console.log("appState.$state.go", mitem.name)
      appState.$state.go(mitem.name)
      this.openItem =
    }
  }

  $postLink() {
    // feather icons
    feather.replace()

    //Sidebar menu
    if ($('.sidebar').length) {
      // $(".sidebar-menu > .has-children > a").on("click", function (i) {
      //   i.preventDefault();
      //   // this in a click function refers to the element that was clicked
      //   if (!$(this).parent().hasClass("active")) {
      //     $(".sidebar-menu li ul").slideUp();
      //     $(this).next().slideToggle();
      //     $(".sidebar-menu li").removeClass("active");
      //     $(this).parent().addClass("active");
      //   }
      //   else {
      //     $(this).next().slideToggle();
      //     $(".sidebar-menu li").removeClass("active");
      //   }
      // });
    }
  }

}

export default angular.module('demo.fresh.sidenav',[])
  .component('freshSidenav', {
    controller,
    template: require('./index.html'),
  })
  .animation('.slide', function() {
    var NG_HIDE_CLASS = 'ng-hide';
    return {
      beforeAddClass: function(element, className, done) {
        if(className === NG_HIDE_CLASS) {
          console.log("sliding up")
          element.slideUp(done);
        }
      },
      removeClass: function(element, className, done) {
        if(className === NG_HIDE_CLASS) {
          console.log("sliding down")
          element.hide().slideDown(done);
        }
      }
    }
  })
  .name
