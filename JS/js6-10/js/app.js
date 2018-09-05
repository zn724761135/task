// ng路由
// angular.module('myApp', ['ngRoute'])
// .config(function ($routeProvider) {
//     $routeProvider.
//     when('/login', {
//         templateUrl: 'html/login.html',
//         // controller: 'loginController'
//     }).
//     otherwise({
//         redirectTo: '/login'
//     });
// });




// ui路由
angular.module('myApp', ["ui.router", "oc.lazyLoad"]) //加载ui路由模块和懒加载模块
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login'); //默认加载页面
        $stateProvider
            .state('login', { //路由跳转
                url: '/login', //定义路由的地址
                views: { //视窗，加载路由的html模块
                    '': {
                        templateUrl: 'html/login.html',
                    }
                },
                resolve: { //懒加载，加载html模块对应的css和js文件
                    myload: (function ($ocLazyLoad) {
                        return $ocLazyLoad.load(["css/login.css", "js/login.js"]);
                    })
                }
            })
            .state('home', {
                url: '/home',
                views: {
                    '': {
                        templateUrl: 'html/home.html',
                    }
                },
                resolve:{
                    myload:(function($ocLazyLoad){
                        return $ocLazyLoad.load(["css/home.css"]);
                    })
                }
            })
    })