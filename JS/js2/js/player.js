// 点击顶部返回按钮返回到游戏主页
function start() {
    // 点击返回弹出提示窗口
    if(confirm("是否要退出游戏，并返回到主页面")){     
        location.href = "start.html";//点击确定返回到主页面
     }else{
        return false;//点击取消停留在当前页面
    }
}


//获取输入玩家input节点
var quantity = document.getElementById("content");
// 获取杀手input节点
var Killer = document.getElementById("Killer");
// 获取平民input节点
var civilian = document.getElementById("civilian");


// 利用oninput输入事件触发玩家input属性
quantity.oninput = function () {
    var x=/\D/g;//定义正则，非数字规则
    this.value=this.value.replace(x,"");// 符合正则规则替换为空值
    gain(this.value);// 获取当前对象输入的值
}
// 把获取的值赋给Killer和civilian两个input
function gain(value) {
    Killer.value = Math.round(value - (value / 2 + value / 6 + value / 24.1));
    civilian.value = Math.round(value / 2 + value / 6 + value / 24.1);

    // 当玩家值小于4或大于18赋给Killer和civilian值为空
    if (value< 4 || value > 18) {
        Killer.value = "";
        civilian.value = "";
    }
}
gain(quantity.value);//自运行



// // 点击button按钮判断条件
function button() {

    // 获取输入玩家input的value的值
    var count = document.getElementById("content").value;

    // 判断条件符合弹出提示窗口,否则进入下一个页面
    if (count < 4 || count > 18) {
        confirm("请输入正确的玩家数量。");
    } else {
        location.href = "start.html";
    }

}


// 键盘事件，onkeydown事件当用户按下按键触发
document.onkeydown = function (a) {//a是按键信息对象以函数参数的形式传递进来
   
     //取出按键信息中的按键代码(大部分浏览器通过keyCode属性获取按键代码，但少部分浏览器使用的却是charCode
    var code = a.charCode || a.keyCode;  

        //13为回车键的编码
    if (code === 13) {   
          
        //当按下回车后执行如下代码
        var count = document.getElementById("content").value;
        
        // 按下回车后判断条件符合弹出提示窗口,否则进入下一个页面
        if (count < 4 || count > 18) {
            confirm("请输入正确的玩家数量。");
        } else {
            location.href = "start.html";
        }
    }
}
