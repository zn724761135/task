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


window.onload = function () {

    var b = document.getElementsByTagName("h4");
    var c = document.getElementsByTagName("ul");

    for (let i = 0; i < b.length; i++) {
        b[i].index = i;
        b[i].onclick = function () {
            if (this.className == "") {
                c[this.index].style.display = "none";
                this.className = "block";
            } else {
                c[this.index].style.display = "block";
                this.className = "";
            }


        }

    }

}

// window.onload = function (){
//     var oUl = document.getElementById('list');
//     var aH2 = document.getElementsByTagName('h4');
//     var aUl = this.document.getElementsByTagName('ul');

//     for(var i=0;i<aH2.length;i++){
//         aH2[i].index=i;
//         aH2[i].onclick = function(){
//             for(var i=0;i<aH2.length;i++){
//                 if(aH2[i] !=this){
//                     aUl[i].style.display='none';
//                     aH2[i].className='';
//                 }
//             }
//             if(this.className==''){
//                 aUl[this.index].style.display='none';
//                 this.className='active';
//             }else{
//                 aUl[this.index].style.display='block';
//                 this.className='';
//             }
//         };
//     }

// };