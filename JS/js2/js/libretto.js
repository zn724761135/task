// 返回按钮返回到发牌页面
$('#backtrack').click(function () {
    localStorage.removeItem("fate");
    localStorage.removeItem("killarr");
    localStorage.removeItem("castarr");
    localStorage.removeItem("progress"); //点击按钮清除本地存储的数据
    location.href = "../html/diary.html";
})

// 关闭按钮返回到主页面
$('#off').click(function () {
    if (confirm("是否要退出游戏返回到主页面")) {
        location.href = "../html/start.html"; //点击确定返回到主页面
    } else {
        return false; //点击取消停留在当前页面
    }
})

var data = JSON.parse(localStorage.getItem("store"));
var arr = [];
var arr = data;
console.log(arr)








var condition = JSON.parse(localStorage.getItem("condition"));
console.log(condition)
var state = ["homicide", "deceased", "discuss", "vote"]
var initialize;
initialize = "homicide";
for (let i = 0; i < arr.length; i++) {
    if (arr[i].status == "杀死") {
        initialize = condition;
    }
}
console.log(initialize)
var fsm = new StateMachine({
    init: initialize,
    transitions: [{
            name: 'killer',
            from: 'homicide',
            to: 'deceased'
        },
        {
            name: 'ghost',
            from: 'deceased',
            to: 'discuss'
        },
        {
            name: 'player',
            from: 'discuss',
            to: 'vote'
        },
        {
            name: 'finally',
            from: 'vote',
            to: 'homicide'
        },
    ],

    methods: {
        onKiller: function () {
            alert("杀手开始杀人")
        },
        onGhost: function () {
            alert("杀手杀人完毕，死者发表遗言")
        },
        onPlayer: function () {
            alert("死者发表遗言完毕，玩家依次讨论发言")
        },
        onFinally: function () {
            alert("玩家发言完毕，玩家进行投票")
        },
        onInvalidTransition: function (transition, from, to) {
            switch (from) {
                case "homicide":
                    alert("杀手请先杀人");
                    break;
                case "deceased":
                    alert("亡灵请先发表遗言");
                    break;
                case "discuss":
                    alert("玩家请先发表言论");
                    break;
                case "vote":
                    alert("玩家请先投票");
                    break;
            }
        }
    }
});



$('ul li:nth-child(3)').click(function () {

    if (initialize == state[0]) {
        initialize = state[1];
        localStorage.setItem("condition", JSON.stringify(initialize));
        location.href = "../html/murder.html";
    }
    fsm.killer()
})

$('ul li:nth-child(5)').click(function () {
    if (initialize == state[1]) {
        initialize = state[2];
        console.log(initialize)
    }
    fsm.ghost()
})


$('ul li:nth-child(6)').click(function () {
    if (initialize == state[2]) {
        initialize = state[3]
        console.log(initialize)
    }
    fsm.player()
})
$('ul li:nth-child(7)').click(function () {
    if (initialize == state[3]) {
        initialize = state[0]
        console.log(initialize)
        localStorage.setItem("condition", JSON.stringify(initialize));
        location.href = "../html/vote.html";
    }
    fsm.finally()
})



var fate = JSON.parse(localStorage.getItem("fate"));

var fate = [];

var killarr = JSON.parse(localStorage.getItem("killarr"));
var castarr = JSON.parse(localStorage.getItem("castarr"));

function Days(kill, cast) {
    this.kill = kill;
    this.cast = cast
}
var kill = killarr;
var cast = castarr;
fate.push(new Days(kill, cast))
console.log(fate)
localStorage.setItem("fate", JSON.stringify(fate));


var time = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
if (cast != undefined) {

    for (let i = 0; i <= cast.length - 1; i++) {
        $('main').append($('#Days').eq(0).clone(true));


    }
    for (let i = 0; i <= time.length - 1; i++) {
        $('h4').eq(i).text("第" + time[i] + "天")
        for (let i = 0; i < $('ul').length - 1; i++) {
            $('ul').eq(i).css("display", "none")
        }
    }
}


if (kill != null) {
    for (let i = 0; i < kill.length; i++) {
        $('.killed').eq(i).text(kill[i] + "号被杀死，他的真实身份是" + arr[i].breed).css({
            "font-size": ".1rem",
            "margin-bottom": ".2rem",
        })
        $('.sun').css("margin-top", ".9rem")
        console.log(i)
        console.log($('.killed').eq(i))
    }
}
if (cast != null) {
    for (let i = 0; i <= cast.length - 1; i++) {
        $('.Cast').eq(i).text(cast[i] + "号被投死，他的真实身份是" + arr[i].breed).css({
            "font-size": ".1rem",
            "margin-bottom": ".2rem",
        })
        console.log(i)
    }
}





//下拉宽
$("h4").click(function () {
    $(this).next().toggle();
});





// if (arr != undefined) {
//     for (let i = 0; i < kill.length; i++) {
//         if (x == "杀死") {
//             $('ul li:nth-child(3)').css("background", "#e4e4e4");
//             $('#step1').css("border-right", ".35rem solid #e4e4e4");
//             $('.sun').css("margin-top", ".9rem")
//             // var qq = JSON.parse(localStorage.getItem("aaa"));
//             // initialize.splice(0, 1, qq)
//             // console.log(initialize)
//             // console.log(qq)
//         }
//         if (x == "投死") {
//             $('ul li:nth-child(7)').css("background", "#e4e4e4");
//             $('#step4').css("border-right", ".35rem solid #e4e4e4");
//             // var qq = JSON.parse(localStorage.getItem("aaa"));
//             // initialize.splice(0, 1, qq)
//             // console.log(initialize)
//             // console.log(qq)
//         }
//     }
// }