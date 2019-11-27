let ballcontent = document.querySelectorAll('.ballcontent');
let rotaryball = document.querySelectorAll('.rotaryball');
let mids = document.querySelector('.mids');
let crotary = document.querySelector('.crotary');
let todaynum = document.querySelector('.todaynum');
let banTDD = document.querySelector('.banTDD');
let righttc = document.querySelector('.righttc');

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

getJSON("http://49.232.166.11:2626/index/wheel/get_prize_list").then(resp => {
    ballcontent.forEach(function(ele,index){
        ele.textContent = resp.data.prize_list[index].name;
        let imgs = resp.data.prize_list[index].diagram;
        ballcontent[index].style.backgroundImage = `url(${imgs})`;
        ballcontent[index].style.backgroundRepeat = 'no-repeat';
        ballcontent[index].style.backgroundPosition = 'center center';
    });
    
});

getJSON('http://49.232.166.11:2626/index/wheel/get_draw_record_list').then(res=>{
    console.log(res);
    let temp = 0;
    let content = document.createDocumentFragment();
    let mysetinterval = setInterval(()=>{
        let time = parseInt(res.data.draw_record_list[temp].draw_time_stamp)*1000;
        let truetime = new Date(time);
        let realytruetime = truetime.getFullYear()
                            + '.' + truetime.getMonth()
                            + '.' + truetime.getDate()
                            + ' ' + truetime.getHours()
                            + ':' + truetime.getMinutes();
        console.log(realytruetime);
        let result = res.data.draw_record_list[temp].prize_name;
        let div = document.createElement('div');
        let spant = document.createElement('span');
        let spanr = document.createElement('span');
        spanr.textContent = `${result}`;
        spant.textContent = `${realytruetime}`;
        div.appendChild(spant);
        div.appendChild(spanr);
        content.appendChild(div);
        if(temp == res.data.draw_record_list.length - 1){
            righttc.appendChild(content);
            clearInterval(mysetinterval);
        }else{
            temp += 1;
        }
    },10);
})

getJSON('../data/head.json').then(res=>{
    let temp = 0;
    setInterval(function(){
        let phone = res.data[temp].phone.split('');
        phone.forEach(function(ele,index){
            if(index>2 && index <9){
                phone[index] = '*';
            }
        })
        phone = phone.join('');
        let data = "恭喜" + " " + phone + ' ' + "用户抽中" + " " + res.data[temp].prize_name;
        banTDD.textContent = `${data}`;      
        if(temp == res.data.length-1){
            temp = 0;
        }else{
            temp += 1;
        }
    },1000);
});

function rot(num){
    rotaryball.forEach((ele,index)=>{
        let temp = 60*(index+1) + num*360;
        ele.style.transform = `rotate(${temp}deg) skewY(30deg)`;
        ele.style.display = 'flex';
        ele.style.justifyContent = 'flex-end';
        ele.style.alignItems = 'center';
        // ele.style.flexDirection = "column";
        ballcontent[index].style.transform = `rotate(-48deg) skewY(0)`;
        if(num>=0){
            ele.style.transitionTimingFunction = 'cubic-bezier(0.82, 0.01, 0, 0.89)';
        }
        if((index+1)%2 != 0){
            ele.style.backgroundColor = '#ffcd99';
        }
    })
}

rot(0);


let yourchance = 4;
todaynum.textContent = `${yourchance}`;
let tempnum=0;
let midsset;
function midsclick(){
    yourchance -= 1;
    todaynum.textContent = `${yourchance}`;
    mids.style.pointerEvents = 'none';
    tempnum += parseInt(Math.random()*10)+10;
    console.log(tempnum);
    rot(tempnum);
    midsset = setTimeout(()=>{
        mids.style.pointerEvents = 'auto';
    },1500);
}
mids.addEventListener('click',function(){  
    let who = 0;
    // getJSON('').then(res=>{
    //     console.log(res);
    // });
    console.log(who);
    mids.style.pointerEvents = 'none';
    if(yourchance>0){
        tempnum += parseInt(Math.random()*10)+10;
        console.log(tempnum);
        rot(tempnum);
        midsset = setTimeout(()=>{
            mids.style.pointerEvents = 'auto';
        },1500);
    }else{
        alert('今天的次数用完了')
        yourchance += 1;
    }
    yourchance -= 1;
    todaynum.textContent = `${yourchance}`;
});