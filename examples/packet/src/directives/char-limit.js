'use strict';
app.directive('maxlength', function() {
	return {
		restrict : 'A',
		link : function($scope, $element, $attributes) {

			var limit = $attributes.maxlength;

			if (limit >= 10) {
				$element.bind('keyup', function(event) {
					var element = $element.closest(".form-group");

					element.toggleClass('has-warning', limit - $element.val().length <= 10);
					element.toggleClass('has-error', $element.val().length >= limit);
				});

				$element.bind('keypress', function(event) {
					// Once the limit has been met or exceeded, prevent all keypresses from working
					if ($element.val().length >= limit) {
						// Except backspace
						if (event.keyCode != 8) {
							event.preventDefault();
						}
					}
				});
			}
		}
	};
});
