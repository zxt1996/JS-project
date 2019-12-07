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
let swipercontainer = document.querySelector('.swiper-container');
let endpage = document.querySelector('.endpage');
let rethisnum = document.querySelector('.rethisnum');
let enduserimg = document.querySelector('.enduserimg');
let forsecond = document.querySelector('.forsecond');
let endcl = document.querySelector('.endcl');
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
// 设置倒计时的时间
let cdowntime;
let setload = setInterval(()=>{
    nowload += 1;
    changeload.textContent = nowload;
    if(nowload == 100){
        loadpage.style.display = 'none';
        getJSON(myurl).then((res)=>{
            // console.log(res);
            let tempsetnum = setInterval(()=>{
                let tempnum = parseInt(Math.random()*50);
                if(temp.indexOf(tempnum)<0){
                    temp.push(tempnum);
                    audio.push(res[tempnum].audio);
                    item.push(res[tempnum].item);
                    answer.push(res[tempnum].answer);
                }
                if(temp.length == 30){
                    // console.log(temp,audio,item,answer);
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
    cdowntime = 60;
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
let setcdowntime = setInterval(()=>{
    countdowntime.textContent = `${cdowntime}s`;
    cdowntime -= 1;
    if(cdowntime == -1){
        clearInterval(setcdowntime);
        swipercontainer.style.display = 'none';
        endpage.style.display = 'block';
        myaudio.src = '';
        clearInterval(setabc);
        rethisnum.textContent = `猜中${result}首`;
        if(result <= 6){
            enduserimg.src = './img/end/one.png';
        }
        else if(result <= 12){
            enduserimg.src = './img/end/two.png';
        }
        else if(result <= 18){
            enduserimg.src = './img/end/three.png';
        }
        else if(result <= 24){
            enduserimg.src = './img/end/four.png';
        }else{
            enduserimg.src = './img/end/five.png';
        }
    }
},1000)

// 判断答案是否正确
function judgeanswer(num){
    if(num <= 2){
        yourchance += 1;
        if(answer[yourchance] == num){
            result += 1;
        }
        nowsong(yourchance);
        cantime = 0;
    }
}

let setabc = setInterval(function(){
    // console.log(cantime);
    // 选择监听
    a.addEventListener('click',function(e){
        e.stopPropagation();
        if(cantime > 1){
            judgeanswer(0);
        }
    })

    b.addEventListener('click',function(e){
        e.stopPropagation();
        if(cantime > 1){
            judgeanswer(1);
        }
    })

    c.addEventListener('click',function(e){
        e.stopPropagation();
        if(cantime > 1){
            judgeanswer(2);
        }
    })

    if(cantime < 2){
        // console.log('请等两秒');
        a.addEventListener('click',onlycantwo);
        b.addEventListener('click',onlycantwo);
        c.addEventListener('click',onlycantwo);
    }else{
        a.removeEventListener('click',onlycantwo);
        b.removeEventListener('click',onlycantwo);
        c.removeEventListener('click',onlycantwo);
    }

    if(cantime >=6){
        myaudio.load();
        cantime = 0;
    }
},1000);

function onlycantwo(){
    console.log('请等两秒');
    forsecond.style.display = 'flex';
    setTimeout(()=>{
        forsecond.style.display = 'none';
    },500);
}

// 再次挑战
endcl.addEventListener('click',()=>{
    window.location.reload();
})