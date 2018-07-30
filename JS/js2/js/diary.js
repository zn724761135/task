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


var arr = [];
var arr = data;
console.log(arr);



var role = document.getElementsByClassName("role")[0];
var number = document.getElementsByClassName("number")[0];
var a = document.getElementsByTagName("main")[0];
console.log(a)

for (let i=0;i < arr.length - 1; i++) {
    var b = document.getElementsByClassName("box")[0].cloneNode(true);
    a.appendChild(b);
}

var a = 0;
var m = 0;
for (let i = 0; i <= arr.length - 1; i++) {
    a = arr[i];
    role.innerText=(arr[i]);
    m = m + 1
    console.log(a);
    console.log(m);
    number.innerText=(m);
    console.log(role);
    console.log(number);
}








// for (let i = 0; i <= arr.length - 1; i++) {

//     a.innerHTML  +=  ` 
//     <div class="box">
//          <span class="role">水民</span>
//     <span class="number">1号</span>   
//         </div>`
//     console.log(a.innerHTML)

// }

// var a = document.getElementsByTagName("main")[0];
// console.log(a)

// for (var i=0;i < arr.length - 1; i++) {
//     var b = document.getElementsByClassName("box")[0].cloneNode(true);
//     a.appendChild(b);
// }
