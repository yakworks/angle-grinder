describe('uib-dropdown', function() {
  var $animate, $compile, $rootScope, $document, $templateCache, dropdownConfig, element, menu, $browser, $log;

  beforeEach(module('ngAnimateMock'));
  beforeEach(module('ui.bootstrap.dropdown'));

  beforeEach(inject(function(_$animate_, _$compile_, _$rootScope_, _$document_, _$templateCache_, uibDropdownConfig, _$browser_, _$log_) {
    $animate = _$animate_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $document = _$document_;
    $templateCache = _$templateCache_;
    dropdownConfig = uibDropdownConfig;
    $browser = _$browser_;
    $log = _$log_;
  }));

  afterEach(function() {
    element.remove();
  });

  var clickDropdownToggle = function(elm) {
    elm = elm || element;
    elm.find('button[uib-dropdown-toggle]').click();
  };

  var triggerKeyDown = function (element, keyCode) {
    var e = $.Event('keydown');
    spyOn(e, 'stopPropagation');
    e.stopPropagation.and.callThrough();
    e.which = keyCode;
    element.trigger(e);
    return e;
  };

  describe('basic', function() {
    function dropdown() {
      return $compile('<div uib-dropdown><button uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu><a href="#" class="dropdown-item">Hello</a></div></div>')($rootScope);
    }

    beforeEach(function() {
      element = dropdown();
      menu = element.find('.dropdown-menu');
    });

    it('should toggle on `a` click', function() {
      expect(menu).not.toHaveClass(dropdownConfig.openClass);
      clickDropdownToggle();
      expect(menu).toHaveClass(dropdownConfig.openClass);
      clickDropdownToggle();
      expect(menu).not.toHaveClass(dropdownConfig.openClass);
    });

    it('should toggle when an option is clicked', function() {
      $document.find('body').append(element);
      expect(menu).not.toHaveClass(dropdownConfig.openClass);
      clickDropdownToggle();
      expect(menu).toHaveClass(dropdownConfig.openClass);

      var optionEl = menu.find('a.dropdown-item').eq(0);
      optionEl.click();
      expect(menu).not.toHaveClass(dropdownConfig.openClass);
    });

    it('should close on document click', function() {
      clickDropdownToggle();
      expect(menu).toHaveClass(dropdownConfig.openClass);
      $document.click();
      expect(menu).not.toHaveClass(dropdownConfig.openClass);
    });

    it('should close on escape key & focus toggle element', function() {
      $document.find('body').append(element);
      clickDropdownToggle();
      var event = triggerKeyDown(menu, 27);
      expect(menu).not.toHaveClass(dropdownConfig.openClass);
      expect(element.find('button')).toHaveFocus();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should not close on backspace key', function() {
      clickDropdownToggle();
      triggerKeyDown(element, 8);
      expect(menu).toHaveClass(dropdownConfig.openClass);
    });

    it('should not close on right click', function() {
      clickDropdownToggle();
      menu.find('.dropdown-item').trigger({
        type: 'mousedown',
        which: 3
      });
      expect(menu).toHaveClass(dropdownConfig.openClass);
    });

    it('should only allow one dropdown to be open at once', function() {
      var elm1 = dropdown();
      var elm2 = dropdown();
      var menu1 = elm1.find('.dropdown-menu');
      var menu2 = elm2.find('.dropdown-menu');

      expect(menu1).not.toHaveClass(dropdownConfig.openClass);
      expect(menu2).not.toHaveClass(dropdownConfig.openClass);

      clickDropdownToggle(elm1);
      expect(menu1).toHaveClass(dropdownConfig.openClass);
      expect(menu2).not.toHaveClass(dropdownConfig.openClass);

      clickDropdownToggle(elm2);
      expect(menu1).not.toHaveClass(dropdownConfig.openClass);
      expect(menu2).toHaveClass(dropdownConfig.openClass);
    });

    it('should not toggle if the element has `disabled` class', function() {
      var elm = $compile('<div uib-dropdown><button class="disabled" uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu><a class="dropdown-item">Hello</a></div></div>')($rootScope);
      var menu1 = elm.find('.dropdown-menu');
      clickDropdownToggle( elm );
      expect(menu1).not.toHaveClass(dropdownConfig.openClass);
    });

    it('should not toggle if the element is disabled', function() {
      var elm = $compile('<div uib-dropdown><button disabled="disabled" uib-dropdown-toggle></button><div class="dropdown-menu"><a class="dropdown-item">Hello</a></div></div>')($rootScope);
      var menu1 = elm.find('.dropdown-menu');
      elm.find('button').click();
      expect(menu1).not.toHaveClass(dropdownConfig.openClass);
    });

    it('should not toggle if the element has `ng-disabled` as true', function() {
      $rootScope.isdisabled = true;
      var elm = $compile('<div uib-dropdown><button ng-disabled="isdisabled" uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu><a class="dropdown-item">Hello</a></div></div>')($rootScope);
      var menu1 = elm.find('.dropdown-menu');
      $rootScope.$digest();
      elm.find('button').click();
      expect(elm).not.toHaveClass(dropdownConfig.openClass);

      $rootScope.isdisabled = false;
      $rootScope.$digest();
      elm.find('button').click();
      expect(menu1).toHaveClass(dropdownConfig.openClass);
    });

    it('should unbind events on scope destroy', function() {
      var $scope = $rootScope.$new();
      var elm = $compile('<div uib-dropdown><button ng-disabled="isdisabled" uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu><a class="dropdown-item">Hello</a></div></div>')($scope);
      var menu1 = elm.find('.dropdown-menu');
      $scope.$digest();

      var buttonEl = elm.find('button');
      buttonEl.click();
      expect(menu1).toHaveClass(dropdownConfig.openClass);
      buttonEl.click();
      expect(menu1).not.toHaveClass(dropdownConfig.openClass);

      $scope.$destroy();
      buttonEl.click();
      expect(menu1).not.toHaveClass(dropdownConfig.openClass);
    });

    // issue 270
    it('executes other document click events normally', function() {
      var checkboxEl = $compile('<input type="checkbox" ng-click="clicked = true" />')($rootScope);
      $rootScope.$digest();

      expect(menu).not.toHaveClass(dropdownConfig.openClass);
      expect($rootScope.clicked).toBeFalsy();

      clickDropdownToggle();
      expect(menu).toHaveClass(dropdownConfig.openClass);
      expect($rootScope.clicked).toBeFalsy();

      checkboxEl.click();
      expect($rootScope.clicked).toBeTruthy();
    });

    // WAI-ARIA
    it('should aria markup to the `dropdown-toggle`', function() {
      var toggleEl = element.find('button');
      expect(toggleEl.attr('aria-haspopup')).toBe('true');
      expect(toggleEl.attr('aria-expanded')).toBe('false');

      clickDropdownToggle();
      expect(toggleEl.attr('aria-expanded')).toBe('true');
      clickDropdownToggle();
      expect(toggleEl.attr('aria-expanded')).toBe('false');
    });

    // pr/issue 3274
    it('should not raise $digest:inprog if dismissed during a digest cycle', function() {
      clickDropdownToggle();
      expect(menu).toHaveClass(dropdownConfig.openClass);

      $rootScope.$apply(function() {
        $document.click();
      });

      expect(menu).not.toHaveClass(dropdownConfig.openClass);
    });
  });

  describe('using dropdownMenuTemplate', function() {
    function dropdown() {
      $templateCache.put('custom.html', '<div class="uib-dropdown-menu"><a class="dropdown-item">Item 1</a></div>');

      return $compile('<div uib-dropdown><button uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu template-url="custom.html"></div></div>')($rootScope);
    }

    beforeEach(function() {
      element = dropdown();
    });

    it('should apply custom template for dropdown menu', function() {
      element.find('button').click();
      expect(element.find('div.uib-dropdown-menu').eq(0).find('a').eq(0).text()).toEqual('Item 1');
    });

    it('should clear ul when dropdown menu is closed', function() {
      element.find('button').click();
      expect(element.find('div.uib-dropdown-menu').eq(0).find('a').eq(0).text()).toEqual('Item 1');
      element.find('button').click();
      expect(element.find('div.uib-dropdown-menu').eq(0).find('a').length).toEqual(0);
    });
  });

  describe('using dropdown-append-to-body', function() {
    describe('with no value', function() {
      function dropdown() {
        return $compile('<li uib-dropdown dropdown-append-to-body><a href uib-dropdown-toggle></a><ul uib-dropdown-menu id="dropdown-menu"><li><a href>Hello On Body</a></li></ul></li>')($rootScope);
      }

      beforeEach(function() {
        element = dropdown();
        $document.find('body').append(element);
      });

      afterEach(function() {
        element.remove();
      });

      it('does not add the menu to the body', function() {
        expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
      });

      describe('when toggled open', function() {
        var toggle;
        beforeEach(function() {
          toggle = element.find('[uib-dropdown-toggle]');
          toggle.trigger('click');
        });
        it('adds the menu to the body', function() {
          expect($document.find('#dropdown-menu').parent()[0]).toBe($document.find('body')[0]);
        });

        describe('when toggled closed', function() {
          beforeEach(function() {
            toggle.trigger('click');
          });
          it('removes the menu from body', function() {
            expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
          });
        });

        describe('when closed by clicking on menu', function() {
          var menu;
          beforeEach(function() {
            menu = $document.find('#dropdown-menu a');
            menu.focus();
            menu.trigger('click');
          });
          xit('focuses the dropdown element on close', function() {
            expect(document.activeElement).toBe(toggle[0]);
          });
          it('removes the menu from body', function() {
            expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
          });
        });
        describe('when the dropdown is removed', function() {
          beforeEach(function() {
            element.remove();
            $rootScope.$digest();
          });
          it('removes the menu from body', function() {
            expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
          });
        });
      });
    });

    describe('with a value', function() {
      function dropdown() {
        return $compile('<li uib-dropdown dropdown-append-to-body="appendToBody"><a href uib-dropdown-toggle></a><ul uib-dropdown-menu id="dropdown-menu"><li><a href>Hello On Body</a></li></ul></li>')($rootScope);
      }
      describe('that is not false', function() {
        beforeEach(function() {
          $rootScope.appendToBody = 'sure';

          element = dropdown();
          $document.find('body').append(element);
        });

        afterEach(function() {
          element.remove();
        });
        it('does not add the menu to the body', function() {
          expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
        });

        describe('when toggled open', function() {
          var toggle;
          beforeEach(function() {
            toggle = element.find('[uib-dropdown-toggle]');
            toggle.trigger('click');
          });
          it('adds the menu to the body', function() {
            expect($document.find('#dropdown-menu').parent()[0]).toBe($document.find('body')[0]);
          });

          describe('when toggled closed', function() {
            beforeEach(function() {
              toggle.trigger('click');
            });
            it('removes the menu from body', function() {
              expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
            });
          });

          describe('when closed by clicking on menu', function() {
            var menu;
            beforeEach(function() {
              menu = $document.find('#dropdown-menu a');
              menu.focus();
              menu.trigger('click');
            });
            xit('focuses the dropdown element on close', function() {
              expect(document.activeElement).toBe(toggle[0]);
            });
            it('removes the menu from body', function() {
              expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
            });
          });
          describe('when the dropdown is removed', function() {
            beforeEach(function() {
              element.remove();
              $rootScope.$digest();
            });
            it('removes the menu from body', function() {
              expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
            });
          });
        });
      });

      describe('that is false', function() {
        beforeEach(function() {
          $rootScope.appendToBody = false;

          element = dropdown();
          $document.find('body').append(element);
        });

        afterEach(function() {
          element.remove();
        });

        it('does not add the menu to the body', function() {
          expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
        });

        describe('when toggled open', function() {
          var toggle;
          beforeEach(function() {
            toggle = element.find('[uib-dropdown-toggle]');
            toggle.trigger('click');
          });
          it('does not add the menu to the body', function() {
            expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
          });

          describe('when toggled closed', function() {
            beforeEach(function() {
              toggle.trigger('click');
            });
            it('does not remove the menu', function() {
              expect($document.find('#dropdown-menu').length).not.toEqual(0);
            });
          });

          describe('when closed by clicking on menu', function() {
            var menu;
            beforeEach(function() {
              menu = $document.find('#dropdown-menu a');
              menu.focus();
              menu.trigger('click');
            });
            xit('focuses the dropdown element on close', function() {
              expect(document.activeElement).toBe(toggle[0]);
            });
            it('does not removes the menu from body', function() {
              expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
            });
          });
          describe('when the dropdown is removed', function() {
            beforeEach(function() {
              element.remove();
              $rootScope.$digest();
            });
            it('removes the menu from body', function() {
              expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
            });
          });
        });
      });
    });
  });

  describe('using dropdown-append-to', function() {
    var initialPage, container;

    function dropdown() {
      return $compile('<li uib-dropdown dropdown-append-to="appendTo"><a href uib-dropdown-toggle></a><ul class="dropdown-menu" uib-dropdown-menu id="dropdown-menu"><li><a href>Hello On Container</a></li></ul></li>')($rootScope);
    }

    beforeEach(function() {
      $document.find('body').append(angular.element('<div id="dropdown-container"></div>'));

      $rootScope.appendTo = container = $document.find('#dropdown-container');

      element = dropdown();
      $document.find('body').append(element);
    });

    afterEach(function() {
      // Cleanup the extra elements we appended
      $document.find('#dropdown-container').remove();
    });

    it('does not add the menu to the container', function() {
      expect($document.find('#dropdown-menu').parent()[0]).not.toBe(container[0]);
    });
    it('does not add open class on container', function() {
      expect(container).not.toHaveClass('uib-dropdown-open');
    });

    describe('when toggled open', function() {
      var toggle;
      beforeEach(function() {
        toggle = element.find('[uib-dropdown-toggle]');
        toggle.trigger('click');
      });
      it('adds the menu to the container', function() {
        expect($document.find('#dropdown-menu').parent()[0]).toBe(container[0]);
      });
      it('adds open class on container', function() {
        expect(container).toHaveClass('uib-dropdown-open');
      });

      describe('when toggled closed', function() {
        beforeEach(function() {
          toggle.trigger('click');
        });
        it('removes the menu from the container', function() {
          expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
        });
        it('removes open class from container', function() {
          expect(container).not.toHaveClass('uib-dropdown-open');
        });
      });

      describe('when closed by clicking on menu', function() {
        var menu;
        beforeEach(function() {
          menu = $document.find('#dropdown-menu a');
          menu.focus();
          menu.trigger('click');
        });
        xit('focuses the dropdown element on close', function() {
          expect(document.activeElement).toBe(toggle[0]);
        });
        it('removes the menu from the container', function() {
          expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
        });
        it('removes open class from container', function() {
          expect(container).not.toHaveClass('uib-dropdown-open');
        });
      });
      describe('when the dropdown is removed', function() {
        beforeEach(function() {
          element.remove();
          $rootScope.$digest();
        });
        it('removes the menu from the container', function() {
          expect($document.find('#dropdown-menu').parent()[0]).not.toBe($document.find('body')[0]);
        });
      });
    });
  });

  describe('using dropdown-append-to with two dropdowns', function() {
    function dropdown() {
      return $compile('<div><div class="dropdown1" uib-dropdown dropdown-append-to="appendTo" on-toggle="log(1, open)"><a href uib-dropdown-toggle></a><ul class="dropdown-menu" uib-dropdown-menu id="dropdown-menu"><li><a href>Hello On Container</a></li></ul></div><div class="dropdown2" uib-dropdown dropdown-append-to="appendTo" on-toggle="log(2, open)"><a href uib-dropdown-toggle></a><ul class="dropdown-menu" uib-dropdown-menu id="dropdown-menu"><li><a href>Hello On Container</a></li></ul></div></div>')($rootScope);
    }

    beforeEach(function() {
      $document.find('body').append(angular.element('<div id="dropdown-container"></div>'));

      $rootScope.appendTo = $document.find('#dropdown-container');
      $rootScope.log = jasmine.createSpy('log');

      element = dropdown();
      $document.find('body').append(element);
    });

    afterEach(function() {
      // Cleanup the extra elements we appended
      $document.find('#dropdown-container').remove();
    });

    it('should keep the class when toggling from one dropdown to another with the same container', function() {
      var container = $document.find('#dropdown-container');

      expect(container).not.toHaveClass('uib-dropdown-open');
      element.find('.dropdown1 [uib-dropdown-toggle]').click();
      expect(container).toHaveClass('uib-dropdown-open');
      element.find('.dropdown2 [uib-dropdown-toggle]').click();
      expect(container).toHaveClass('uib-dropdown-open');
    });
  });

  describe('using is-open', function() {
    describe('with uib-dropdown-toggle', function() {
      beforeEach(function() {
        $rootScope.isopen = true;
        element = $compile('<div uib-dropdown is-open="isopen"><button uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu><a class="dropdown-item">Hello</a></div></div>')($rootScope);
        menu = element.find('.dropdown-menu');
        $rootScope.$digest();
      });

      it('should be open initially', function() {
        expect(menu).toHaveClass(dropdownConfig.openClass);
      });

      it('should change `is-open` binding when toggles', function() {
        clickDropdownToggle();
        expect($rootScope.isopen).toBe(false);
      });

      it('should toggle when `is-open` changes', function() {
        $rootScope.isopen = false;
        $rootScope.$digest();
        expect(menu).not.toHaveClass(dropdownConfig.openClass);
      });

      it('focus toggle element when opening', function() {
        $document.find('body').append(element);
        clickDropdownToggle();
        $rootScope.isopen = false;
        $rootScope.$digest();
        expect(element.find('button')).not.toHaveFocus();
        $rootScope.isopen = true;
        $rootScope.$digest();
        expect(element.find('button')).toHaveFocus();
      });
    });

    describe('without uib-dropdown-toggle', function() {
      beforeEach(function() {
        $rootScope.isopen = true;
        element = $compile('<div uib-dropdown is-open="isopen"><div class="dropdown-menu" uib-dropdown-menu><a class="dropdown-item">Hello</a></div></div>')($rootScope);
        menu = element.find('.dropdown-menu');
        $rootScope.$digest();
      });

      it('should be open initially', function() {
        expect(menu).toHaveClass(dropdownConfig.openClass);
      });

      it('should toggle when `is-open` changes', function() {
        $rootScope.isopen = false;
        $rootScope.$digest();
        expect(menu).not.toHaveClass(dropdownConfig.openClass);
      });
    });
  });

  describe('using on-toggle', function() {
    describe('with is-open to false', function() {
      beforeEach(function() {
        $rootScope.toggleHandler = jasmine.createSpy('toggleHandler');
        $rootScope.isopen = false;
        element = $compile('<div uib-dropdown on-toggle="toggleHandler(open)" is-open="isopen"><button uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu><a class="dropdown-item">Hello</a></div></div>')($rootScope);
        menu = element.find('.dropdown-menu');
        $rootScope.$digest();
      });

      it('should not have been called initially', function() {
        expect($rootScope.toggleHandler).not.toHaveBeenCalled();
      });

      it('should call it correctly when toggles', function() {
        $rootScope.isopen = true;
        $rootScope.$digest();

        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(true);

        clickDropdownToggle();
        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(false);
      });
    });

    describe('with is-open to true', function() {
      beforeEach(function() {
        $rootScope.toggleHandler = jasmine.createSpy('toggleHandler');
        $rootScope.isopen = true;
        element = $compile('<div uib-dropdown on-toggle="toggleHandler(open)" is-open="isopen"><button uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu><a class="dropdown-item">Hello</a></div></div>')($rootScope);
        $rootScope.$digest();
      });

      it('should not have been called initially', function() {
        expect($rootScope.toggleHandler).not.toHaveBeenCalled();
      });

      it('should call it correctly when toggles', function() {
        $rootScope.isopen = false;
        $rootScope.$digest();

        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(false);

        $rootScope.isopen = true;
        $rootScope.$digest();

        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(true);
      });
    });

    describe('without is-open', function() {
      beforeEach(function() {
        $rootScope.toggleHandler = jasmine.createSpy('toggleHandler');
        element = $compile('<div uib-dropdown on-toggle="toggleHandler(open)"><button uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu><a class="dropdown-item">Hello</a></div></div>')($rootScope);
        $rootScope.$digest();
      });

      it('should not have been called initially', function() {
        expect($rootScope.toggleHandler).not.toHaveBeenCalled();
      });

      it('should call it when clicked', function() {
        clickDropdownToggle();

        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(true);

        clickDropdownToggle();

        $animate.flush();
        $rootScope.$digest();
        expect($rootScope.toggleHandler).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('using auto-close', function() {
    function dropdown(autoClose) {
      return $compile('<div uib-dropdown ' +
        (autoClose === undefined ? '' : 'auto-close="' + autoClose + '"') +
        '><button uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu><a href>Hello</a></div></div>')($rootScope);
    }

    describe('always', function() {
      it('should close on document click if no auto-close is specified', function() {
        element = dropdown();
        menu = element.find('.dropdown-menu');
        clickDropdownToggle();
        expect(menu).toHaveClass(dropdownConfig.openClass);
        $document.click();
        expect(menu).not.toHaveClass(dropdownConfig.openClass);
      });

      it('should close on document click if empty auto-close is specified', function() {
        element = dropdown('');
        menu = element.find('.dropdown-menu');
        clickDropdownToggle();
        expect(menu).toHaveClass(dropdownConfig.openClass);
        $document.click();
        expect(menu).not.toHaveClass(dropdownConfig.openClass);
      });
    });

    describe('disabled', function() {
      it('auto-close="disabled"', function() {
        element = dropdown('disabled');
        menu = element.find('.dropdown-menu');
        clickDropdownToggle();
        expect(menu).toHaveClass(dropdownConfig.openClass);
        $document.click();
        expect(menu).toHaveClass(dropdownConfig.openClass);
      });

      it('control with is-open', function() {
        $rootScope.isopen = true;
        element = $compile('<div uib-dropdown is-open="isopen" auto-close="disabled"><button uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu><a class="dropdown-item">Hello</a></div></div>')($rootScope);
        menu = element.find('.dropdown-menu');
        $rootScope.$digest();

        expect(menu).toHaveClass(dropdownConfig.openClass);
        //should remain open
        $document.click();
        expect(menu).toHaveClass(dropdownConfig.openClass);
        //now should close
        $rootScope.isopen = false;
        $rootScope.$digest();
        expect(menu).not.toHaveClass(dropdownConfig.openClass);
      });

      it('should close anyway if toggle is clicked', function() {
        element = dropdown('disabled');
        menu = element.find('.dropdown-menu');
        clickDropdownToggle();
        expect(menu).toHaveClass(dropdownConfig.openClass);
        clickDropdownToggle();
        expect(menu).not.toHaveClass(dropdownConfig.openClass);
      });

      it('should close anyway if esc is pressed', function() {
        element = dropdown('disabled');
        var dropdownMenu = element.find('[uib-dropdown-menu]');
        $document.find('body').append(element);
        clickDropdownToggle();
        triggerKeyDown(dropdownMenu, 27);
        expect(dropdownMenu).not.toHaveClass(dropdownConfig.openClass);
        expect(element.find('button')).toHaveFocus();
      });

      it('should close anyway if another dropdown is opened', function() {
        var elm1 = dropdown('disabled');
        var elm2 = dropdown();
        var menu1 = elm1.find('.dropdown-menu');
        var menu2 = elm2.find('.dropdown-menu');
        expect(menu1).not.toHaveClass(dropdownConfig.openClass);
        expect(menu2).not.toHaveClass(dropdownConfig.openClass);
        clickDropdownToggle(elm1);
        expect(menu1).toHaveClass(dropdownConfig.openClass);
        expect(menu2).not.toHaveClass(dropdownConfig.openClass);
        clickDropdownToggle(elm2);
        expect(menu1).not.toHaveClass(dropdownConfig.openClass);
        expect(menu2).toHaveClass(dropdownConfig.openClass);
      });
    });

    describe('outsideClick', function() {
      it('should close only on a click outside of the dropdown menu', function() {
        element = dropdown('outsideClick');
        menu = element.find('.dropdown-menu');
        clickDropdownToggle();
        expect(menu).toHaveClass(dropdownConfig.openClass);
        menu.find('a.dropdown-item').click();
        expect(menu).toHaveClass(dropdownConfig.openClass);
        $document.click();
        expect(menu).not.toHaveClass(dropdownConfig.openClass);
      });

      //FIXME: This doesn't seem to be working, but I'm not sure if it's the test, or the functionality...
      xit('should work with dropdown-append-to-body', function() {
        element = $compile('<div uib-dropdown dropdown-append-to-body auto-close="outsideClick"><button uib-dropdown-toggle></button><div class="dropdown-menu" uib-dropdown-menu id="dropdown-menu"><a class="dropdown-item">Hello On Body</a></div></div>')($rootScope);
        clickDropdownToggle();
        var dropdownMenu = $document.find('#dropdown-menu');
        expect(dropdownMenu).toHaveClass(dropdownConfig.appendToOpenClass);
        dropdownMenu.find('a.dropdown-item').trigger('click');
        expect(dropdownMenu).toHaveClass(dropdownConfig.appendToOpenClass);
        $document.click();
        expect(dropdownMenu).not.toHaveClass(dropdownConfig.appendToOpenClass);
      });
    });
  });

  describe('using keyboard-nav', function() {
    function dropdown() {
      return $compile('<div uib-dropdown keyboard-nav><button uib-dropdown-toggle></button><div uib-dropdown-menu><a class="dropdown-item">Hello</a><a class="dropdown-item">Hello Again</a></div></div>')($rootScope);
    }
    function getFocusedElement() {
      return angular.element(document.activeElement);
    }
    beforeEach(function() {
      element = dropdown();
      menu = element.find('.dropdown-menu');
    });

    //FIXME: This doesn't seem to be working, but I'm not sure if it's the test, or the functionality...
    xit('should focus first list element when down arrow pressed', function() {
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(getFocusedElement(), 40);

      expect(menu).toHaveClass(dropdownConfig.openClass);
      var optionEl = menu.find('a.dropdown-item').eq(0);
      expect(optionEl).toHaveFocus();
    });

    it('should not focus first list element when down arrow pressed if closed', function() {
      $document.find('body').append(element);
      triggerKeyDown(getFocusedElement(), 40);

      expect(menu).not.toHaveClass(dropdownConfig.openClass);
      var focusEl = menu.find('a.dropdown-item').eq(0);
      expect(focusEl).not.toHaveFocus();
    });

    //FIXME: This doesn't seem to be working, but I'm not sure if it's the test, or the functionality...
    xit('should focus second list element when down arrow pressed twice', function() {
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(getFocusedElement(), 40);
      triggerKeyDown(getFocusedElement(), 40);

      expect(menu).toHaveClass(dropdownConfig.openClass);
      var focusEl = menu.find('a.dropdown-item').eq(1);
      expect(focusEl).toHaveFocus();
    });

    it('should not focus first list element when up arrow pressed after dropdown toggled', function() {
      $document.find('body').append(element);
      clickDropdownToggle();
      expect(menu).toHaveClass(dropdownConfig.openClass);

      triggerKeyDown(getFocusedElement(), 38);
      var focusEl = menu.find('a.dropdown-item').eq(0);
      expect(focusEl).not.toHaveFocus();
    });

    //FIXME: This doesn't seem to be working, but I'm not sure if it's the test, or the functionality...
    xit('should focus last list element when up arrow pressed after dropdown toggled', function() {
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(getFocusedElement(), 38);

      expect(menu).toHaveClass(dropdownConfig.openClass);
      var focusEl = menu.find('a.dropdown-item').eq(1);
      expect(focusEl).toHaveFocus();
    });

    it('should not change focus when other keys are pressed', function() {
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(getFocusedElement(), 37);

      expect(menu).toHaveClass(dropdownConfig.openClass);
      var focusEl = menu.find('a.dropdown-item');
      expect(focusEl[0]).not.toHaveFocus();
      expect(focusEl[1]).not.toHaveFocus();
    });

    //FIXME: This doesn't seem to be working, but I'm not sure if it's the test, or the functionality...
    xit('should focus first list element when down arrow pressed 2x and up pressed 1x', function() {
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(getFocusedElement(), 40);
      triggerKeyDown(getFocusedElement(), 40);

      triggerKeyDown(getFocusedElement(), 38);

      expect(menu).toHaveClass(dropdownConfig.openClass);
      var focusEl = menu.find('a.dropdown-item').eq(0);
      expect(focusEl).toHaveFocus();
    });

    //FIXME: This doesn't seem to be working, but I'm not sure if it's the test, or the functionality...
    xit('should stay focused on final list element if down pressed at list end', function() {
      $document.find('body').append(element);
      clickDropdownToggle();
      triggerKeyDown(getFocusedElement(), 40);
      triggerKeyDown(getFocusedElement(), 40);

      expect(menu).toHaveClass(dropdownConfig.openClass);
      var focusEl = menu.find('a.dropdown-item').eq(1);
      expect(focusEl).toHaveFocus();

      triggerKeyDown(element, 40);
      expect(focusEl).toHaveFocus();
    });

    //FIXME: This doesn't seem to be working, but I'm not sure if it's the test, or the functionality...
    xit('should close if esc is pressed while focused', function() {
      element = dropdown('disabled');
      $document.find('body').append(element);
      clickDropdownToggle();

      triggerKeyDown(getFocusedElement(), 40);

      expect(menu).toHaveClass(dropdownConfig.openClass);
      var focusEl = menu.find('a.dropdown-item').eq(0);
      expect(focusEl).toHaveFocus();

      triggerKeyDown(getFocusedElement(), 27);
      expect(menu).not.toHaveClass(dropdownConfig.openClass);
    });

    describe('with dropdown-append-to-body', function() {
      function dropdown() {
        return $compile('<div uib-dropdown dropdown-append-to-body keyboard-nav><button uib-dropdown-toggle>foo</button><div class="dropdown-menu" uib-dropdown-menu id="dropdown-menu"><a class="dropdown-item">Hello On Body</a><a class="dropdown=item">Hello Again</a></div></div>')($rootScope);
      }

      beforeEach(function() {
        element = dropdown();
        menu = element.find('.dropdown-menu');
      });

      //FIXME: This doesn't seem to be working, but I'm not sure if it's the test, or the functionality...
      xit('should focus first list element when down arrow pressed', function() {
        $document.find('body').append(element);
        clickDropdownToggle();

        var dropdownMenu = $document.find('#dropdown-menu');

        triggerKeyDown(getFocusedElement(), 40);

        expect(dropdownMenu).toHaveClass(dropdownConfig.appendToOpenClass);
        var focusEl = $document.find('.dropdown-menu').eq(0).find('a.dropdown-item');
        expect(focusEl).toHaveFocus();
      });

      //FIXME: This doesn't seem to be working, but I'm not sure if it's the test, or the functionality...
      xit('should focus second list element when down arrow pressed twice', function() {
        $document.find('body').append(element);
        clickDropdownToggle();
        var dropdownMenu = $document.find('#dropdown-menu');
        triggerKeyDown(getFocusedElement(), 40);
        triggerKeyDown(getFocusedElement(), 40);
        triggerKeyDown(getFocusedElement(), 40);

        expect(dropdownMenu).toHaveClass(dropdownConfig.appendToOpenClass);
        var elem1 = $document.find('.dropdown-menu');
        var focusEl = elem1.eq(0).find('a.dropdown-item').eq(1);
        expect(focusEl).toHaveFocus();
      });
    });
  });

  // issue #5942
  describe('using dropdown-append-to-body with dropdown-menu-right class', function() {
    function dropdown() {
      return $compile('<div style="float: right;" uib-dropdown dropdown-append-to-body><button uib-dropdown-toggle>Toggle menu</button><div uib-dropdown-menu class="dropdown-menu dropdown-menu-right" id="dropdown-menu"><a class="dropdown-item">Hello On Body</a></div></div>')($rootScope);
    }

    beforeEach(function() {
      element = dropdown();
      $document.find('body').append(element);

      var menu = $document.find('#dropdown-menu');
      menu.css('position', 'absolute');
    });

    afterEach(function() {
      element.remove();
    });

    it('should align the menu correctly when the body has no vertical scrollbar', function() {
      var toggle = element.find('[uib-dropdown-toggle]');
      var menu = $document.find('#dropdown-menu');
      toggle.trigger('click');

      // Get the offsets of the rightmost position of both the toggle and the menu (offset from the left of the window)
      var toggleRight = Math.round(toggle.offset().left + toggle.outerWidth());
      var menuRight = Math.round(menu.offset().left + menu.outerWidth());
      expect(menuRight).toBe(toggleRight);
    });
  });
});
