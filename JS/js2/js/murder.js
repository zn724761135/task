// 关闭按钮返回到主页面
function off() {
    // 点击关闭弹出提示窗口
    if (confirm("是否要退出游戏返回到主页面")) {
        location.href = "../html/start.html"; //点击确定返回到主页面
    } else {
        return false; //点击取消停留在当前页面
    }
}

// 获取保存到本地的玩家属性的对象数组的数据
var data = JSON.parse(localStorage.getItem("store"));
console.log(data)

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







function button() {
    location.href = "../html/libretto.html"
}