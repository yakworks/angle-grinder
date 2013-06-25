var nine = nine || {};
//if(!nine.plugins)  nine.plugins = {};

/*global jQuery */
;
(function ($, window, document, undefined) {
  "use strict";

  // Class definition
  var Foobar = function (element, options) {
    this.init(element, options);
  }

  Foobar.prototype = {
    init: function (element, options) {
      this.$element = $(element);
      this.options = options;

      privateMethod();
      this.foo();
      this.bar();
    },

    foo: function () {
      console.log(this.options.foo);
    },

    bar: function () {
      console.log(this.options.bar);
    }
  } // end Foobar.prototype definition

  //do private methods here
  function privateMethod() {
    console.log("doing something in privateMethod");
  }

  // Plugin definition
  $.fn.foobar = function (option) {
    //to run methods on single element with args like $(el).foobar('setColor','green') or $(el).foobar('runMethod')
    //TODO pattern

    return this.each(function () {

      var $this = $(this);
      var data = $this.data('foobar');
      var options = $.extend({}, $.fn.foobar.defaults, typeof option === "object" && option);

      if (!data) $this.data('foobar', (data = new Foobar(this, options)));

      //run the method on object if in pattern $(el).foobar('init')
      if (typeof option === 'string') data[option]();
    });
  }

  $.fn.foobar.Constructor = Foobar

  $.fn.foobar.defaults = {
    foo: "foo",
    bar: "bar"
  }

})(jQuery, window, document);
