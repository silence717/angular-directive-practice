/**
 * @author [https://github.com/silence717]
 * @since  2016-08-23
 */
/**
 * module
 */
(function (angular) {
    angular
        .module('app', ['components.pullDown']);
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
        
        vm.data = [
            {key: 'price', sort: 'asc', title: '价格', value: '从低到高'},
            {key: 'price', sort: 'desc', title: '价格', value: '从高到低'},
            {key: 'saleAmount', sort: 'asc', title: '销量', value: '从低到高'},
            {key: 'saleAmount', sort: 'desc', title: '销量', value: '从高到低'}
        ];
        vm.clk = function(currentData) {
            console.log(currentData);
            console.log('reload data from backend...');
        }

    }

})(window.angular);

