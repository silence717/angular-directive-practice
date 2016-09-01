/**
 * @author [https://github.com/silence717]
 * @since  2016-09-01
 */
(function() {
    angular
        .module('components.amount', [])
        .directive('amount', amount);

    function amount() {
        var directive = {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                max: '=',
                model: '='
            },
            templateUrl: '../../src/amount/amount.tpl.html',
            controller: AmountController,
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        };
        return directive;
    }

    function AmountController() {
        var vm = this;
        // 数字减一
        vm.subClick = function() {
            if (vm.model === 0) return;
            vm.model -= 1;
        };
        // 数字加一
        vm.addClick = function() {
            if (vm.model === vm.max) return;
            vm.model += 1;
        };
    }
})();