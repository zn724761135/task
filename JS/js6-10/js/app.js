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

angular.module('myApp', ["ui.router","oc.lazyLoad"])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    '': {
                        templateUrl: 'html/login.html',
                    }
                },
                resolve: { 
                    loadMyCtrl: (function ($ocLazyLoad) {
                        return $ocLazyLoad.load(["css/login.css"]);
                    })
                }
            })

    })