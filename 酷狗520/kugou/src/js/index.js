let changeload = document.querySelector('.changeload');
let loadpage = document.querySelector('.loadpage');
let startpage = document.querySelector('.startpage');
let light = document.querySelectorAll('.light');
let startbtu = document.querySelector('.startbtu');
let select = document.querySelector('.select');
let countdowntime = document.querySelector('.countdowntime');
let songnameone = document.querySelector('.songnameone');
let songnametwo = document.querySelector('.songnametwo');
let songnamethree = document.querySelector('.songnamethree');
let a = document.querySelector('.a');
let b = document.querySelector('.b');
let c = document.querySelector('.c');
let myaudio = document.querySelector('.myaudio');

// 设置缓存的数据
let myurl = './json/music.json';
let temp = [];
let audio = [];
let item = [];
let answer = [];
// 选中的数目
let result = 0;
//当前已经选的题数
let yourchance = 0;
// 加载页面
let nowload = 0;
// 设置可以点击的时间
let cantime = 0;
// 设置时长的定时器
let uset;

let setload = setInterval(()=>{
    nowload += 1;
    changeload.textContent = nowload;
    if(nowload == 100){
        loadpage.style.display = 'none';
        getJSON(myurl).then((res)=>{
            console.log(res);
            let tempsetnum = setInterval(()=>{
                let tempnum = parseInt(Math.random()*50);
                if(temp.indexOf(tempnum)<0){
                    temp.push(tempnum);
                    audio.push(res[tempnum].audio);
                    item.push(res[tempnum].item);
                    answer.push(res[tempnum].answer);
                }
                if(temp.length == 30){
                    console.log(temp,audio,item,answer);
                    clearInterval(tempsetnum);
                }
            },4);
        });
        clearInterval(setload);
    }
},10);
  

// 请求音乐信息
function getJSON(url){
    return new Promise(function(resolve,reject){
        var XHR = new XMLHttpRequest();
        XHR.open('GET',url,true);
        XHR.send();

        XHR.onreadystatechange = function(){
            if(XHR.readyState == 4){
                if(XHR.status == 200){
                    try{
                        var response = JSON.parse(XHR.responseText);
                        resolve(response);
                    }catch(e){
                        reject(e);
                    }
                }else{
                    reject(new Error(XHR.statusText));
                }
            }
        }
    })
}


// 开始页面
startbtu.addEventListener('click',function(){
    startpage.style.display = 'none';
    select.style.display = 'flex';
    nowsong(yourchance);
    uset = setInterval(()=>{
        cantime += 1;
        // console.log(cantime);
    },1000);
})

// 每次更新歌曲数据
function nowsong(now){
    songnameone.textContent = item[now][0];
    songnametwo.textContent = item[now][1];
    songnamethree.textContent = item[now][2];
    myaudio.src = '.'+audio[now];
}
var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay: true,//可选选项，自动滑动
    autoplay : {
        delay:10000
    },
    on:{
        init: function(){
          swiperAnimateCache(this); //隐藏动画元素 
          swiperAnimate(this); //初始化完成开始动画
        }, 
        slideChangeTransitionEnd: function(){ 
          swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
        //   动画只展现一次，去除ani类名
        //   this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 
        } 
      }
  })

  // 倒计时
let cdowntime = 60;
let setcdowntime = setInterval(()=>{
    countdowntime.textContent = `${cdowntime}s`;
    cdowntime -= 1;
    if(cdowntime == 0){
        clearInterval(setcdowntime);
    }
},1000)

// 判断答案是否正确
function judgeanswer(num){
    yourchance += 1;
    if(answer[yourchance] == num){
        result += 1;
    }
    nowsong(yourchance);
    cantime = 0;
}

setInterval(()=>{
    console.log(cantime);
    // 选择监听
    a.addEventListener('click',()=>{
        if(cantime > 2){
            judgeanswer(0);
        }else{
            console.log('请等两秒');
        }
    })

    b.addEventListener('click',()=>{
        if(cantime > 2){
            judgeanswer(1);
        }else{
            console.log('请等两秒');
        }
    })

    c.addEventListener('click',()=>{
        if(cantime > 2){
            judgeanswer(2);
        }else{
            console.log('请等两秒');
        }
    })
    if(cantime >=5){
        myaudio.load();
        cantime = 0;
    }
},1000);

