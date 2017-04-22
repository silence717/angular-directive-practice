/**
 * @author  https://github.com/silence717
 * @desc []
 * @date 2017-04-20
 */
/**
 * module
 */
(function (angular) {
	angular
		.module('app', ['components.account']);
})(window.angular);

/**
 * controller
 */
(function(angular) {
	angular
		.module('app')
		.controller('AppController', AppController);
	function AppController() {
		var vm = this;
		vm.content = '';
		vm.data = "13712345678,13734125678,13712367834,13712567812";
	}
})(window.angular);