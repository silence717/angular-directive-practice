/**
 * @author  https://github.com/silence717
 * @desc []
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
		vm.contentList = [];
		init();
		
		// 点击单个账号
		this.itemClick = function (item) {
			if (item.isSelected) {
				var index = this.contentList.indexOf(item.value);
				this.contentList.splice(index, 1);
			} else {
				this.contentList.push(item.value);
			}
			item.isSelected = !item.isSelected;
			// this.selectCallback({account: item});
		};
		// 删除账号
		this.remove = function (item, event) {
			event.stopPropagation();
			if (item.isSelected) {
				return false;
			}
			var index = this.accountData.indexOf(item);
			this.accountData.splice(index, 1);
		};
		// 显示隐藏下拉列表
		this.toggle = function (event) {
			this.isOpened = !this.isOpened;
			event.stopPropagation();
		};
		// 监听input值变化
		$scope.$watch('vm.content', function (newValue) {
			if (newValue.length === 0) {
				return false;
			}
			var data = newValue.split(',');
			vm.accountData.forEach(function (item) {
				if (item.isSelected === true && data.indexOf(item.value) === -1) {
					item.isSelected = false;
				}
				if (item.isSelected === false && data.indexOf(item.value) !== -1) {
					item.isSelected = true;
					vm.contentList.push(item.value);
				}
			});
		});
		// 监听数据变化
		$scope.$watchCollection('vm.contentList', function (newValue) {
			if (newValue.length === 0) {
				return false;
			}
			vm.content = vm.contentList.join(',');
		});
		
		function init() {
			vm.accountData = [];
			vm.data.split(',').forEach(function(item) {
				vm.accountData.push({value: item, isSelected: false})
			});
		}
	}
	
})();