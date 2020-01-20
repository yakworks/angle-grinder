'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'd3': '../../bower_components/d3/d3.min.js',

        //*** jQuery Plugins
        'chartjs': '../../bower_components/Chart.js/Chart.min.js',
        'ckeditor-plugin': '../../bower_components/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['../../bower_components/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': ['../../bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', '../../bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
        'jquery-appear-plugin': ['../../bower_components/jquery-appear/build/jquery.appear.min.js'],
        'spectrum-plugin': ['../../bower_components/spectrum/spectrum.js', '../../bower_components/spectrum/spectrum.css'],
		'jcrop-plugin': ['../../bower_components/Jcrop/js/Jcrop.min.js', '../../bower_components/Jcrop/css/Jcrop.min.css'],
		
		
        //*** Controllers
        'dashboardCtrl': 'assets/js/controllers/dashboardCtrl.js',
        'iconsCtrl': 'assets/js/controllers/iconsCtrl.js',
        'vAccordionCtrl': 'assets/js/controllers/vAccordionCtrl.js',
        'ckeditorCtrl': 'assets/js/controllers/ckeditorCtrl.js',
        'laddaCtrl': 'assets/js/controllers/laddaCtrl.js',
        'ngTableCtrl': 'assets/js/controllers/ngTableCtrl.js',
        'cropCtrl': 'assets/js/controllers/cropCtrl.js',
        'asideCtrl': 'assets/js/controllers/asideCtrl.js',
        'toasterCtrl': 'assets/js/controllers/toasterCtrl.js',
        'sweetAlertCtrl': 'assets/js/controllers/sweetAlertCtrl.js',
        'mapsCtrl': 'assets/js/controllers/mapsCtrl.js',
        'chartsCtrl': 'assets/js/controllers/chartsCtrl.js',
        'calendarCtrl': 'assets/js/controllers/calendarCtrl.js',
        'nestableCtrl': 'assets/js/controllers/nestableCtrl.js',
        'validationCtrl': ['assets/js/controllers/validationCtrl.js'],
        'userCtrl': ['assets/js/controllers/userCtrl.js'],
        'selectCtrl': 'assets/js/controllers/selectCtrl.js',
        'wizardCtrl': 'assets/js/controllers/wizardCtrl.js',
        'uploadCtrl': 'assets/js/controllers/uploadCtrl.js',
        'treeCtrl': 'assets/js/controllers/treeCtrl.js',
        'inboxCtrl': 'assets/js/controllers/inboxCtrl.js',
        'xeditableCtrl': 'assets/js/controllers/xeditableCtrl.js',
        'chatCtrl': 'assets/js/controllers/chatCtrl.js',
        'dynamicTableCtrl': 'assets/js/controllers/dynamicTableCtrl.js',
        'notificationIconsCtrl': 'assets/js/controllers/notificationIconsCtrl.js',
        'dateRangeCtrl': 'assets/js/controllers/daterangeCtrl.js',
        'notifyCtrl': 'assets/js/controllers/notifyCtrl.js',
        'sliderCtrl': 'assets/js/controllers/sliderCtrl.js',
        'knobCtrl': 'assets/js/controllers/knobCtrl.js',
        'crop2Ctrl': 'assets/js/controllers/crop2Ctrl.js',
    },
    //*** angularJS Modules
    modules: [{
        name: 'toaster',
        files: ['../../bower_components/AngularJS-Toaster/toaster.js', '../../bower_components/AngularJS-Toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: ['../../bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', '../../bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
        name: 'ngTable',
        files: ['../../bower_components/ng-table/dist/ng-table.min.js', '../../bower_components/ng-table/dist/ng-table.min.css']
    }, {
        name: 'ui.mask',
        files: ['../../bower_components/angular-ui-mask/dist/mask.min.js']
    }, {
        name: 'ngImgCrop',
        files: ['../../bower_components/ng-img-crop/compile/minified/ng-img-crop.js', '../../bower_components/ng-img-crop/compile/minified/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: ['../../bower_components/angular-file-upload/dist/angular-file-upload.min.js']
    }, {
        name: 'monospaced.elastic',
        files: ['../../bower_components/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: ['../../bower_components/ngmap/build/scripts/ng-map.min.js']
    }, {
        name: 'chart.js',
        files: ['../..//bower_components/angular-chart.js/dist/angular-chart.min.js', '../..//bower_components/angular-chart.js/dist/angular-chart.min.css']
    }, {
        name: 'flow',
        files: ['../../bower_components/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
        name: 'ckeditor',
        files: ['../../bower_components/angular-ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: ['../../bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', '../../bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css', 'assets/js/config/config-calendar.js']
    }, {
        name: 'ng-nestable',
        files: ['../../bower_components/angular-nestable/src/angular-nestable.js']
    }, {
        name: 'ngNotify',
        files: ['../../bower_components/ng-notify/dist/ng-notify.min.js', '../../bower_components/ng-notify/dist/ng-notify.min.css']
    }, {
        name: 'xeditable',
        files: ['../../bower_components/angular-xeditable/dist/js/xeditable.min.js', '../../bower_components/angular-xeditable/dist/css/xeditable.css', 'assets/js/config/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: ['../../bower_components/checklist-model/checklist-model.js']
    }, {
        name: 'ui.knob',
        files: ['../../bower_components/ng-knob/dist/ng-knob.min.js']
    }, {
        name: 'ngAppear',
        files: ['../../bower_components/angular-appear/build/angular-appear.min.js']
    }, {
        name: 'countTo',
        files: ['../../bower_components/angular-filter-count-to/dist/angular-filter-count-to.min.js']
    }, {
        name: 'angularSpectrumColorpicker',
        files: ['../../bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js']
    }]
});