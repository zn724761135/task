// // 返回按钮返回到发牌页面
// var backtrack=document.getElementById("backtrack");
// backtrack.onclick=function() {
//     location.href = "../html/check.html";
// }

// // 关闭按钮返回到主页面
// var off=document.getElementById("off");
// off.onclick=function() {
//     // 点击关闭弹出提示窗口
//     if (confirm("是否要退出游戏返回到主页面")) {
//         location.href = "../html/start.html"; //点击确定返回到主页面
//     } else {
//         return false; //点击取消停留在当前页面
//     }
// }


// // 获取发牌时保存的数据
// var data = JSON.parse(localStorage.getItem('key'));


// var arr = []; //声明一个数组
// var arr = data; //把获取的数据传递到数组
// // console.log(arr);


// // 获取角色属性dom节点
// var role = document.getElementsByClassName("role")[0];
// // 获取角色人数序号dom节点
// var number = document.getElementsByClassName("number")[0];
// // 获取角色属性盒子父元素节点
// var parent = document.getElementsByTagName("main")[0];
// // console.log(parent)


// // 通过父元素节点克隆人数属性盒子
// for (let i = 0; i < arr.length - 1; i++) {
//     // 获取子级盒子属性节点,并克隆节点
//     var son = document.getElementsByClassName("box")[0].cloneNode(true);
//     parent.appendChild(son); //规定在父级里面克隆子级节点
// }

// var x = 0; //声明一个变量记录玩家序号

// for (let i = 0; i <= arr.length - 1; i++) {
//     role.innerText = (arr[i]); //获取数组指标对应的玩家属性
//     x = x + 1; //每次循把玩家人数序号+1
//     number.innerText = (x + "号"); //把玩家人数序号传入对应的盒子
//     // console.log(arr[i])
//     // console.log(x);

// }

// // 点击button生成构造函数
// var button=document.getElementsByTagName("button")[0];
// button.onclick=function() {
//     // 创建构造函数
//     function Part(breed, status, num) {
//         this.breed = breed;
//         this.status = status;
//         this.num = num;
//     }

//     var PartArr = [] //声明一个数组，把构造函数的对象放到该数组

//     // 构造函数生成玩家对象
//     for (var i = 0; i < arr.length; i++) {
//         var temp = arr[i] //获取玩家对应的角色属性传到对象里
//         var num = i + 1 //生成玩家数量序号传入到对象
//         PartArr.push(new Part(temp, "存活", num)); //把生成的玩家对象push到数组
//     }
//     // 把玩家对象数组储存到浏览器本地
//     localStorage.setItem("store", JSON.stringify(PartArr));
//     // console.log(PartArr);
 

//     location.href = "../html/libretto.html";//进入下一个页面
// }

$(document).ready(function() {
    var kill = document.getElementById('kill');
    var speak = document.getElementById('speak');
    var talk = document.getElementById('talk');
    var vote = document.getElementById('vote');
    var killedrole = sessionStorage.getItem('killedrole');
    var voteId = sessionStorage.getItem('voteId');
    var voteRole = sessionStorage.getItem('voteRole');
    var days = JSON.parse(sessionStorage.getItem('days'));
    var states = sessionStorage.getItem('states');
    var killedMen = JSON.parse(sessionStorage.getItem('killedMen'));
    var votedMen = JSON.parse(sessionStorage.getItem('votedMen'));
  
  //动态生成天数
    $("#day").text(days);
    if (days > 1) {
      for (var i = 0; i < days -1 ; i ++ ) {
       var  day = i + 1;
        var beforeDay = '<p  class="day">第<span id="day">'+ day+'</span>天</p>\n' +
          '        <div class="time-line ">\n' +
          '            <div class="content">\n' +
          '                <div class="linenew new">\n' +
          '                    <p><span class="nightimg"></span><span class="trangle5"></span><span>玩家杀人</span></p>\n' +
          '                </div>\n' +
          '                <p class="nightresult"><span id=""></span>'+ killedMen[i].num+'号被杀手杀死，真实身份是平民</p>\n' +
          '                <div class="linenew new">\n' +
          '                    <p><span class="dayimg"></span><span class="trangle5"></span><span>亡灵发表遗言</span></p>\n' +
          '                </div>\n' +
          '                <div class="linenew new">\n' +
          '                    <p><span class="trangle5"></span><span>玩家依次发言</span></p>\n' +
          '                </div>\n' +
          '                <div class="linenew new">\n' +
          '                    <p><span class="trangle5"></span><span>全民投票</span></p>\n' +
          '                </div>\n' +
          '                    <p class="voteresult"><span></span>'+votedMen[i].num+'号被投死了，真实身份是<span>'+votedMen[i].role+'</span>  </p>\n' +
          '            </div>\n' +
          '        </div>';
        $("#dayNum").before(beforeDay);
      }
    }
  
    // alert(states);
    var initstate;
    console.log(states);
    //根据存储状态动态生成初始状态
    if (states == null) {
      initstate = 'start';
    } else if (states === 'killed') {
      // alert(states);
      $("#kill").css("background-color", "lightpink");
      $(".trangle1").css("border-color","transparent lightpink transparent transparent");
      $('#nightID').text(killedrole);
      $('.nightresult').show();
      initstate = states;
    } else if (states == 'voted') {
      $('#nightID').text(killedrole);
      $('#dayId').text(voteId);
      $('#dayRole').text(voteRole);
      initstate = 'start';
    }
    $('.day').click(function(){
     $('.content').show();
   })
    //状态机
    var fsm = new StateMachine({
      init:initstate,
      transitions: [
        { name: 'kill', from: 'start', to: 'killed' },
        { name: 'speak', from: 'killed', to: 'speaked' },
        { name: 'talk', from: 'speaked', to: 'talked' },
        { name: 'vote', from: 'talked', to: 'voted' },
      ],
      methods: {
        onAfterKill: function( ) {
          console.log("AFTER: ");
          window.location.href = 'log-2.html';
        },
        onSpeak: function() {
          console.log("AFTER2: ");
          alert('确定发言');
          $("#speak").css("background-color","lightpink");
          $(".trangle2").css("border-color","transparent lightpink transparent transparent");
        },
        onTalk: function() {
          console.log("AFTER3: ");
          alert('确定讨论');
          $("#talk").css("background-color","lightpink");
          $(".trangle3").css("border-color","transparent lightpink transparent transparent");
        },
        onAfterVote: function() {
          console.log("AFTER4: ");
          window.location.href = 'log-vote.html';
          $("#vote").css("background-color","lightpink");
          $("#kill").css("background-color", "lightpink");
          $("#speak").css("background-color", "lightpink");
          $("#talk").css("background-color", "lightpink");
          $("#vote").css("background-color", "lightpink");
          $(".trangle1").css("border-color","transparent lightpink transparent transparent");
          $(".trangle2").css("border-color","transparent lightpink transparent transparent");
          $(".trangle3").css("border-color","transparent lightpink transparent transparent");
          $(".trangle4").css("border-color","transparent lightpink transparent transparent");
        },
        // onAgain: function() {
        //   console.log("AFTER5: ");
        //   $("#kill").css("background-color","lightpink");
        // },
      }
    });
  //   状态机触发的事件
    kill.onclick = function (ev) {
    if(fsm.state === 'start') {
      fsm.kill();
      sessionStorage.setItem('states',fsm.state);
     }else {
      alert('请按游戏流程操作');
      }
    }
    speak.onclick = function (ev) {
      if(fsm.state === 'killed') {
        fsm.speak();
        sessionStorage.setItem('states',fsm.state);
      }else {
        alert('请按游戏流程操作');
      }
    }
    talk.onclick = function (ev) {
      if(fsm.state === 'speaked') {
        fsm.talk();
        sessionStorage.setItem('states',fsm.state);
      }else {
        alert('请按游戏流程操作');
      }
    }
    vote.onclick = function (ev) {
      if(fsm.state === 'talked') {
        fsm.vote();
        sessionStorage.setItem('states',fsm.state);
      }else {
        alert('请按游戏流程操作');
      }
    }
  
    $('#end').click(function(){
      alert('确定要结束游戏吗？祝你生活愉快。');
      // window.location.href = 'https://image.baidu.com/search/detail?ct=503316480&z=' +
      //   '0&ipn=d&word=%E7%8B%97%E7%8B%97%E7%AC%91%E8%84%B8&step_word=&hs=2&pn=0&spn=0&d' +
      //   'i=201684258270&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&' +
      //   'in=&cl=2&lm=-1&st=-1&cs=1950613125%2C3426874627&os=3995240967%2C2168466395&simid=3404' +
      //   '567504%2C64546248&adpicid=0&lpn=0&ln=1971&fr=&fmq=1530960335736_R&fm=result&ic=0&s=undef' +
      //   'ined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=h' +
      //   'ttp%3A%2F%2Fs4.sinaimg.cn%2Fmw690%2F003jXYERgy6UUNnjZqX33&fromurl=ippr_z2C%24qAzdH3FAzdH3Fk' +
      //   's52_z%26e3Bftgw_z%26e3Bv54_z%26e3BvgAzdH3FfAzdH3Fks52_kcm09dv1a8adoi96_z%26e3Bip4s&gsm=0&rps' +
      //   'tart=0&rpnum=0&islist=&querylist=';
    })
      //法官查看页面
    $('#log').click(function(){
      window.location.href='LOG.html';
    })
    //天数的内容框显隐变化
    $(".day").click(function(){
      $(this).next().toggle();
    });
    })
  