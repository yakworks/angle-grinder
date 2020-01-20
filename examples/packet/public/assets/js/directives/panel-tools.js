'use strict';
/**
 * Add several features to panels.
 */
app.directive('ctPaneltool', function () {
    var templates = {
        /* jshint multistr: true */
        collapse: "<a href='#' class='btn btn-transparent btn-sm' panel-collapse='' tooltip-placement='top' uib-tooltip='Collapse' ng-click='{{panelId}} = !{{panelId}}' ng-init='{{panelId}}=false'>" + "<i ng-if='{{panelId}}' class='ti-plus'></i>" + "<i ng-if='!{{panelId}}' class='ti-minus'></i>" + "</a>",
        refresh: "<a href='#' class='btn btn-transparent btn-sm' panel-refresh='' tooltip-placement='top' uib-tooltip='Refresh' data-spinner='{{spinner}}'>" + "<i class='fa fa-circle-o'></i>" + "</a>",
        expand: "<a href='#' class='btn btn-transparent btn-sm hidden-sm hidden-xs' panel-expand=''>" + "<i class='fa fa-expand' ng-show='!isPanelFullscreen'></i><i class='fa fa-compress' ng-show='isPanelFullscreen'></i>" + "</a>",
        dismiss: "<a href='#' class='btn btn-transparent btn-sm' panel-dismiss='' tooltip-placement='top' uib-tooltip='Close'>" + "<i class='ti-close'></i>" + "</a>"
    };

    return {
        restrict: 'E',
        template: function (elem, attrs) {
            var temp = '';
            if (attrs.toolCollapse)
                temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')));
            if (attrs.toolRefresh)
                temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
            if (attrs.toolExpand)
                temp += templates.expand;
            if (attrs.toolDismiss)
                temp += templates.dismiss;
            return temp;
        }
    };
});
app.directive('panelExpand', function ($compile) {
    'use strict';
    return {
        restrict: 'A',
        replace: false,
        terminal: true, //this setting is important, see explanation below
        priority: 1001, //this setting is important, see explanation below
        scope: true,
        link: function link(scope, element, attrs) {
            scope.isPanelFullscreen = false;
            scope.fullscreenTooltip = 'Expand';
            var panel = element.closest('.panel');
            element.attr('uib-tooltip', '{{fullscreenTooltip}}');
            element.attr('tooltip-placement', 'top');
            element.attr('ng-click', 'toggleFullScreen()');
            element.removeAttr("panel-expand");
            //remove the attribute to avoid indefinite loop
            element.removeAttr("data-panel-expand");

            //also remove the same attribute with data- prefix in case users specify data-common-things in the html
            var el = $compile("<div fullscreen='isPanelFullscreen' only-watched-property class='panel-fullscreen'></div>")(scope);
            panel.before(el).appendTo(el);

            scope.toggleFullScreen = function () {
                scope.isPanelFullscreen = !scope.isPanelFullscreen;
                if (scope.isPanelFullscreen) {

                    scope.fullscreenTooltip = 'Compress';
                } else {
                    scope.fullscreenTooltip = 'Expand';
                }

            };
            $compile(element)(scope);

        }
    };
});
app.directive('panelRefresh', function () {
    'use strict';

    return {
        restrict: 'A',
        controller: ["$scope", "$element",
		function ($scope, $element) {

		    var refreshEvent = 'panel-refresh', csspinnerClass = 'csspinner', defaultSpinner = 'load1';

		    // method to clear the spinner when done
		    function removeSpinner() {
		        this.removeClass(csspinnerClass);
		    }

		    // catch clicks to toggle panel refresh
		    $element.on('click', function () {
		        var $this = $(this), panel = $this.parents('.panel').eq(0), spinner = $this.data('spinner') || defaultSpinner;

		        // start showing the spinner
		        panel.addClass(csspinnerClass + ' ' + spinner);

		        // attach as public method
		        panel.removeSpinner = removeSpinner;

		        // Trigger the event and send the panel object
		        $this.trigger(refreshEvent, [panel]);

		    });

		}]

    };
});
app.directive('panelDismiss', function () {
    'use strict';
    return {
        restrict: 'A',
        controller: ["$scope", "$element",
		function ($scope, $element) {
		    var parent = $(this).closest('.panel');
		    $element.on('click', function () {

		        var parent = $(this).closest('.panel');

		        destroyPanel();

		        function destroyPanel() {
		            var col = parent.parent();
		            parent.fadeOut(300, function () {
		                $(this).remove();
		                if (col.is('[class*="col-"]') && col.children('*').length === 0) {
		                    col.remove();
		                }
		            });
		        }

		    });
		}]

    };
}); (function ($, window, document) {
    'use strict';

    $(document).on('panel-refresh', '.panel', function (e, panel) {

        // perform any action when a .panel triggers a the refresh event
        setTimeout(function () {
            // when the action is done, just remove the spinner class
            panel.removeSpinner();
        }, 3000);

    });

}(jQuery, window, document));
