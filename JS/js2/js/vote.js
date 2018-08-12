$('#off').click(function () {
    if (confirm("是否要退出游戏返回到主页面")) {
        location.href = "../html/start.html"; //点击确定返回到主页面
    } else {
        return false; //点击取消停留在当前页面
    }
})


var data = JSON.parse(localStorage.getItem("store"));
var arr = [];
arr = data;
console.log(arr)


for (let i = 0; i < arr.length - 1; i++) {
    $('main').append($('.box').eq(0).clone(true));
}

var x = 0;
for (let i = 0; i <= arr.length - 1; i++) {
    $('.role').eq(i).text(arr[i].breed)
    x = arr[i].num;
    $('.number').eq(i).text(x + "号");
    if (arr[i].status == "杀死" || arr[i].status == "投死") {
        $('.box').eq(i).css("background", "#e4e4e4");
    }
}


$('.box').click(function () {
    $('.knife').hide();
    $(this).find('.knife').show();
})

var a;
$('.box').click(function () {
    a = $(this).index() - 2;
    console.log(a)
    console.log(arr[a])
})


var castarr = JSON.parse(localStorage.getItem("castarr"));
if(castarr==null){
    var castarr=[];
}



$('button').click(function(){
    arr[a].status="投死";
    console.log(arr[a])
    $('.box').eq(a).css("background", "#e4e4e4");
    localStorage.setItem("store", JSON.stringify(arr));
    console.log(arr)
    castarr.push(arr[a].num)
    localStorage.setItem("castarr", JSON.stringify(castarr));
    location.href = "../html/libretto.html";

})