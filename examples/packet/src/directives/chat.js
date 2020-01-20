(function () {
    'use strict';
    app.directive('clipChat', ClipChat);

    function ClipChat() {
        var chatTemplate = '<div>' + '<ol class="discussion">' + '<li class="messages-date" ng-repeat-start="message in newChatArray()" ng-if="displayDate($index) || $index == 0">{{message.date | amDateFormat:\'dddd, MMM D, h:mm a\'}}</li>' + '<li ng-class="{\'self\' : message.idUser == idSelf, \'other\' : message.idUser !== idSelf, \'nextSame\': newChatArray()[$index+1].idUser == message.idUser && !nextDate($index)}" ng-repeat-end>' + '<div class="message">' + '<div class="message-name" ng-if="newChatArray()[$index-1].idUser !== message.idUser || displayDate($index)">{{  message.user }}</div>' + '<div class="message-text">{{ message.content }}</div>' + '<div class="message-avatar"><img ng-src="{{ message.avatar }}" alt=""></div>' + '</div>' + '</li>' + '</ol>';
        var directive = {
            restrict: 'EA',
            template: chatTemplate,
            replace: true,
            scope: {
                messages: "=",
                idSelf: "=",
                idOther: "="
            },
            link: function ($scope, $element, $attrs) {
                $scope.newChatArray = function () {
                    var filtered = [];
                    for (var i = 0; i < $scope.messages.length; i++) {
                        var item = $scope.messages[i];
                        if ((item.idUser == $scope.idSelf || item.idOther == $scope.idSelf) && (item.idUser == $scope.idOther || item.idOther == $scope.idOther)) {
                            filtered.push(item);
                        }
                    }

                    return filtered;
                };

                $scope.displayDate = function (i) {
                    var prevDate, nextDate, diffMs, diffMins;
                    var messages = $scope.newChatArray();
                    if (i === 0) {


                        if (messages.length > 1) {
                            prevDate = new Date(messages[i].date);
                            nextDate = new Date(messages[i + 1].date);
                            diffMs = (nextDate - prevDate);
                            diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                        } else {
                            return true
                        }
                    } else {
                        prevDate = new Date(messages[i - 1].date);
                        nextDate = new Date(messages[i].date);
                        diffMs = (nextDate - prevDate);
                        diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

                    }
                    if (diffMins > 1) {
                        return true;
                    } else {
                        return false;
                    }
                };
                $scope.nextDate = function (i) {
                    var prevDate, nextDate, diffMs, diffMins;
                    var messages = $scope.newChatArray();
                    if (i < messages.length - 1) {

                        prevDate = new Date(messages[i].date);
                        nextDate = new Date(messages[i + 1].date);
                        diffMs = (nextDate - prevDate);
                        diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

                    }
                    if (diffMins > 1) {
                        return true;
                    } else {
                        return false;
                    }
                };

            }
        };

        return directive;
    }
    app.directive('chatSubmit', SubmitChat);

    function SubmitChat() {
        var submitTemplate = '<form ng-submit="submitChat()">' + '<div class="message-bar">' + '<div class="message-inner">' + '<a href="#" class="link icon-only"><i class="fa fa-camera"></i></a>' + '<div class="message-area"><input placeholder="Message" ng-model="ngModel" /></div>' + '<a translate="offsidebar.chat.SEND" href="#" class="link ng-scope" ng-click="submitChat()">Send</a>' + '</div>' + '</div>' + '</form>' + '</div>';
        var directive = {
            restrict: 'EA',
            template: submitTemplate,
            replace: true,
            scope: {
                submitFunction: "=",
                ngModel: "="
            },
            link: function ($scope, $element, $attrs) {

                $scope.submitChat = function () {
                    $scope.submitFunction();


                    if (typeof $attrs.scrollElement !== "undefined") {
                        var scrlEl = angular.element($attrs.scrollElement);
                        var lastElement = scrlEl.find('.discussion > li:last');
                        if (lastElement.length)
                            scrlEl.scrollToElementAnimated(lastElement);
                    }

                };
            }
        };

        return directive;
    }


})();
