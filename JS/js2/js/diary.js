// 返回按钮返回到发牌页面
function backtrack() {
    location.href = "../html/check.html";
}

// 关闭按钮返回到主页面
function off() {
    // 点击关闭弹出提示窗口
    if (confirm("是否要退出游戏返回到主页面")) {
        location.href = "../html/start.html"; //点击确定返回到主页面
    } else {
        return false; //点击取消停留在当前页面
    }
}


// 获取发牌时保存的数据
var data = JSON.parse(localStorage.getItem('key'));


var arr = []; //声明一个数组
var arr = data; //把获取的数据传递到数组
console.log(arr);


// 获取角色属性dom节点
var role = document.getElementsByClassName("role");
// 获取角色人数序号dom节点
var number = document.getElementsByClassName("number");
// 获取角色属性盒子父元素节点
var parent = document.getElementsByTagName("main")[0];
console.log(parent)


// 通过父元素节点克隆人数属性盒子
for (let i = 0; i < arr.length - 1; i++) {
    // 获取子级盒子属性节点,并克隆节点
    var son = document.getElementsByClassName("box")[0].cloneNode(true);
    parent.appendChild(son); //规定在父级里面克隆子级节点
}

var x = 0; //声明一个变量记录玩家序号

for (let i = 0; i <= arr.length - 1; i++) {
    role[i].innerText = (arr[i]); //获取数组指标对应的玩家属性
    x = x + 1; //每次循把玩家人数序号+1
    number[i].innerText = (x + "号"); //把玩家人数序号传入对应的盒子
    console.log(arr[i])
    console.log(x);

}

// 点击button生成构造函数
function button() {
    // 创建构造函数
    function Part(breed, status, num) {
        this.breed = breed;
        this.status = status;
        this.num = num;
    }

    var PartArr = [] //声明一个数组，把构造函数的对象放到该数组

    // 构造函数生成玩家对象
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i] //获取玩家对应的角色属性传到对象里
        var num = i + 1 //生成玩家数量序号传入到对象
        PartArr.push(new Part(temp, "存活", num)); //把生成的玩家对象push到数组
    }
    // 把玩家对象数组储存到浏览器本地
    localStorage.setItem("store", JSON.stringify(PartArr));
    console.log(PartArr);
 

    location.href = "../html/libretto.html";//进入下一个页面
}