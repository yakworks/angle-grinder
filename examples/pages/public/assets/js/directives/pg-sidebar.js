/* ============================================================
 * Directive: pgSidebar
 * AngularJS directive for Pages Sidebar jQuery plugin
 * ============================================================ */

angular.module('app')
    .directive('pgSidebar', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var $sidebar = $(element);
            	$sidebar.sidebar($sidebar.data());

            	// Bind events
                // Toggle sub menus
                $('body').on('click', '.sidebar-menu a', function(e) {

                    if ($(this).parent().children('.sub-menu') === false) {
                         return;
                     }
                     var el = $(this);
                     var parent = $(this).parent().parent();
                     var li = $(this).parent();
                     var sub = $(this).parent().children('.sub-menu');

                     if(li.hasClass("active open")){
                        el.children('.arrow').removeClass("active open");
                        sub.slideUp(200, function() {
                            li.removeClass("active open"); 
                        });
                        
                     }else{
                        parent.children('li.open').children('.sub-menu').slideUp(200);
                        parent.children('li.open').children('a').children('.arrow').removeClass('active open');
                        parent.children('li.open').removeClass("open active");
                        el.children('.arrow').addClass("active open");
                        sub.slideDown(200, function() {
                            li.addClass("active open");

                        });
                     }
                });

            }
        }
    });