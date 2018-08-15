$('.left').click(function(){
    if(confirm("返回到主页")){
        location.href="../html/start.html";
    }else{
        return false;
    }
})