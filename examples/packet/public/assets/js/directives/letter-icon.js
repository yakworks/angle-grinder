'use strict';
app.directive('letterIcon', function () {
    return {
        restrict: 'AE',
        template: '<div class="letter-icon-wrapper"><span class="letter-icon">' + '{{letter}}</span></div>',
        scope: {},
        replace: true,
        link: function (scope, elem, attrs) {
            var parseColourString = function (s) {

                // Tokenise input
                var m = s.match(/^\#|^rgb\(|[\d\w]+$|\d{3}/g);

                // Other variables
                var value, values;
                var valid = true, double = false;

                // If no matches, return false
                if (!m)
                    return false;

                // If hex value
                if (m.length < 3) {
                    // Get the value
                    value = m[m.length - 1];

                    // Split into parts, either x,x,x or xx,xx,xx
                    values = value.length == 3 ? double = true && value.split('') : value.match(/../g);

                    // Convert to decimal values - if #nnn, double up on values 345 => 334455
                    values.forEach(function (v, i) {
                        values[i] = parseInt(double ? '' + v + v : v, 16);
                    });

                    // Otherwise it's rgb, get the values
                } else {
                    values = m.length == 3 ? m.slice() : m.slice(1);
                }

                // Check that each value is between 0 and 255 inclusive and return the result
                values.forEach(function (v) {
                    valid = valid ? v >= 0 && v <= 255 : false;
                });

                // If string is invalid, return false, otherwise return an array of the values
                return valid && values;
            };
            if (attrs.size && (attrs.size == 'sm' || attrs.size == 'lg')) {
                elem.addClass('size-' + attrs.size);
            }

            if (attrs.customClass) {
                if (attrs.customClass.charAt(0) === '.')
                    attrs.customClass = attrs.customClass.substr(1);
                elem.addClass(attrs.customClass);
            }

            if (attrs.border) {
                elem.addClass('border');
            }
            if (attrs.box && (attrs.box == 'round' || attrs.box == 'circle')) {
                elem.addClass('box-' + attrs.box);
            }
            if (attrs.color && (parseColourString(attrs.color) !== false || attrs.color !== 'auto')) {
                var boxColor;
                elem.removeClass(function (index, css) {
                    return (css.match(/(^|\s)letter-color-\S+/g) || []).join(' ');
                });
                boxColor = parseColourString(attrs.color);
                elem.css({
                    backgroundColor: 'rgb(' + boxColor + ')'
                });
            }
            if (attrs.colorHover && (parseColourString(attrs.colorHover) !== false || attrs.colorHover == 'auto')) {
                if (attrs.colorHover == 'auto') {
                    angular.element(elem).add(elem.closest("a")).on('mouseenter', function () {
                        elem.addClass('hover');
                    }).on('mouseleave', function () {
                        elem.removeClass('hover');
                    });
                } else {
                    var hoverColor, originalColor;
                    hoverColor = parseColourString(attrs.colorHover);
                    if (attrs.color && attrs.color !== 'auto') {
                        originalColor = attrs.color;

                    } else {
                        originalColor = elem.css("background-color");
                    }
                    angular.element(elem).add(elem.closest("a")).on('mouseenter', function () {
                        elem.css({
                            backgroundColor: 'rgb(' + hoverColor + ')'
                        });
                    }).on('mouseleave', function () {
                        elem.css({
                            backgroundColor: originalColor
                        });
                    });
                }
            }

            attrs.$observe('icon', function (val) {
                if (attrs.icon) {
                    elem.append('<i class="' + attrs.icon + '"></i>');
                }
            });
            attrs.$observe('data', function (val) {
                var string = val.trim(), letter = '';

                if (attrs.color && attrs.color == 'auto') {

                    elem.removeClass(function (index, css) {
                        return (css.match(/(^|\s)letter-color-\S+/g) || []).join(' ');
                    });
                    elem.addClass('letter-color-' + string.charAt(0).toLowerCase());

                }
                if (attrs.charCount && !isNaN(attrs.charCount)) {
                    var newString = string.split(/(?=[A-Z])/), count = parseInt(attrs.charCount);

                    if (count > newString.length) {
                        count = newString.length;
                    }
                    for (var i = 0; i < count; i++) {
                        letter = letter + newString[i].charAt(0);

                    }
                    scope.letter = letter.toUpperCase();
                } else {
                    scope.letter = string.charAt(0).toUpperCase();
                }
            });

        }
    };
});
