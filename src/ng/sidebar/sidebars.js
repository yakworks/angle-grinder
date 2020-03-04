'use strict'
import appState from 'angle-grinder/src/tools/AppState'
/**
 * A set of directives for left and right sidebar.
 */
export default 'ag.sidebar'
angular.module('ag.sidebar', [])
  .directive('agSidebar', function($document, $rootScope) {
    return {
      replace: false,
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var shouldCloseOnOuterClicks = true

        if (attrs.closeOnOuterClicks === 'false' || attrs.closeOnOuterClicks === '0') {
          shouldCloseOnOuterClicks = false
        }

        var isAncestorOrSelf = function(element, target) {
          var parent = element

          while (parent.length > 0) {
            if (parent[0] === target[0]) {
              parent = null
              return true
            }
            parent = parent.parent()
          }

          parent = null
          return false
        }

        var closeOnOuterClicks = function(e) {
          console.log('closeOnOuterClicks called appState.sidenav.open',  appState.sidenav.open)
          if (!isAncestorOrSelf(angular.element(e.target), elem)) {
            //$rootScope.toggle(attrs.id, 'off')
            console.log('appState.sidenav.open', appState.sidenav.open)
            //appState.sidenav.open = false
            e.preventDefault()
            return false
          }
        }

        var clearCb1 = angular.noop()

        if (shouldCloseOnOuterClicks) {
          console.log("shouldCloseOnOuterClicks", shouldCloseOnOuterClicks)
          console.log('shouldCloseOnOuterClicks appState.sidenav.open', appState.sidenav.open)
          clearCb1 = $rootScope.$on('ag.sidenav.toggle', function(e, id, isOpen) {
            console.log('shouldCloseOnOuterClicks ag.sidenav.toggle fired')
            console.log('attrs.id', {id: id, 'attrs.id':attrs.id})
            if (id === attrs.id) {
              if (isOpen) {
                setTimeout(function() {
                  console.log('ag.sidenav.toggle isOpen $document.on closeOnOuterClicks')
                  $document.on('click tap', closeOnOuterClicks)
                }, 300)
              } else {
                console.log('ag.sidenav.toggle NOT isOpen $document.off closeOnOuterClicks')
                $document.off('click tap', closeOnOuterClicks)
              }
            }
          })
        }

        scope.$on('$destroy', function() {
          clearCb1()
          $document.off('click tap', closeOnOuterClicks)
        })
      }
    }
  })
  .directive('agNavSearch', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var wrap = $('.app-aside')
        var searchForm = elem.children('form')
        // var formWrap = elem.parent()

        $('.s-open').on('click', function(e) {
          searchForm.prependTo(wrap)
          e.preventDefault()
          $(document).on('mousedown touchstart', closeForm)
        })
        $('.s-remove').on('click', function(e) {
          searchForm.appendTo(elem)
          e.preventDefault()
        })
        var closeForm = function(e) {
          if (!searchForm.is(e.target) && searchForm.has(e.target).length === 0) {
            $('.s-remove').trigger('click')
            $(document).off('mousedown touchstart', closeForm)
          }
        }
      }
    }
    // function isSidebarClosed() {
    //   return $('.app-sidebar-closed').length
    // }

    // function isSidebarFixed() {
    //   return $('.app-sidebar-fixed').length
    // }
  })
  .directive('agAside', ['$window', '$rootScope', '$timeout', 'APP_MEDIAQUERY',
    function($window, $rootScope, $timeout, mq) {
      var $html = $('html'); var $win = $($window); var _this
      // var wrap = $('.app-aside')
      return {
        restrict: 'A',

        link: function(scope, elem, attrs, controllers) {
          var eventObject = isTouch() ? 'click' : 'mouseenter'
          var ul = ''
          var menuTitle
          var wrap = $('.app-aside')
          var space = 0
          elem.on('click', 'li > a', function(e) {
            _this = $(this)
            if (isSidebarClosed() && !isMobile() && !_this.closest('ul').hasClass('sub-menu')) { return }

            _this.closest('ul').find('.open').not('.active').children('ul').not(_this.next()).slideUp(200).parent('.open').removeClass('open')
            if (_this.next().is('ul') && _this.parent().toggleClass('open')) {
              _this.next().slideToggle(200, function() {
                $win.trigger('resize')
              })
              e.stopPropagation()
              e.preventDefault()
            } else {
              $rootScope.toggle('sidebar', 'off')
            }
          })
          elem.on(eventObject, 'nav a', function(e) {
            if (!isSidebarClosed() || isMobile()) { return }
            _this = $(this)

            if (!_this.parent().hasClass('hover') && !_this.closest('ul').hasClass('sub-menu')) {
              wrapLeave()
              _this.parent().addClass('hover')
              menuTitle = _this.find('.item-inner').clone()
              if (_this.parent().hasClass('active')) {
                menuTitle.addClass('active')
              }

              var offset = $('#sidebar > .sidebar-container > div').position().top + $('.nav-user-wrapper').outerHeight() + $('header').outerHeight()
              var itemTop = isSidebarFixed() && !isBoxedPage() ? _this.parent().position().top + offset + space : (_this.parent().offset().top - $('header').outerHeight())

              menuTitle.css({
                position: isSidebarFixed() && !isBoxedPage() ? 'fixed' : 'absolute',
                height: _this.parent().outerHeight(),
                top: itemTop,
                borderBottomRightRadius: '10px',
                lineHeight: _this.parent().outerHeight() + 'px',
                padding: 0
              }).appendTo(wrap)

              if (_this.next().is('ul')) {
                ul = _this.next().clone(true)
                menuTitle.css({
                  borderBottomRightRadius: 0
                })
                ul.appendTo(wrap).css({
                  top: itemTop + _this.parent().outerHeight(),
                  position: isSidebarFixed() && !isBoxedPage() ? 'fixed' : 'absolute'
                })
                if (_this.parent().position().top + _this.outerHeight() + offset + ul.height() > $win.height() && isSidebarFixed() && !isBoxedPage()) {
                  ul.css('bottom', 0)
                } else {
                  ul.css('bottom', 'auto')
                }

                wrap.find('.sidebar-container').scroll(function() {
                  if (isSidebarFixed() && !isBoxedPage()) { wrapLeave() }
                })

                setTimeout(function() {
                  if (!wrap.is(':empty')) {
                    $(document).on('click tap', wrapLeave)
                  }
                }, 300)
              } else {
                ul = ''
              }
            }
          })

          wrap.on('mouseleave', function(e) {
            $(document).off('click tap', wrapLeave)
            $('.hover', wrap).removeClass('hover')
            $('> .item-inner', wrap).remove()
            $('> ul', wrap).remove()
          })

          function wrapLeave() {
            wrap.trigger('mouseleave')
          }

          $rootScope.$on('$locationChangeSuccess', function() {
            var newPath
            newPath = window.location.hash
            angular.forEach(elem.find('.main-navigation-menu a'), function(domLink) {
              var link = angular.element(domLink)
              var menu
              if (domLink.hash === newPath && (!isSidebarClosed() || isMobile())) {
                if (link.closest('ul').hasClass('sub-menu')) {
                  menu = link.closest('ul')
                  // var activeMenu = menu
                  menu.slideDown(200).parent().siblings().children('.sub-menu').slideUp(200, function() {
                    $(this).parent().removeClass('open')
                  })
                } else {
                  $('.sub-menu').slideUp(200, function() {
                    $(this).parent().removeClass('open')
                  })
                }
              }
              // activeMenu = null
              menu = null
            })
          })
        }
      }

      function isTouch() {
        return $html.hasClass('touch')
      }

      function isMobile() {
        return $win.width() < mq.desktop
      }

      function isSidebarClosed() {
        return $('.app-sidebar-closed').length
      }

      function isSidebarFixed() {
        return $('.app-sidebar-fixed').length
      }

      function isBoxedPage() {
        return $('.app-boxed-page').length
      }
    }])
  // .directive('sidebarToggler', function($window, $timeout) {
  //   return {
  //     restrict: 'C',

//     link: function(scope, elem, attrs) {
//       elem.on('click', function() {
//         $('.main-content').on('webkitTransitionEnd mozTransitionEnd oTransitionEnd otransitionend transitionend', function() {
//           // window.dispatchEvent(new Event('resize'));
//           $timeout(function() {
//             var evt = $window.document.createEvent('UIEvents')
//             evt.initUIEvent('resize', true, false, $window, 0)
//             $window.dispatchEvent(evt)
//           }, 500)
//           $('.main-content').off('webkitTransitionEnd mozTransitionEnd oTransitionEnd otransitionend transitionend')
//         })
//       })
//     }
//   }
// })
// .directive('ctSticky', function($window, $timeout) {
//   return {
//     restrict: 'A',
//     scope: {
//       ctStickyDisabled: '&'
//     },
//     link: function($scope, $element, $attributes) {
//       $timeout(function() {
//         var actualPadding = 90; var maxPadding = 60; var newPadding; var isSticky
//         var setPadding = function() {
//           newPadding = actualPadding - $window.scrollY

//           if ($window.scrollY < maxPadding) {
//             $element.css({
//               paddingTop: actualPadding - $window.scrollY
//             })
//           } else {
//             $element.css({
//               paddingTop: 30
//             })
//           }
//         }
//         if ($attributes.ctStickyDisabled) {
//           $scope.$watch($scope.ctStickyDisabled, function(newVal, oldVal) {
//             if (newVal && !oldVal) {
//               isSticky = false
//               $element.attr('style', function(i, style) {
//                 return style.replace(/padding[^;]+;?/g, '')
//               })
//             } else if (!newVal) {
//               isSticky = true
//               setPadding()
//             }
//           })
//         }
//         angular.element($window).on('scroll', function() {
//           if (isSticky) {
//             setPadding()
//           }
//         })
//       })
//     }
//   }
// })
