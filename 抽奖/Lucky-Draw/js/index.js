let ballcontent = document.querySelectorAll('.ballcontent');
let ballcontents = document.querySelectorAll('.ballcontents');
let rotaryball = document.querySelectorAll('.rotaryball');
let mids = document.querySelector('.mids');
let crotary = document.querySelector('.crotary');
let todaynum = document.querySelector('.todaynum');
let banTDD = document.querySelector('.banTDD');
let righttc = document.querySelector('.righttc');
let imgball = document.querySelectorAll('.imgball');
let point = document.querySelector('.point');
let pointname = document.querySelector('.pointname');
let pointimg = document.querySelector('.pointimg');
let pimgcenter = document.querySelector('.pimgcenter');
let iconerror = document.querySelector('.icon-error');
let realate = {
    '1':1,
    '2':0,
    '3':5,
    '4':4,
    '5':3,
    '6':2
}
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
    ballcontents.forEach(function(ele,index){
        ele.textContent = resp.data.prize_list[index].name;
        let imgs = resp.data.prize_list[index].diagram;
        imgball[index].style.backgroundImage = `url(${imgs})`;
        imgball[index].style.backgroundRepeat = 'no-repeat';
        imgball[index].style.backgroundPosition = 'center center';
        imgball[index].stylebackgroundSize = '100% 100%';
    });
    
});

getJSON('http://49.232.166.11:2626/index/wheel/get_draw_record_list').then(res=>{
    console.log(res);
    let temp = 0;
    let content = document.createDocumentFragment();
    let mysetinterval = setInterval(()=>{
        let time = parseInt(res.data.draw_record_list[temp].draw_time_stamp)*1000;
        let truetime = new Date(time);
        let realytruetime = fortime(truetime)
        console.log(realytruetime);
        let result = res.data.draw_record_list[temp].prize_name;
        let div = formore(result,realytruetime);
        content.appendChild(div);
        if(temp == res.data.draw_record_list.length - 1){
            righttc.appendChild(content);
            clearInterval(mysetinterval);
        }else{
            temp += 1;
        }
    },10);
})

function formore(result,realytruetime){
    let div = document.createElement('div');
    let spant = document.createElement('span');
    let spanr = document.createElement('span');
    spanr.textContent = `${result}`;
    spant.textContent = `${realytruetime}`;
    div.appendChild(spant);
    div.appendChild(spanr);
    return div;
}
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

function fortime(timenum){
    let realytruetime = timenum.getFullYear()
                            + '.' + (timenum.getMonth()+1)
                            + '.' + timenum.getDate()
                            + ' ' + timenum.getHours()
                            + ':' + timenum.getMinutes();
    return realytruetime;
}
function rot(num,six){
    rotaryball.forEach((ele,index)=>{
        let temp = 60*(index+1) + num*360 + 60*six;
        ele.style.transform = `rotateZ(${temp}deg) skewY(30deg)`;
        ele.style.display = 'flex';
        ele.style.justifyContent = 'flex-end';
        ele.style.alignItems = 'center';
        // ele.style.flexDirection = "column";
        ballcontent[index].style.transform = `rotateZ(-48deg) skewY(-3deg)`;
        if(num>=0){
            ele.style.transitionTimingFunction = 'cubic-bezier(0.82, 0.01, 0, 0.89)';
        }
        if((index+1)%2 != 0){
            ele.style.backgroundColor = '#ffcd99';
        }
    })
}

rot(0,0);


let yourchance = 4;
todaynum.textContent = `${yourchance}`;
let tempnum=0;
let midsset;
// function midsclick(){
//     yourchance -= 1;
//     todaynum.textContent = `${yourchance}`;
//     mids.style.pointerEvents = 'none';
//     tempnum += parseInt(Math.random()*10)+10;
//     console.log(tempnum);
//     rot(tempnum);
//     midsset = setTimeout(()=>{
//         mids.style.pointerEvents = 'auto';
//     },1500);
// }
mids.addEventListener('click',function(){  
    getJSON('http://49.232.166.11:2626/index/wheel/draw?phone=13224567876').then(res=>{
        console.log(res.data.bingo_prize_id);
        let who = res.data.bingo_prize_id;
        mids.style.pointerEvents = 'none';
        if(yourchance>0){
            tempnum += parseInt(Math.random()*10)+10;
            rot(tempnum,who);
            let nowstime = fortime(new Date());
            let content = document.createDocumentFragment();
            if(who >= 7){
                let tnum = who % 6;
                let nownum = realate[tnum];
                console.log(ballcontent[nownum].textContent);
                setTimeout(()=>{
                    let nowcontent = formore(ballcontent[nownum].textContent,nowstime);
                    content.appendChild(nowcontent);
                    righttc.insertBefore(content,righttc.firstChild);
                },2000);
            }else{
                let nownum = realate[who];
                console.log(ballcontent[nownum].textContent);
                pointname.innerHTML = `${ballcontent[nownum].textContent}`;
                pimgcenter.style.backgroundImage = imgball[nownum].style.backgroundImage;
                pimgcenter.style.backgroundRepeat = 'no-repeat';
                pimgcenter.stylebackgroundSize = '100% 100%';
                pimgcenter.style.backgroundPosition = 'center center';
                pimgcenter.style.height = '100px';
                pimgcenter.style.width = '100px';
                
                setTimeout(()=>{
                    let nowcontent = formore(ballcontent[nownum].textContent,nowstime);
                    content.appendChild(nowcontent);
                    righttc.insertBefore(content,righttc.firstChild);
                },2000);
            }
            midsset = setTimeout(()=>{
                mids.style.pointerEvents = 'auto';
                point.style.display = 'flex';
                pimgcenter.style.margin = '0 auto';
            },2500);
        }else{
            alert('今天的次数用完了')
            yourchance += 1;
        }
        yourchance -= 1;
        todaynum.textContent = `${yourchance}`;
    });
});

// 颠倒子节点的顺序
function reverse(father){
    let content = document.createDocumentFragment();
    let childsList = father.childNodes;
    for(let i = childsList.length - 1;i>=0;i--){
        content.appendChild(childsList[i]);
    }
    while (father.hasChildNodes()) {
        father.removeChild(divlist.firstChild);
    }
    father.appendChild(content);
}

iconerror.addEventListener('click',function(){
    point.style.display = 'none';
})