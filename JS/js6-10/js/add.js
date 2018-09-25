angular.module('myApp', ['ngFileUpload'])
    .controller('add', function ($http, $scope, Upload, articleConstant, $timeout, $state, beg) {
        var url; //定义图片url

        $scope.uploadPic = function (file) { //图片上传
            file.upload = Upload.upload({ //post请求
                url: '/carrots-admin-ajax/a/u/img/task',
                data: {
                    username: $scope.username,
                    file: file,
                },
            });
            file.upload.then(function (response) {
                $timeout(function () { //获取返回的url
                    file.result = response.data.data.url;
                    url = file.result;
                    console.log(url)
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

        let params = $state.params; //获取传参数据

        $scope.typeItem = articleConstant.typeItem; //类型列表
        $scope.industryItem = articleConstant.industryItem; //行业列表
        $scope.selectedIndustry = ~~$state.params.industry;


        //判断传参如果是新增
        if ($state.params.skip == "add") {
            $scope.Title = "新增"; //传参为add修改标题为新增

            $scope.selectedType = ~~$state.params.type; //类型列表

            $scope.uploadImg = function () { //选择图片
                if ($scope.size != undefined && $scope.name != undefined) {
                    $scope.size = undefined; //清空图片大小
                    $scope.name = undefined; //清空图片名称
                } else if ($scope.size == undefined && $scope.name == undefined) {
                    let num = $scope.picFile.size; //获取图片大小
                    console.log(num);
                    let size = num / 1024; //除以1024转换为kb
                    $scope.size = size.toFixed(2) + "KB" //四舍五入
                    console.log($scope.size)
                    $scope.name = $scope.picFile.name; //获取图片名称
                }
            }

            $scope.delete = function () { //点击删除按钮
                $scope.picFile = undefined //删除选择的图片
                $scope.size = undefined; //清空图片大小
                $scope.name = undefined; //清空图片名称
                console.log($scope.picFile)
            }

            //判断传参如果是编辑
        } else if ($state.params.skip == "compile") {
            $scope.Title = "编辑"; //传参为compile修改标题为编辑
        }

        $scope.industryHide = true; //定义行业为隐藏
        $scope.type = function () { //点击类型选择框
            console.log($scope.selectedType)
            if ($scope.selectedType == 3) { //当选择行业大图时显示行业选择框，隐藏跳转连接
                $scope.industryHide = false;
            } else { //当不选择行业大图时隐藏行业下拉框，显示跳转连接
                $scope.industryHide = true;
            }
        }

        $scope.off = function () {
            if (confirm("确定退出当前页面，并终止单前一切操作")) {
                $state.go("home.list");
            } else {
                return
            }
        }

        $scope.beg = function () { //封装请求方法
            $scope.params = {};//定义发起请求的数据
            $scope.params.title = $scope.title;//标题
            $scope.params.type = $scope.selectedType;//类型
            $scope.params.industry = $scope.selectedIndustry//行业
            $scope.params.img = url;//图片
            $scope.params.content = $scope.explain;//说明
            $scope.params.url = $scope.skipUrl;//跳转连接
            $scope.params.status = $scope.status;//状态

            // 调用请求方法
            beg.postAdd($scope.params).then(function (response) {
                console.log($scope.params);
                console.log(response)
                if (confirm("上传成功")) {
                    $state.go('home.list'); //点击确定上传并返回到list列表页面
                } else {
                    $state.reload(); //点击取消上传并刷新当前页面
                }
            })
        }

        $scope.online = function () { //点击上线按钮
            if (url == undefined) {
                alert("请先上传图片"); //未上传图片提示上传图片
            } else if (url != undefined) {
                $scope.status = 2;//定义status为上线
                $scope.beg();//调用请求
            }
        }

        $scope.draft=function(){
            if (url == undefined) {
                alert("请先上传图片"); //未上传图片提示上传图片
            } else if (url != undefined) {
                $scope.status = 1;//定义status为草稿
                $scope.beg();//调用请求
            }
        }


    });