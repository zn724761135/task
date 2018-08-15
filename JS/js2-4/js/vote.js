$('#off').click(function () {
    if (confirm("是否要退出游戏返回到主页面")) {
        location.href = "../html/start.html"; //点击确定返回到主页面
    } else {
        return false; //点击取消停留在当前页面
    }
})

// 获取一开始保存到本地的玩家属性的对象数组的数据
var data = JSON.parse(localStorage.getItem("store"));
var arr = [];
arr = data;
// console.log(arr)

// 循环出玩家对应的盒子
for (let i = 0; i < arr.length - 1; i++) {
    $('main').append($('.box').eq(0).clone(true)); //在main里面循环对应的玩家盒子
}

var x = 0; //声明一个变量记录玩家序号
// 循环玩家角色
for (let i = 0; i <= arr.length - 1; i++) {
    $('.role').eq(i).text(arr[i].breed) //把数组指标对应的玩家对象类型属性传入对应指标的盒子里
    x = arr[i].num; //获取数组指标对应的玩家对象的玩家序号
    $('.number').eq(i).text(x + "号"); //把玩家人数序号传入对应指标的盒子

    // 把已经被投死和被杀死的玩家背景颜色改变
    if (arr[i].status == "杀死" || arr[i].status == "投死") {
        $('.box').eq(i).css("background", "#e4e4e4");
    }
}

// 下拉菜单
$('.box').click(function () {
    $('.knife').hide(); //隐藏小刀
    $(this).find('.knife').show(); //点击玩家盒子搜索显示后代元素小刀
})

var a; //记录被杀手选中的玩家
$('.box').click(function () {
    a = $(this).index() - 2;
    console.log(a)
    console.log(arr[a])
})

// 获取被投票投死的玩家
var castarr = JSON.parse(localStorage.getItem("castarr"));
// 当第一天投票时创建一个被投死的玩家数组
if (castarr == null) {
    var castarr = [];
}

var killer = []; //创建一个杀手数组；
var civilian = []; //创建一个平民数组；
console.log(killer)
console.log(civilian)

for (let i = 0; i < arr.length; i++) {
    //把杀手对象push到杀手数组
    if (arr[i].breed == "杀手") {
        killer.push(arr[i]);
    }
    // 把平民对象push到平民数组
    if (arr[i].breed == "平民") {
        civilian.push(arr[i])
    }
}
// 获取杀手死亡数量
var slayernum = JSON.parse(localStorage.getItem("slayer"));
// 获取平民死亡数量
var Plebsnum = JSON.parse(localStorage.getItem("Plebs"));
var slayer = 0;//定义杀手死亡变量为0
var slayer = slayernum;//把获取的杀手死亡数量传到杀手的变量
var Plebs;//定义平民死亡变量
var Plebs = Plebsnum;//把获取的平民死亡数量传到平民的变量
console.log(slayer)
console.log(Plebs)

// 点击投票按钮
$('button').click(function () {
    // 当杀手被投死杀手变量+1
    if (arr[a].breed == "杀手") {
        slayer = slayer + 1;
    } else if (arr[a].breed == "平民") {
    //当平民被杀死或投死平民变量+1
        Plebs = Plebs + 1;
    }
    // 保存杀手死亡变量，下一次读取
    localStorage.setItem("slayer", JSON.stringify(slayer));
    // 保存平民死亡变量，下一次读取
    localStorage.setItem("Plebs", JSON.stringify(Plebs));
    // 当杀手或平民死亡数量全部死亡结束游戏
    if (slayer >= killer.length || Plebs >= civilian.length) {
        location.href = "../html/start.html";
        return;
    }
    // 当点击被杀死和被投死的玩家，提示玩家已死亡
    if (arr[a].status == "杀死" || arr[a].status == "投死") {
        alert("该玩家已经死亡，请选择其他玩家");
    } else {
        // 当选中其他玩家投票
        arr[a].status = "投死";//把玩家对象的status属性值改为投死
        // 投杀玩家的背景改变
        $('.box').eq(a).css("background", "#e4e4e4");
        // 保存被投死的玩家对象
        localStorage.setItem("store", JSON.stringify(arr));
        // 记录投杀玩家的序号push到投死的玩家数组
        castarr.push(arr[a].num);
        // 保存push的死亡玩家数组
        localStorage.setItem("castarr", JSON.stringify(castarr));
        location.href = "../html/libretto.html";////返回到游戏进度页面  
    }
})