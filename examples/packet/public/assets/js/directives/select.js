'use strict';
/**
 * Create a custom CSS3 Select Elements.
 * You must use it as a class.
 * Combined with the class .cs-skin-slide it creates a slide <select>
 */
app.factory('SelectFx', ["$http",
function ($http) {
    function hasParent(e, p) {
        if (!e)
            return false;
        var el = e.target || e.srcElement || e || false;
        while (el && el != p) {
            el = el.parentNode || false;
        }
        return (el !== false);
    };

    /**
	 * extend obj function
	 */
    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    /**
	 * SelectFx function
	 */
    function SelectFx(el, options) {
        this.el = el[0];
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

    /**
	 * SelectFx options
	 */
    SelectFx.prototype.options = {
        // if true all the links will open in a new tab.
        // if we want to be redirected when we click an option, we need to define a data-link attr on the option of the native select element
        newTab: true,
        // when opening the select element, the default placeholder (if any) is shown
        stickyPlaceholder: true,
        // callback when changing the value
        onChange: function (val) {
            return false;
        }
    };

    /**
	 * init function
	 * initialize and cache some vars
	 */
    SelectFx.prototype._init = function () {

        var selectDisabled = false;
        var createSelect = true;
        if (this.el.hasAttribute("disabled")) {
            this.el.className = this.el.className + " disabled";
            selectDisabled = true;
        };

        if (this._styleExist(this.el.previousSibling)) {
            createSelect = false;
        }
        // check if we are using a placeholder for the native select box
        // we assume the placeholder is disabled and selected by default
        var selectedOpt = this.el.querySelectorAll('option[selected]')[this.el.querySelectorAll('option[selected]').length - 1];


        this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;

        // get selected option (either the first option with attr selected or just the first option)
        this.selectedOpt = selectedOpt || this.el.querySelector('option');

        // create structure
        this._createSelectEl();

        // all options
        this.selOpts = [].slice.call(this.selEl.querySelectorAll('li[data-option]'));

        // total options
        this.selOptsCount = this.selOpts.length;

        // current index
        this.current = this.selOpts.indexOf(this.selEl.querySelector('li.cs-selected')) || -1;

        // placeholder elem
        this.selPlaceholder = this.selEl.querySelector('span.cs-placeholder');

        if (!selectDisabled) {
            // init events
            this._initEvents(createSelect);
        }

    };
    /**
	 * creates the structure for the select element
	 */
    SelectFx.prototype._createSelectEl = function () {

        var self = this, options = '', createOptionHTML = function (el) {
            var optclass = '', classes = '', link = '';

            if (el.getAttribute('selected')) {

                classes += 'cs-selected ';

            }
            // extra classes
            if (el.getAttribute('data-class')) {
                classes += el.getAttribute('data-class');
            }
            // link options
            if (el.getAttribute('data-link')) {
                link = 'data-link=' + el.getAttribute('data-link');
            }

            if (classes !== '') {
                optclass = 'class="' + classes + '" ';
            }

            return '<li ' + optclass + link + ' data-option data-value="' + el.value + '"><span>' + el.textContent + '</span></li>';
        };

        [].slice.call(this.el.children).forEach(function (el) {
            if (el.disabled) {
                return;
            }

            var tag = el.tagName.toLowerCase();

            if (tag === 'option') {
                options += createOptionHTML(el);
            } else if (tag === 'optgroup') {
                options += '<li class="cs-optgroup"><span>' + el.label + '</span><ul>';
                [].slice.call(el.children).forEach(function (opt) {
                    options += createOptionHTML(opt);
                });
                options += '</ul></li>';
            }
        });

        if (this._styleExist(this.el.previousSibling)) {
            this.selEl = this.el.parentNode;
            this.selEl.tabIndex = this.el.tabIndex;

            this.el.previousSibling.innerHTML = '<ul>' + options + '</ul>';

            return;
        } else {

            var opts_el = '<div class="cs-options"><ul>' + options + '</ul></div>';
            this.selEl = document.createElement('div');
            this.selEl.className = this.el.className;
            this.selEl.tabIndex = this.el.tabIndex;
            this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
            this.el.parentNode.appendChild(this.selEl);
            this.selEl.appendChild(this.el);
        }

    };
    /**
	 * initialize the events
	 */
    SelectFx.prototype._initEvents = function (a) {

        var self = this;
        if (a) {
            // open/close select
            this.selPlaceholder.addEventListener('click', function () {
                self._toggleSelect();
            });
        }
        // clicking the options
        this.selOpts.forEach(function (opt, idx) {
            opt.addEventListener('click', function () {
                self.current = idx;
                self._changeOption();
                // close select elem
                self._toggleSelect();
            });
        });

        // close the select element if the target itÂ´s not the select element or one of its descendants..
        document.addEventListener('click', function (ev) {
            var target = ev.target;
            if (self._isOpen() && target !== self.selEl && !hasParent(target, self.selEl)) {
                self._toggleSelect();
            }
        });

        // keyboard navigation events
        this.selEl.addEventListener('keydown', function (ev) {
            var keyCode = ev.keyCode || ev.which;

            switch (keyCode) {
                // up key
                case 38:
                    ev.preventDefault();
                    self._navigateOpts('prev');
                    break;
                    // down key
                case 40:
                    ev.preventDefault();
                    self._navigateOpts('next');
                    break;
                    // space key
                case 32:
                    ev.preventDefault();
                    if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
                        self._changeOption();
                    }
                    self._toggleSelect();
                    break;
                    // enter key
                case 13:
                    ev.preventDefault();
                    if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
                        self._changeOption();
                        self._toggleSelect();
                    }
                    break;
                    // esc key
                case 27:
                    ev.preventDefault();
                    if (self._isOpen()) {
                        self._toggleSelect();
                    }
                    break;
            }
        });
    };
    /**
	 * navigate with up/dpwn keys
	 */
    SelectFx.prototype._navigateOpts = function (dir) {
        if (!this._isOpen()) {
            this._toggleSelect();
        }

        var tmpcurrent = typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent : this.current;

        if (dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1) {
            // save pre selected current - if we click on option, or press enter, or press space this is going to be the index of the current option
            this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
            // remove focus class if any..
            this._removeFocus();
            // add class focus - track which option we are navigating
            classie.add(this.selOpts[this.preSelCurrent], 'cs-focus');
        }
    };
    /**
	 * open/close select
	 * when opened show the default placeholder if any
	 */
    SelectFx.prototype._toggleSelect = function () {
        // remove focus class if any..
        this._removeFocus();

        if (this._isOpen()) {
            if (this.current !== -1) {
                // update placeholder text
                this.selPlaceholder.textContent = this.selOpts[this.current].textContent;
            }
            classie.remove(this.selEl, 'cs-active');
        } else {
            if (this.hasDefaultPlaceholder && this.options.stickyPlaceholder) {
                // everytime we open we wanna see the default placeholder text
                this.selPlaceholder.textContent = this.selectedOpt.textContent;
            }
            classie.add(this.selEl, 'cs-active');
        }
    };
    /**
	 * detect if .cs-options wrapper is active for each select
	 */
    SelectFx.prototype._styleExist = function (e) {
        return (' ' + e.className + ' ').indexOf(' cs-options ') > -1;
    };
    /**
	 * change option - the new value is set
	 */
    SelectFx.prototype._changeOption = function () {

        // if pre selected current (if we navigate with the keyboard)...
        if (typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1) {
            this.current = this.preSelCurrent;
            this.preSelCurrent = -1;
        }

        // current option
        var opt = this.selOpts[this.current];

        // update current selected value
        this.selPlaceholder.textContent = opt.textContent;

        // change native select elementÂ´s value
        this.el.value = opt.getAttribute('data-value');
        var event = new Event('change');
        this.el.dispatchEvent(event);

        // remove class cs-selected from old selected option and add it to current selected option
        var oldOpt = this.selEl.querySelector('li.cs-selected');
        if (oldOpt) {
            classie.remove(oldOpt, 'cs-selected');
        }
        classie.add(opt, 'cs-selected');

        // if thereÂ´s a link defined
        if (opt.getAttribute('data-link')) {
            // open in new tab?
            if (this.options.newTab) {
                window.open(opt.getAttribute('data-link'), '_blank');
            } else {
                window.location = opt.getAttribute('data-link');
            }
        }

        // callback
        this.options.onChange(this.el.value);
    };
    /**
	 * returns true if select element is opened
	 */
    SelectFx.prototype._isOpen = function (opt) {
        return classie.has(this.selEl, 'cs-active');
    };
    /**
	 * removes the focus class from the option
	 */
    SelectFx.prototype._removeFocus = function (opt) {
        var focusEl = this.selEl.querySelector('li.cs-focus')
        if (focusEl) {
            classie.remove(focusEl, 'cs-focus');
        }
    };

    return SelectFx;
}]);

app.directive('csSelect', ["SelectFx", "$timeout",
function (SelectFx, $timeout) {
    return {
        restrict: 'AC',
        link: function ($scope, $element, $attributes) {

            $scope.$watch(function () {
                return $element.find('option').length;
            }, function (newValue, oldValue) {
                if (newValue !== oldValue) {

                    new SelectFx($element);
                }
            });
            $timeout(function () { new SelectFx($element); });


        }
    };
}]);
