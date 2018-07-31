// 返回按钮返回到发牌页面
function backtrack() {
    location.href = "../html/diary.html";
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


// 获取保存到本地的玩家属性的对象数组的数据
var data = JSON.parse(localStorage.getItem("store"));
console.log(data)