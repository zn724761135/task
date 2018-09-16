angular.module("myApp")
    .constant("articleConstant", {
        typeItem: [{
            type: "全部",
            num: undefined
        }, {
            type: "首页banner",
            num: 0
        }, {
            type: "找职位banner",
            num: 1
        }, {
            type: "找精英banner",
            num: 2
        }, {
            type: "行业大图",
            num: 3
        }],
        statusItem: [{
            status: "全部",
            num: undefined
        }, {
            status: "草稿",
            num: 1
        }, {
            status: "上线",
            num: 2
        }],
    })
    .value("articleConstant",123)