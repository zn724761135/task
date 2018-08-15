// 关闭按钮返回到主页面
$('#off').click(function () {
    if (confirm("是否要退出游戏返回到主页面")) {
        location.href = "../html/start.html"; //点击确定返回到主页面
    } else {
        return false; //点击取消停留在当前页面
    }
})


// 获取一开始保存到本地的玩家属性的对象数组的数据
var data = JSON.parse(localStorage.getItem("store"));
console.log(data)
var arr = [];
arr = data;

// 循环出玩家对应的盒子
for (let i = 0; i < arr.length - 1; i++) {
    $('main').append($('.box').eq(0).clone(true)) //在main里面循环对应的玩家盒子
}


var x = 0; //声明一个变量记录玩家序号
// 循环玩家角色
for (let i = 0; i <= arr.length - 1; i++) {
    $('.role').eq(i).text(arr[i].breed) //把数组指标对应的玩家对象类型属性传入对应指标的盒子里
    x = arr[i].num; //获取数组指标对应的玩家对象的玩家序号
    $('.number').eq(i).text(x + "号"); //把玩家人数序号传入对应指标的盒子
}

// 把已经被投死和被杀死的玩家背景颜色改变
if (arr) {
    for (let i = 0; i <= arr.length - 1; i++) {
        if (arr[i].status == "杀死" || arr[i].status == "投死") {
            $('.box').eq(i).css("background", "#e4e4e4");
        }
    }

}

// 下拉菜单
$('.box').click(function () {
    $('.knife').hide(); //隐藏小刀
    $(this).find('.knife').show(); //点击玩家盒子搜索显示后代元素小刀
});


var a; //记录被杀手选中的玩家
$('.box').click(function () {
    a = $(this).index() - 2;
    console.log(a)
    console.log(arr[a])
})

// 获取被杀手杀死的玩家
var killarr = JSON.parse(localStorage.getItem("killarr"));
// 当第一天杀手杀人时创建一个被杀死的玩家数组
if (killarr == null) {
    var killarr = [];
}
console.log(killarr)


var civilian = []; //创建一个平民数组；
console.log(civilian)

for (let i = 0; i < arr.length; i++) {
    // 把平民对象push到平民数组
    if (arr[i].breed == "平民") {
        civilian.push(arr[i])
    }
}
// 获取平民死亡数量
var Plebsnum = JSON.parse(localStorage.getItem("Plebs"));
var Plebs = 0; //定义平民死亡变量为0
var Plebs = Plebsnum; //把获取的平民死亡数量传到平民的变量
console.log(Plebs)


// 点击杀人按钮
$('button').click(function () {
    //当平民被杀死或投死平民变量+1
    if (arr[a].breed == "平民") {
        Plebs = Plebs + 1;
    }
    // 保存平民死亡变量，下一次读取
    localStorage.setItem("Plebs", JSON.stringify(Plebs));
    // 当平民死亡数量全部死亡结束游戏
    if (Plebs >= civilian.length) {
        location.href = "../html/start.html";
        return;
    }

    // 当点击被杀死和被投死的玩家，提示玩家已死亡
    if (arr[a].status == "杀死" || arr[a].status == "投死") {
        alert("该玩家已经死亡，请选择其他玩家");
    } else if (arr[a].breed == "杀手") {
        // 当杀手点击本职业玩家跳出窗口提示
        alert("你的职业是杀手，不能杀死本职业的玩家")
    } else {
        // 当杀手点击平民
        arr[a].status = "杀死"; //把玩家对象的status属性值改为杀死
        // 被杀玩家的背景改变
        $('.box').eq(a).css("background", "#e4e4e4");
        // 并记录被杀玩家的序号push到被杀死的玩家数组
        killarr.push(arr[a].num)
        // 保存push的死亡玩家数组
        localStorage.setItem("killarr", JSON.stringify(killarr));
        // 保存被杀死的玩家对象
        localStorage.setItem("store", JSON.stringify(arr));
        location.href = "../html/libretto.html"; //返回到游戏进度页面      
    }
})