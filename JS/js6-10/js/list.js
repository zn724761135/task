// list列表控制器
angular.module("myApp", [])
    .controller("list", function ($filter, $scope, articleConstant, $state, $http, beg) {

        $scope.typeItem = articleConstant.typeItem; //类似列表
        $scope.statusItem = articleConstant.statusItem; //状态列表

        let params = $state.params; //获取传参数据
        console.log(params)

        $scope.selectedType = +$state.params.type; //类型
        $scope.selectedStatus = +$state.params.status; //状态

        $scope.title = $state.params.title; //标题
        $scope.user = $state.params.author; //创建者

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
                $scope.name = response.data.data.articleList; //把获取的数剧循环出来
                console.log($scope.name)
                let x = response.data.data.total / 10; //定义总页数
                console.log(x);
                $scope.sum = Math.ceil(x);
                let arr = new Array(); //创建数组
                if ($scope.sum < 5) {
                    for (let i = 1; i <= $scope.sum; i++) {
                        arr.push(i)
                    }
                } else if ($scope.sum >= 5) {
                    for (let i = 1; i <= 5; i++) {
                        arr.push(i)
                    }
                }
                $scope.count = arr; //根据数据长度循环出分页按钮
                console.log($scope.count)
            })
        }
        $scope.list() //调用自身函数，自执行一次

        // 点击显示页数确定按钮
        $scope.ok = function () {
            if ($scope.number > $scope.sum || $scope.number < 1) {
                confirm("跳转页数不能大于总页数或小于0")
            } else if ($scope.number <= $scope.sum) {
                $state.go($state.$current, { //传参
                    page: $scope.number,
                    size: 10,
                    value: $scope.number,
                }, {
                    reload: true //刷新单前页面
                })
            }
        }

        $scope.start = function () { //点击首页按钮
            $scope.number = "" //清除跳转输入框
            $state.go($state.$current, { //传参
                page: 1,
                size: 10,
                value: "",
            }, {
                reload: true //刷新单前页面
            })
        }

        $scope.end = function () { //点击尾页按钮
            $scope.number = "" //清除跳转输入框
            $state.go($state.$current, { //传参
                page: $scope.sum,
                size: 10,
                value: "",
            }, {
                reload: true //刷新单前页面
            })
        }

        $scope.query = function () { //搜索按钮

            let starttime = $scope.starttime; //起始时间
            if (starttime) {
                starttime = starttime.getTime();
            } else {
                starttime = undefined;
            }
            let endtime = $scope.endtime; //结束时间
            if (endtime) {
                endtime = endtime.getTime();
            } else {
                endtime = undefined
            }

            $state.go($state.$current, { //传参
                status: $scope.selectedStatus, //状态
                type: $scope.selectedType, //类型
                title: $scope.title, //标题
                author: $scope.user, //创建者
                startAt: starttime, //开始时间
                endAt: endtime, //结束时间
            }, {
                reload: true //刷新单前页面
            })
        }

        $scope.delete = function () { //点击删除按钮，清除所有条件
            $scope.title = "";
            $scope.user = "";
            $scope.selectedType = "";
            $scope.selectedStatus = "";
            $scope.starttime = "";
            $scope.endtime = "";
        }

        $scope.add = function () { //点击新增按钮
            $state.go('home.add', {
                skip: "add", //传参
            })
        }

        $scope.compile = function ($index) { //点击编辑按钮
            var id = $scope.name[$index].id; //获取编辑项id
            console.log(id);
            $state.go('home.add', {
                skip: "compile", //传参
                id: id,
            })
        }

        $scope.swop = function ($index) { //根据status状态渲染上下线按钮
            var status = $scope.name[$index].status; //获取每一项的status值
            if (status == "2") {
                return "下线"; //当值为2时，按钮为下线
            } else if (status == "1") {
                return "上线"; //当值为1时，按钮为上线
            }
        }

        $scope.putSwops = function () { //封装上线下线put请求和请求数据
            $scope.params = {} //创建请求参数
            $scope.params.id = $scope.id; //请求id
            $scope.params.status = $scope.status; //请求状态

            beg.putSwops($scope.params).then(function (response) { //调用put请求
                console.log(response)
                $state.reload(); //请求成功刷新当前页面
            })
        }

        $scope.swops = function ($index) { //点击上线下线按钮
            console.log($scope.swop($index))
            var id = $scope.name[$index].id; //获取修改项的id
            $scope.id = id; //把获取的id传递到请求参数
            console.log($scope.id)

            if ($scope.swop($index) == "下线") { //点击下线按钮
                $scope.status = 1; //状态为下线
                console.log($scope.status)
                $scope.putSwops(); //调用下线请求


            } else if ($scope.swop($index) == "上线") { //点击上线按钮
                $scope.status = 2; //状态为上线
                console.log($scope.status)
                $scope.putSwops(); //调用上线请求
            }
        }

        $scope.deleteList = function ($index) {//点击删除按钮
            if(confirm("删除后将下架从本地删除，确定要删除？")){//提示框
                $scope.params = $scope.name[$index].id; //获取删除项的id
                console.log($scope.params)
                beg.deleteList($scope.params).then(function (response) {//调用删除请求
                    console.log(response)
                    $state.reload(); //删除成功刷新单前页面
                })
            }else{
                return //点击取消不进行任何操作
            }
        }


    })