import angular from 'angular'
import uibootstrap from 'angular-ui-bootstrap' // uibootstrap is just a string with the name of the module
import ngcookies from 'angular-cookies'
import 'angular-ui-router'
import ngAnimate from 'angular-animate'
import ngLadda from 'angular-ladda'
import angular_translate from 'angular-translate'
import angular_loading_bar from 'angular-loading-bar'
import 'angular-breadcrumb' //'ncy-angular-breadcrumb'
import vButton from 'v-button'
import fullscreen from './utils/fullscreen'
import truncate_filters from './utils/truncate.filters'


export default angular.module("app", [
  'ui.router',
  uibootstrap,
  ngcookies,
  'ncy-angular-breadcrumb',
  fullscreen,
  angular_loading_bar,
  ngAnimate,
  ngLadda,
  vButton,
  truncate_filters,
  angular_translate
]).name

// export default angular.module("app", [
//   //'ngAnimate',
//   uibootstrap,
// 	ngcookies,
// 	//'ngStorage',
// 	//'ngSanitize',
// 	//'ngTouch',
// 	uirouter,
// 	// 'angularMoment',
// 	// 'oc.lazyLoad',
// 	// 'swipe',
// 	// 'ngBootstrap', //daterangepicker
// 	// 'truncate',
// 	// 'uiSwitch',
// 	// 'toaster',
// 	// 'ngAside',
//   // 'vAccordion',
//   vButton,
// 	// 'oitozero.ngSweetAlert',
// 	// 'angular-notification-icons',
//   // 'angular-ladda',
//   ngLadda,
// 	// 'angularAwesomeSlider',
// 	// 'slickCarousel',
// 	// 'cfp.loadingBar',
// 	'ncy-angular-breadcrumb',
// 	// 'duScroll',
// 	// 'pascalprecht.translate',
// 	// 'FBAngular'
// ]).name

//<script src="../../bower_components/angular-cookies/angular-cookies.min.js"></script>
//<script src="../../bower_components/angular-animate/angular-animate.min.js"></script>
//<script src="../../bower_components/angular-touch/angular-touch.min.js"></script>
//<script src="../../bower_components/angular-sanitize/angular-sanitize.min.js"></script>
//<script src="../../bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
//<!-- Angular storage -->
//<script src="../../bower_components/ngstorage/ngStorage.min.js"></script>
//<!-- Angular oclazyload -->
//<script src="../../bower_components/oclazyload/dist/ocLazyLoad.min.js"></script>
//<script src="../../bower_components/angular-breadcrumb/dist/angular-breadcrumb.min.js"></script>
//<script src="../../bower_components/angular-swipe/dist/angular-swipe.min.js"></script>
//<script src="../../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
//<script src="../../bower_components/angular-loading-bar/build/loading-bar.min.js"></script>
//<!-- Angular Scroll -->
//<script src="../../bower_components/angular-scroll/angular-scroll.min.js"></script>
//<!-- Angular Fullscreen -->
//<script src="../../bower_components/angular-fullscreen/src/angular-fullscreen.js"></script>
//<!-- Angular DateRangePicker -->
//<script src="../../bower_components/ng-bs-daterangepicker/dist/ng-bs-daterangepicker.min.js"></script>
//<!-- Angular Truncate -->
//<script src="../../bower_components/angular-truncate/src/truncate.js"></script>
//<!-- Angular Moment -->
//<script src="../../bower_components/angular-moment/angular-moment.min.js"></script>
//<!-- Angular ui-switch -->
//<script src="../../bower_components/angular-ui-switch/angular-ui-switch.min.js"></script>
//<!-- Angular Toaster -->
//<script src="../../bower_components/AngularJS-Toaster/toaster.js"></script>
//<!-- Angular Ng-Aside -->
//<script src="../../bower_components/angular-aside/dist/js/angular-aside.min.js"></script>
//<!-- V-Accordion -->
//<script src="../../bower_components/v-accordion/dist/v-accordion.min.js"></script>
//<!-- V-Button -->
//<script src="../../bower_components/v-button/dist/v-button.min.js"></script>
//<!-- Angular Sweet Alert -->
//<script src="../../bower_components/ngSweetAlert/SweetAlert.min.js"></script>
//<!-- Angular Notification Icons -->
//<script src="../../bower_components/angular-notification-icons/dist/angular-notification-icons.min.js"></script>
//<!-- Angular Ladda -->
//<script src="../../bower_components/angular-ladda/dist/angular-ladda.min.js"></script>

