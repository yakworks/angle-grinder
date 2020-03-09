import appState from 'angle-grinder/src/tools/AppState'

export function toggle(){
  appState.sidenav.open = !appState.sidenav.open
  if(appState.sidenav.open){
    $('.menu-icon-wrapper').toggleClass('open', true);
    $('.hamburger').toggleClass('active', true);
    $(".sidebar-menu .list-item.active ul").slideDown();
  } else {
    $('.menu-icon-wrapper').toggleClass('open', false);
    $('.hamburger').toggleClass('active', false);

    // $(".sidebar-menu li").removeClass("active")
    $(".sidebar-menu li ul").slideUp();
  }
  //$('.menu-icon-wrapper').toggleClass('open');
  // $('.menu-icon-wrapper').removeClass('open');
}
