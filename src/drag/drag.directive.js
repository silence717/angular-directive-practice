/**
 * @author  fang.yang
 * @date on 2018.01.23
 */
(function() {
	angular
		.module('components.drag', [])
		.directive('dw-draggable', drag);

	function drag() {
		var directive = {
			restrict: 'A',
			link: function (scope, element) {
				console.log(element);
				var _element = element[0];
				var moveDOM = element.parent()[0];

				var mouseDownFn = function(event) {

					var offset = moveDOM.getBoundingClientRect();

					var left = event.pageX - offset.left;
					var top = event.pageY - offset.top;

					var width = offset.width;
					var height = offset.height;

					var scrollLeft = document.body.scrollLeft;
					var scrollTop = document.body.scrollTop;

					var windowWidth = window.innerWidth;
					var windowHeight = window.outerHeight;

					var maxCriticalX = scrollLeft + windowWidth - width;
					var maxCriticalY = scrollTop + windowHeight - height;

					var mouseMoveFn = function (event) {
						move(event, moveDOM, left, top, scrollLeft, maxCriticalX, maxCriticalY);
					};

					document.addEventListener('mousemove', mouseMoveFn);

					document.addEventListener('mouseup', function() {
						document.removeEventListener('mousemove', mouseMoveFn);
					});
				};

				_element.addEventListener('mousedown', mouseDownFn);
			}
		};
		return directive;
	}


	function move(event, moveDOM, left, top, scrollLeft, maxCriticalX, maxCriticalY) {

		var x = event.pageX - left;
		var y = event.pageY - top;

		if (x <= scrollLeft) {
			x = scrollLeft;
		}
		if (y <= 0) {
			y = 0;
		}
		if (x >= maxCriticalX) {
			x = maxCriticalX;
		}
		if (y >= maxCriticalY) {
			y = maxCriticalY;
		}
		if (maxCriticalY < 0) {
			y = 0;
		}

		angular.element(moveDOM).css({
			left: x + 'px',
			top: y + 'px',
		});
	}

})();