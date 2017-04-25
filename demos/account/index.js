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
		vm.content = '13712345678,13734125678,13712367834,13712567812';
		vm.data = "13712345678,13734125678,13712367834,13712567812";
		vm.setContent = function (historyContent, inputContent) {
			console.log('*********history content***********');
			console.log(historyContent);
			console.log('====================');
			console.log('*********input content***********');
			console.log(inputContent);
			
		}
	}
})(window.angular);