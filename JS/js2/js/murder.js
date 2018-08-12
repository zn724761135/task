// 关闭按钮返回到主页面
$('#off').click(function () {
    if (confirm("是否要退出游戏返回到主页面")) {
        location.href = "../html/start.html"; //点击确定返回到主页面
    } else {
        return false; //点击取消停留在当前页面
    }
})


// 获取保存到本地的玩家属性的对象数组的数据
var data = JSON.parse(localStorage.getItem("store"));
console.log(data)
var arr = [];
arr = data;


// var die = JSON.parse(localStorage.getItem("progress"));
// var diearr = [];
// disarr = die;
// console.log(disarr)

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
    // if (disarr[i].status == "死亡") {
    //     $('.box').eq(i).css("background", "#e4e4e4");
    // }
}

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


// for (let i = 0; i < arr.length; i++) {
//     var hh = document.getElementsByClassName("box")
//     hh[i].onclick = function () {
//         console.log(i)
//         a = i
//         console.log(arr[a])
//     }
// }
// function qqq(){
//     console.log(arr[a])
// }



var killarr = JSON.parse(localStorage.getItem("killarr"));
if(killarr==null){
    var killarr=[];
}

console.log(killarr)

$('button').click(function () {
    if (arr[a].breed == "杀手") {
        confirm("你的职业是杀手，不能杀死本职业的玩家")
    } else {
        arr[a].status = "杀死";
        console.log(arr[a]);
        $('.box').eq(a).css("background", "#e4e4e4");
        console.log(arr)
        killarr.push(arr[a].num)
        localStorage.setItem("killarr", JSON.stringify(killarr));
        console.log(killarr)
        localStorage.setItem("store", JSON.stringify(arr));
        location.href = "../html/libretto.html";       
    }
})