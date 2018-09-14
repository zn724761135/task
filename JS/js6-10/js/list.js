// list列表控制器
angular.module("myApp", [])
    .controller("list", function ($scope, $state, $http, beg) {
        $scope.add = function () { //点击登出按钮返回到
            $state.go('home.add');
        }

        let params = $state.params;//获取传参数据
        console.log(params)

        //显示当前所在页数
        if ($state.params.page == undefined) {
            $scope.now = "1";
        } else if ($state.params.page != undefined) {
            $scope.now = $state.params.page;
        }

        $scope.number = $state.params.value; //定义显示数据的页数，默认第一页

        let size = "10"; //定义展示数量的长度
        let page = $scope.number; //定义获取展示数据的页数

        // 定义请求方法
        $scope.list = function () {
            //调用list请求方法params为传参，then为请求成功后执行
            beg.getList(params).then(function (response) {
                console.log(response.data.data)
                $scope.name = response.data.data.articleList;//把获取的数剧循环出来
                console.log($scope.name)
                let x = response.data.data.total / 10;//定义总页数
                console.log(x);
                $scope.sum = Math.ceil(x);
            })
        }
        $scope.list() //调用自身函数，自执行一次

        // 点击显示页数确定按钮
        $scope.ok = function () {
            if ($scope.number > $scope.sum || $scope.number < 1) {
                confirm("跳转页数不能大于总页数或小于0")
            } else if ($scope.number <= $scope.sum) {
                $state.go($state.$current, {//传参
                    page: $scope.number,
                    size: 10,
                    value:$scope.number,
                }, {
                    reload: true//刷新单前页面
                })
            }
        }

        $scope.start = function () { //点击首页按钮
            $scope.number = "" //清除跳转输入框
            $state.go($state.$current, {//传参
                page: 1,
                size: 10,
                value:"",
            }, {
                reload: true//刷新单前页面
            })
        }

        $scope.end = function () { //点击尾页按钮
            $scope.number = "" //清除跳转输入框
            $state.go($state.$current, {//传参
                page: $scope.sum,
                size: 10,
                value:"",
            }, {
                reload: true//刷新单前页面
            })
        }
    })