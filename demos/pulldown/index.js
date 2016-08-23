/**
 * @author [https://github.com/silence717]
 * @since  2016-08-23
 */
/**
 * module
 */
(function (angular) {
    angular
        .module('app', []);
})(window.angular);
/**
 * controller
 */
(function (angular) {

    angular
        .module('app')
        .controller('AppController', AppController);


    function AppController() {
        var vm = this;
        // 各个工单池共有排序
        vm.data = [
            {order: 'price', orderSort: 'asc', orderTitle: '价格', orderSortTitle: '从低到高'},
            {order: 'price', orderSort: 'desc', orderTitle: '价格', orderSortTitle: '从高到低'},
            {order: 'saleAmount', orderSort: 'asc', orderTitle: '销量', orderSortTitle: '从低到高'},
            {order: 'saleAmount', orderSort: 'desc', orderTitle: '销量', orderSortTitle: '从高到低'}
        ];

    }

})(window.angular);

