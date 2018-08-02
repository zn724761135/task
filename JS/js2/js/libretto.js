// 返回按钮返回到发牌页面
var backtrack = document.getElementById("backtrack");
backtrack.onclick = function () {
    location.href = "../html/diary.html";
}

// 关闭按钮返回到主页面
var off = document.getElementById("off");
off.onclick = function () {
    // 点击关闭弹出提示窗口
    if (confirm("是否要退出游戏返回到主页面")) {
        location.href = "../html/start.html"; //点击确定返回到主页面
    } else {
        return false; //点击取消停留在当前页面
    }
}




var killer = document.getElementsByClassName("step")[0];
killer.onclick = function () {
    location.href = "../html/murder.html"
}




// 获取天数dom节点
var Days = document.getElementsByTagName("h4");
// 获取游戏进度节点
var progress = document.getElementsByTagName("ul");

// 点击下拉框
window.onload = function () {
    
    for (let i = 0; i < Days.length; i++) {
        Days[i].index = i;
        Days[i].onclick = function () {
            if (this.className == "") {
                progress[this.index].style.display = "none";
                this.className = "block";
            } else {
                progress[this.index].style.display = "block";
                this.className = "";
            }
        }
    }
}