//接口地址方法
angular.module("myApp")
.factory("site",function(){
    return{
        // login:'/carrots-admin-ajax/a/login',

        getList:function(){//封装获取list列表数据接口为一个方法
            return '/carrots-admin-ajax/a/article/search';
        },
        postAdd:function(){
            return '/carrots-admin-ajax/a/u/article';
        }
        
    }
})