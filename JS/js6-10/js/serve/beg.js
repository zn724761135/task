// 请求方法
angular.module("myApp")
    .factory("beg", function ($http, site) {
        return {
            // login:function($params){
            //     return $http({
            //         method:"POST",
            //         url: 'site.login',
            //         params:$params,
            //         headers: {
            //             'Content-Type': 'application/x-www-form-urlencoded'
            //         }
            //     })
            // },
            getList: function (params) {//list获取列表请求
                return $http.get(site.getList(), {//调用site地址方法,后面带()为调用，没有()为引用
                    params: params //传参
                });
            }
        }
    })