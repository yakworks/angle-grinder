import appState from 'angle-grinder/src/tools/AppState'
import appRoot from '../../routerStates.js'
import feather from 'feather-icons'
//import * as sidenav from './sidenav'

export function toggleSidenav(){
  appState.sidenav.open = !appState.sidenav.open
  if(appState.sidenav.open){
    $('.menu-icon-wrapper').toggleClass('open', true);
    //$('.hamburger').toggleClass('active', true);
    $(".sidebar-menu .list-item.active ul").slideDown();
  } else {
    $('.menu-icon-wrapper').toggleClass('open', false);
    //$('.hamburger').toggleClass('active', false);

    // $(".sidebar-menu li").removeClass("active")
    $(".sidebar-menu li ul").slideUp();
  }
}

class controller {

  constructor($element) {
    this.$element = $element
    this.$state = appState.$state
    this.appState = appState
    this.sideMenuItems = appRoot.children
  }

  // init code here
  // $onInit() {
  //   super.onInit()
  // }

  get isOpen() {
    return appState.sidenav.open
  }

  $onChanges(changesObj){
    console.log("sidebar $onChanges(changesObj)", changesObj)
  }

  toggleSidenav(){
    toggleSidenav()
  }

  $postLink() {
    // feather icons
    feather.replace()

    //Sidebar menu
    if ($('.sidebar').length) {
      $(".sidebar-menu > li.has-children > a").on("click", function (i) {
        i.preventDefault();
        if (!$(this).parent().hasClass("active")) {
          $(".sidebar-menu li ul").slideUp();
          $(this).next().slideToggle();
          $(".sidebar-menu li").removeClass("active");
          $(this).parent().addClass("active");
        }
        else {
          $(this).next().slideToggle();
          $(".sidebar-menu li").removeClass("active");
        }
      });
    }
  }

}

export default angular.module('demo.fresh.sidenav',[])
  .component('freshSidenav', {
    controller,
    template: require('./index.html'),
  })
  .name
