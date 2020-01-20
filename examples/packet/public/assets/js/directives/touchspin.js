'use strict';
app.directive('touchspin', function () {
    return {
        restrict: 'EA',
        link: function (scope, elem, attr) {
            var tsOptions = [
				'initval',
				'min',
				'max',
				'step',
				'forcestepdivisibility',
				'decimals',
				'stepinterval',
				'stepintervaldelay',
				'verticalbuttons',
				'verticalupclass',
				'verticaldownclass',
				'prefix',
				'postfix',
				'prefix_extraclass',
				'postfix_extraclass',
				'booster',
				'boostat',
				'maxboostedstep',
				'mousewheel',
				'buttondown_class',
				'buttonup_class'
            ];
            var options = {};
            for (var i = 0, l = tsOptions.length; i < l; i++) {
                var opt = tsOptions[i];
                if (attr[opt] !== undefined) {
                    options[opt] = attr[opt];
                }
            }
            elem.TouchSpin(options);
        }
    };
});