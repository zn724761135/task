// home主页控制器
angular.module("myApp", [])
    .controller("home", function ($scope, $state) {
        $scope.logout = function () { //点击登出按钮跳转到登录页
            $state.go('login');
        }
        $scope.hidearticle = true; //定义Article管理隐藏元素，true为隐藏，false为显示
        $scope.hideusere = true; //定义用户管理隐藏元素
        $scope.hidetalents = true; //定义人才管理隐藏元素
        $scope.isRotate = false; //定义Article管理下拉箭头旋转css样式
        $scope.isRotate1 = false;//定义用户管理下拉箭头旋转css样式
        $scopeisRotate2 = false;//定义人才管理下拉箭头旋转css样式

        $scope.article = function () { //点击Article管理按钮
            $scope.hideusere = true; //隐藏用户管理管理元素
            $scope.hidetalents = true; //隐藏人才管理管理元素
            $scope.isRotate1 = false;//清除用户管理箭头样式，恢复默认样式
            $scopeisRotate2 = false;//清除人才管理箭头样式，恢复默认样式
            $scope.hidearticle = !$scope.hidearticle; //隐藏显示Article管理元素
            $scope.isRotate = !$scope.isRotate //Article管理下拉箭头旋转和恢复样式

        }

        $scope.user = function () { //点击用户管理按钮
            $scope.isRotate = false;//清除Article管理箭头样式，恢复默认样式
            $scope.isRotate2 = false;//清除人才管理箭头样式，恢复默认样式
            $scope.hidearticle = true; //隐藏Article管理元素
            $scope.hidetalents = true; //隐藏人才管理管理元素
            $scope.isRotate = false; //清除箭头样式，恢复默认样式
            $scope.hideusere = !$scope.hideusere; //隐藏显示用户管理元素
            $scope.isRotate1 = !$scope.isRotate1;//用户管理下拉箭头旋转和恢复样式
        }

        $scope.talents = function () { //点击人才管理按钮
            $scope.isRotate = false;//清除Article管理箭头样式，恢复默认样式
            $scope.isRotate1 = false;//清除用户管理箭头样式，恢复默认样式
            $scope.hidearticle = true; //隐藏Article管理元素
            $scope.hideusere = true; //隐藏用户管理管理元素
            $scope.isRotate = false; //清除箭头样式，恢复默认样式
            $scope.hidetalents = !$scope.hidetalents; //隐藏显示人才管理元素
            $scope.isRotate2 = !$scope.isRotate2//人才管理下拉箭头旋转和恢复样式
        }

        $scope.articles = function (i) {//点击Article管理列表
            $scope.a=0;//清除人才管理列表点击变换颜色样式
            $scope.x=0;//清除用户管理列表点击变换颜色样式
            $scope.i = i;//Article管理列表变换字体颜色
            if ($scope.i == 1) {
                $state.go('home.list')//管理列表路由跳转
            } else if ($scope.i == 2) {
                $state.go('home.details');//点击详情路由跳转
            }
        }

        $scope.users = function (x) {
            $scope.i = 0; //清除Article管理列表点击变换颜色样式
            $scope.a=0;//清除人才管理列表点击变换颜色样式
            $scope.x = x;//用户管理列表变换字体颜色
        }

        $scope.talentss = function (a) {
            $scope.i = 0; //清除Article管理列表点击变换颜色样式
            $scope.x=0;//清除用户管理列表点击变换颜色样式
            $scope.a = a;//人才管理列表变换字体颜色
        }

        $scope.home = function () { //点击主页按钮
            $scope.i = 0;//清除Article管理列表点击变换颜色样式
            $scope.x = 0;//清除用户管理列表点击变换颜色样式
            $scope.a = 0; //清除人才管理列表点击变换颜色样式
            $scope.hidearticle = true; //隐藏Article管理元素
            $scope.hideusere = true; //隐藏用户管理管理元素
            $scope.hidetalents = true; //隐藏人才管理管理元素
            $scope.isRotate = false; //清除箭头样式，恢复默认样式
            $state.go("home"); //跳转主页模块
        }
    })
