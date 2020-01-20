'use strict';
angular.module("config-xeditable", ['xeditable'])
.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});