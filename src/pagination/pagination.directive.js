(function (angular) {

    angular.module('components.pagination', [])
        .directive('pagination', pagination);

    function pagination() {
        return {
            restrict: 'E',
            templateUrl: '../../src/pagination/pagination.tpl.html',
            scope: {
                pageSize: '=',
                pageSizeList: '=',
                pageList: '=',
                showGo: '=',
                showPageSize: '=',
                test: '@'
            },
            controllerAs: 'vm',
			controller: Controller,
			bindToController: true
        }
    }

    function Controller() {

        // 默认每页要展示的数据个数
        this.pageSize = 5;
        // 选择每页展示个数的数组
        this.pageSizeList = this.pageSizeList || [5, 10, 15, 20];
        // 需要展示的数据内容
        console.log(this.pageList);
        this.pageList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
        // 要展示的数据总数
        this.totalNum = this.pageList.length;
        // 默认第一页被选中
        this.currentPage = 1;

        // 默认显示select
        this.showPageSize = true;
        // 默认显示go
        this.showGo = true;
        // 计算总页数
        this.totalPages = Math.ceil(this.totalNum / this.pageSize);

        // 制作总页数 数组
        this.makePages = function () {
            var repeatedArr = [];
            for (var i = 0; i < this.totalPages; i++) {
               repeatedArr.push(i + 1);
            }
            return repeatedArr;
        };
        // 模拟分页显示
        this.makePageList = function (currentPage) {
            var pageList = this.splitArray(this.pageList, this.pageSize);
            return pageList[currentPage - 1];
        };


        this.isSelected = function (p) {
            return p === this.currentPage;
        };
        // 选择页数
        this.selectPage = function (p) {
            if (this.currentPage === p) {
                console.log("你已经在本页了");
            } else {
                this.currentPage = p;
                this.isSelected(p);
            }
        };
        // 去上一页
        this.goToPre = function () {
            if (!this.isFirst()) {
                this.selectPage(this.currentPage - 1);
            } else {
                console.log("已经是第一页了，不能再前了");
            }
        };
        // 去下一页
        this.goToNext = function () {
            if (!this.isLast()) {
                this.selectPage(this.currentPage + 1);
            } else {
                console.log("已经到最后一一页了，不能再翻页了");
            }
        };
        // 判断是否在第一页
        this.isFirst = function () {
            return this.currentPage === 1;
        };
        // 判断是否在最后一页
        this.isLast = function () {
            return this.currentPage === this.totalPages;
        };
        // 跳转到指定页
        this.go = function () {
            if (this.goPageNum) {
                if (this.goPageNum > this.totalPages) {
                    alert("请输入小于" + this.totalPages + "的页数哦~" );
                    this.goPageNum = null;
                } else if (this.goPageNum < 0) {
                    alert("请输入大于0的页数哦~");
                    this.goPageNum = null;
                } else if (this.goPageNum === this.currentPage){
                    console.log("已经在这页了哦～");
                    this.goPageNum = null;
                } else {
                    this.currentPage = vm.goPageNum;
                }
            } else {
                alert("请输入页码哦～")
            }

        };
        // 切换pageSize
        this.changePageSize = function () {
            this.currentPage = 1;
            this.totalPages = Math.ceil(this.totalNum / this.pageSize);
            this.makePages(this.totalPages);
        };

        /**
         * 分割数组
         * @param data 被分割的数组
         * @param num 单位小数组个数
         */
        this.splitArray = function (data, num) {
            var result = [];
            for (var i = 0; i < data.length; i+=num) {
                result.push(data.slice(i, i + num));
            }
            return result;
        };
    }

})(window.angular);