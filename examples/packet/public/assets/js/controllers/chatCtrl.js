'use strict';
/**
 * controller for Messages
 */
app.controller('ChatCtrl', ["$scope", function ($scope) {

    $scope.selfIdUser = 50223456;
    $scope.otherIdUser = 50223457;
    $scope.setOtherId = function (value) {

        $scope.otherIdUser = value;
    };
    var exampleDate = new Date().setTime(new Date().getTime() - 240000 * 60);

    $scope.chat = [{
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": exampleDate,
        "content": "Hi, Nicole",
        "idUser": 50223456,
        "idOther": 50223457
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 1000 * 60),
        "content": "How are you?",
        "idUser": 50223456,
        "idOther": 50223457
    }, {
        "user": "Nicole Bell",
        "avatar": "assets/images/avatar-2.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 1000 * 60),
        "content": "Hi, i am good",
        "idUser": 50223457,
        "idOther": 50223456
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 1000 * 60),
        "content": "Glad to see you ;)",
        "idUser": 50223456,
        "idOther": 50223457
    }, {
        "user": "Nicole Bell",
        "avatar": "assets/images/avatar-2.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 65000 * 60),
        "content": "What do you think about my new Dashboard?",
        "idUser": 50223457,
        "idOther": 50223456
    }, {
        "user": "Nicole Bell",
        "avatar": "assets/images/avatar-2.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 128000 * 60),
        "content": "Alo...",
        "idUser": 50223457,
        "idOther": 50223456
    }, {
        "user": "Nicole Bell",
        "avatar": "assets/images/avatar-2.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 128000 * 60),
        "content": "Are you there?",
        "idUser": 50223457,
        "idOther": 50223456
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 1000 * 60),
        "content": "Hi, i am here",
        "idUser": 50223456,
        "idOther": 50223457
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 1000 * 60),
        "content": "Your Dashboard is great",
        "idUser": 50223456,
        "idOther": 50223457
    }, {
        "user": "Nicole Bell",
        "avatar": "assets/images/avatar-2.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 230000 * 60),
        "content": "How does the binding and digesting work in AngularJS?, Peter? ",
        "idUser": 50223457,
        "idOther": 50223456
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 238000 * 60),
        "content": "oh that's your question?",
        "idUser": 50223456,
        "idOther": 50223457
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 238000 * 60),
        "content": "little reduntant, no?",
        "idUser": 50223456,
        "idOther": 50223457
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 238000 * 60),
        "content": "literally we get the question daily",
        "idUser": 50223456,
        "idOther": 50223457
    }, {
        "user": "Nicole Bell",
        "avatar": "assets/images/avatar-2.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 238000 * 60),
        "content": "I know. I, however, am not a nerd, and want to know",
        "idUser": 50223457,
        "idOther": 50223456
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Nicole Bell",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 238000 * 60),
        "content": "for this type of question, wouldn't it be better to try Google?",
        "idUser": 50223456,
        "idOther": 50223457
    }, {
        "user": "Nicole Bell",
        "avatar": "assets/images/avatar-2.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 238000 * 60),
        "content": "Lucky for us :)",
        "idUser": 50223457,
        "idOther": 50223456
    }, {
        "user": "Steven Thompson",
        "avatar": "assets/images/avatar-3.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 1000 * 60),
        "content": "Hi, Peter. I'd like to start using AngularJS.",
        "idUser": 50223458,
        "idOther": 50223456
    }, {
        "user": "Steven Thompson",
        "avatar": "assets/images/avatar-3.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 1000 * 60),
        "content": "There are many differences from jquery?",
        "idUser": 50223458,
        "idOther": 50223456
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Steven Thompson",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 5000 * 60),
        "content": "Enough!",
        "idUser": 50223456,
        "idOther": 50223458
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Steven Thompson",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 5000 * 60),
        "content": "In jQuery, you design a page, and then you make it dynamic...",
        "idUser": 50223456,
        "idOther": 50223458
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Steven Thompson",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 5000 * 60),
        "content": "but in AngularJS, you must start from the ground up with your architecture in mind",
        "idUser": 50223456,
        "idOther": 50223458
    }, {
        "user": "Steven Thompson",
        "avatar": "assets/images/avatar-3.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 7000 * 60),
        "content": "ok!",
        "idUser": 50223458,
        "idOther": 50223456
    }, {
        "user": "Steven Thompson",
        "avatar": "assets/images/avatar-3.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 7000 * 60),
        "content": "could you give me some lessons?",
        "idUser": 50223458,
        "idOther": 50223456
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Steven Thompson",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 7000 * 60),
        "content": "sure!",
        "idUser": 50223456,
        "idOther": 50223458
    }, {
        "user": "Steven Thompson",
        "avatar": "assets/images/avatar-3.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 7000 * 60),
        "content": "Thanks a lot!",
        "idUser": 50223458,
        "idOther": 50223456
    }, {
        "user": "Ella Patterson",
        "avatar": "assets/images/avatar-4.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 16700 * 60),
        "content": "Peter what can you tell me about the new marketing project?",
        "idUser": 50223459,
        "idOther": 50223456
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Steven Thompson",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 18000 * 60),
        "content": "Well, there is a lot to say. Are you free tomorrow?",
        "idUser": 50223456,
        "idOther": 50223459
    }, {
        "user": "Ella Patterson",
        "avatar": "assets/images/avatar-4.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 19700 * 60),
        "content": "Yes",
        "idUser": 50223459,
        "idOther": 50223456
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Steven Thompson",
        "date": new Date(exampleDate).setTime(new Date(exampleDate).getTime() + 19700 * 60),
        "content": "OK, we will have a meeting tomorrow afternoon",
        "idUser": 50223456,
        "idOther": 50223459
    }, {
        "user": "Kenneth Ross",
        "avatar": "assets/images/avatar-5.jpg",
        "to": "Peter Clark",
        "date": new Date(exampleDate).setTime(new Date(exampleDate)),
        "content": "Mr. Clark, congratulations for your new project",
        "idUser": 50223460,
        "idOther": 50223456
    }, {
        "user": "Peter Clark",
        "avatar": "assets/images/avatar-1.jpg",
        "to": "Kenneth Ross",
        "date": new Date(exampleDate).setTime(new Date(exampleDate)),
        "content": "Thank You very much Mr. Ross",
        "idUser": 50223456,
        "idOther": 50223460
    }];

    $scope.sendMessage = function () {
        var newMessage = {
            "user": "Peter Clark",
            "avatar": "assets/images/avatar-1.jpg",
            "date": new Date(),
            "content": $scope.chatMessage,
            "idUser": $scope.selfIdUser,
            "idOther": $scope.otherIdUser
        };
        $scope.chat.push(newMessage);
        $scope.chatMessage = '';

    };
}]);
