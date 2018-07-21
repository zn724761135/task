
// 点击顶部返回按钮返回到游戏主页
function start(){
    location.href="start.html";
}


//获取输入玩家input节点
var quantity=document.getElementById("content");
// 获取杀手input节点
var Killer=document.getElementById("Killer");
// 获取平民input节点
var civilian=document.getElementById("civilian");


// 利用oninput输入事件触发玩家input属性
quantity.oninput =function(){
    
    // 获取当前对象输入的值
    gain(quantity.value)
}
// 把获取的值赋给Killer和civilian两个input
function gain(value){
    Killer.value=Math.round(value-(value/2+value/6+value/24.1));
    civilian.value=Math.round(value/2+value/6+value/24.1);
    
    // 当玩家值小于4或大于18赋给Killer和civilian值为空
    if(value<4 || value>18){
        Killer.value="";
        civilian.value="";
    }
}
gain(quantity.value);



// 点击button按钮判断条件
function button(){

    // 获取输入玩家input的value的值
    var count=document.getElementById("content").value;
   
    // 判断条件符合弹出提示窗口,否则进入下一个页面
    if(count<4 || count>18){
        confirm("请输入正确的玩家数量。");        
    }else{
        location.href="start.html";
    }
   
}
