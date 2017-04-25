/**
 * @author  https://github.com/silence717
 * @desc [test account manager]
 * @date 2017-04-20
 */
(function () {
	angular
		.module('components.account', [])
		.directive('account', account);
	
	function account() {
		var directive = {
			restrict: 'E',
			scope: {
				data: '=',
				content: '=',
				selectCallback: '&'
			},
			templateUrl: '../../src/account/account.tpl.html',
			controller: Controller,
			controllerAs: 'vm',
			bindToController: true,
			replace: true
		};
		return directive;
	}
	
	Controller.$inject = ['$scope'];
	function Controller($scope) {
		
		var vm = this;
		
		vm.isOpened = false;
		initData();
		
		/**
		 * item click
		 * @param item
		 */
		vm.itemClick = function (item) {
			if (item.isSelected) {
				var index = vm.contentList.indexOf(item.value);
				vm.contentList.splice(index, 1);
			} else {
				vm.contentList.push(item.value);
			}
			item.isSelected = !item.isSelected;
			// resolveBackData();
		};
		/**
		 * remove account
		 * @param item
		 * @param event
		 * @returns {boolean}
		 */
		vm.remove = function (item, event) {
			event.stopPropagation();
			if (item.isSelected) {
				return false;
			}
			var index = vm.accountData.indexOf(item);
			vm.accountData.splice(index, 1);
			resolveBackData();
		};
		// 显示隐藏下拉列表
		vm.toggle = function (event) {
			vm.isOpened = !vm.isOpened;
			event.stopPropagation();
		};
		/**
		 * select all click
		 */
		vm.checkAllClick = function() {
			if (vm.checkAll) {
				vm.accountData.forEach(function(item) {
					if(!item.isSelected) {
						item.isSelected = true;
						vm.contentList.push(item.value);
					}
				});
			} else {
				vm.accountData.forEach(function(item) {
					item.isSelected = false;
					var index = vm.contentList.indexOf(item.value);
					vm.contentList.splice(index, 1);
				});
			}
			resolveBackData();
		};
		
		function resolveBackData() {
			var historyContent = [];
			vm.accountData.forEach(function (item) {
				historyContent.push(item.value);
			});
			vm.selectCallback({historyContent: historyContent.join(','), inputContent: vm.contentList.join(',')});
		}
		
		/**
		 * init watch data
		 */
		function initWatchData() {
			// 监听input值变化
			$scope.$watch('vm.content', function (newValue) {
				if (newValue.length === 0) {
					return false;
				}
				vm.contentList = newValue.split(',');
				vm.accountData.forEach(function (item) {
					if (item.isSelected === true && vm.contentList.indexOf(item.value) === -1) {
						item.isSelected = false;
					}
					if (item.isSelected === false && vm.contentList.indexOf(item.value) !== -1) {
						item.isSelected = true;
					}
				});
				resolveBackData();
			});
			// 监听选中数组变化
			$scope.$watchCollection('vm.contentList', function (newValue) {
				vm.content = newValue.join(',');
			});
			// 监测 accountData 控制全选
			$scope.$watch('vm.accountData', function (newValue) {
				// 标记选中的有几个
				var count = 0;
				newValue.forEach(function (item) {
					if (item.isSelected) {
						count++;
					}
				});
				if (count === vm.accountData.length) {
					vm.checkAll = 1;
				} else {
					vm.checkAll = 0;
				}
			}, true);
		}
		
		function initData() {
			vm.contentList = [];
			vm.accountData = [];
			vm.data.split(',').forEach(function(item) {
				vm.accountData.push({value: item, isSelected: false})
			});
			initWatchData();
		}
	}
	
})();