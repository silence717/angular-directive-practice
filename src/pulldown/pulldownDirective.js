/**
 * @author [https://github.com/silence717]
 * @since  2016-08-17
 */
(function() {
    angular
    .module('app', [])
    .directive('pullDown', pullDown);

    pullDown.$inject = ['$document'];

    function pullDown($document) {
        return {
            restrict: 'E',
            scope: {
                currentOrderSort: '='
            },
            templateUrl: './src/app/ticket/list/pulldown.tpl.html',
            controller: function() {
                var vm = this;
                // 是否显示下拉
                vm.isOpened = false;
                // 切换下拉
                vm.toggle = function(event) {
                    vm.isOpened = !vm.isOpened;
                    event.stopPropagation();
                };
                // 关闭浮层
                vm.onClose = function() {
                    vm.isOpened = false;
                };
            },
            link: function(scope, element, attrs, controller) {
                var documentClickHandler = function(event) {
                    // 判断是否为外部点击
                    var isOutsideEvent = (element[0] !== event.target) && (element.find(event.target).length === 0);
                    if (isOutsideEvent) {
                        scope.$apply(function() {
                            controller.onClose();
                        });
                    }
                };
                $document.off('click').on('click', documentClickHandler);
                scope.$on('$destroy', function() {
                    $document.off('click', documentClickHandler);
                });
            },
            replace: true,
            controllerAs: 'vm',
            bindToController: true,
            transclude: true
        };
    }
})();