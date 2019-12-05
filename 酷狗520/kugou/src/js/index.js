let changeload = document.querySelector('.changeload');
let loadpage = document.querySelector('.loadpage');
let startpage = document.querySelector('.startpage');
let light = document.querySelectorAll('.light');
let startbtu = document.querySelector('.startbtu');
// 加载页面
let nowload = 0;
let setload = setInterval(()=>{
    nowload += 1;
    changeload.textContent = nowload;
    if(nowload == 100){
        loadpage.style.display = 'none';
        clearInterval(setload);
    }
},10);

// 开始页面
startbtu.addEventListener('click',function(){
    startpage.style.display = 'none';
})

var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay: true,//可选选项，自动滑动
  })        