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
            .state('home', { //路由跳转主页
                url: '/home', //定义主页路由的地址
                views: { //视窗，加载路由主页的html模块
                    '': {
                        templateUrl: 'html/home.html',
                    }
                },
                resolve: { //懒加载，加载主页html模块对应的css和js文件
                    myload: (function ($ocLazyLoad) {
                        return $ocLazyLoad.load(["css/home.css", "js/home.js"]);
                    })
                }
            })
        .state('home.list',{//在主页路由跳转到list
            url:'/list?page&size&value',//定义主页list路由的地址和传参？后面是传参
            views:{//视窗，加载路由主页list的html模块
                '':{
                    templateUrl:'html/list.html',
                    controller:'list',//过滤器
                    // params:{args:{}}
                }
            },
            resolve:{//懒加载，加载主页list的html模块对应的css和js文件
                myload:(function($ocLazyLoad){
                    return $ocLazyLoad.load(["css/list.css","js/list.js"]);
                })
            }
        })
        .state('home.add',{//路由跳转到新增
            url:'/add',//定义新增路由的地址
            views:{//视窗，加载新增的html模块
                '':{
                    templateUrl:"html/add.html"
                }
            },
            resolve:{//懒加载，加载新增的html模块对应的css和js文件
                myload:(function($ocLazyLoad){
                    return $ocLazyLoad.load([])
                })
            }
        })
        .state('home.details',{
            url:'/details',
            views:{
                '':{
                    templateUrl:"html/details.html"
                }
            },
            resolve:{
                myload:(function($ocLazyLoad){
                    return $ocLazyLoad.load([]);
                })
            }
        })
    })