function getAjax(url){
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    let data;
    xhr.onreadystatechange= function(){
        if(xhr.readyState==4 && xhr.status == 200){
            data = JSON.parse(xhr.response);
            return data;
        }
    }
    xhr.send(null);
}

let rotaryball = document.querySelectorAll('.rotaryball');
function rot(num){
    rotaryball.forEach((ele,index)=>{
        let temp = 60*(index+1) + num*360;
        ele.style.transform = `rotate(${temp}deg) skewY(30deg)`;
        if(num>=0){
            ele.style.transitionTimingFunction = 'ease-in-out';
        }
        if((index+1)%2 != 0){
            ele.style.backgroundColor = '#ffcd99';
        }
    })
}

rot(0);

// let rotarycon = getAjax('http://student.bluej.cn/index/wheel/get_prize_list');
// console.log(rotarycon);

let mids = document.querySelector('.mids');
let crotary = document.querySelector('.crotary');
mids.addEventListener('click',function(){
    let tempnum = parseInt(Math.random()*10)+10;
    console.log(tempnum);
    rot(tempnum);
})