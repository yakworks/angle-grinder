'use strict';

/* Controllers */

angular.module('app')
    .factory('BuilderFactory', function() {
        var contentClass = "plainContent";
        return {
            getContentClass: function() {
                return contentClass;
            },
            setContentClass: function(c) {
                contentClass = c
                return contentClass;
            }
        }
    });

angular.module('app')
    .controller('BuilderContentCtrl', ['$scope', 'BuilderFactory', function($scope, BuilderFactory) {
        $scope.builder = {};
        $scope.builder.getContent = BuilderFactory.getContentClass;
    }])
    .controller('BuilderOptionsCtrl', ['$scope', 'BuilderFactory', '$http', function($scope, BuilderFactory, $http) {
        $scope.builder = {
            layout: {
                menu: "menuDefault"
            },
            theme: "default",
            content: "plainContent",
            layoutId: 1,
            colorId: 1,
            contentId: 1
        }

        $scope.setMenu = function(menu, id) {
            $scope.builder.layout.menu = menu;
            $scope.builder.layoutId = id;

            function resetMenu() {
                $scope.app.layout.menuBehind = false;
                $scope.app.layout.menuPin = false;
            }
            resetMenu();
            switch (menu) {
                case 'menuPinned':
                    $scope.app.layout.menuPin = true;
                    break;
                case 'menuBelow':
                    $scope.app.layout.menuBehind = true;
                    break;
                case 'menuPinnedBelow':
                    $scope.app.layout.menuBehind = true;
                    $scope.app.layout.menuPin = true;
                    break;
                default:
                    resetMenu();
                    break;
            }
        }

        $scope.setTheme = function(theme, id) {
            $scope.builder.theme = theme;
            $scope.builder.colorId = id;

            if (theme == 'default') {
                $scope.app.layout.theme = 'pages/css/pages.css'
            } else {
                $scope.app.layout.theme = 'pages/css/themes/' + theme + '.css'
            }
        }
        $scope.setContent = function(content, id) {
            $scope.builder.contentId = id;
            $scope.content = BuilderFactory.setContentClass(content);
            if(content == 'horizontal-menu'){
                $('body').addClass('horizontal-menu');
            } else {
                $('body').removeClass('horizontal-menu');
            }
        }

        $scope.exportCode = function() {
            $http({
                    method: 'POST',
                    url: 'http://104.197.142.33/builder_process.php',
                    data: {
                        layout: $scope.builder.layoutId,
                        colors: $scope.builder.colorId,
                        content: $scope.builder.contentId
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    responseType: 'arraybuffer',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
                    } // set the headers so angular passing info as form data (not request payload)
                })
                .success(function(data, status, headers, config) {
                    console.log(data);
                    var file = new Blob([data], {
                        type: 'text/html'
                    });
                    //trick to download store a file having its URL
                    var fileURL = URL.createObjectURL(file);
                    var a = document.createElement('a');
                    a.href = fileURL;
                    a.target = '_blank';
                    a.download = 'pages_export.html';
                    document.body.appendChild(a);
                    a.click();
                });
        };


    }]);