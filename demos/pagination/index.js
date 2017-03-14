/**
 * @author [https://github.com/silence717]
 * @since  2017-03-14
 */
(function(angular){
    angular
        .module('app', ['components.pagination'])
        .controller('AppController', AppController);

    function AppController() {
        var vm = this;
        vm.pageList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    }
})(window.angular);