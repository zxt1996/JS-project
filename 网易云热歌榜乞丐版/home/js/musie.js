var everyli = document.querySelectorAll('.everyli');
var title = document.querySelector('.title');
var playcount = document.createElement('span');
var strong = document.querySelector('.strong');
var forimg = document.createElement('img');
var songimg = document.querySelector('.songimg');
var songh = document.querySelector('.songh');
var uptime = document.querySelector('.uptime');

setInterval(function(){
	if(forupdata()){
		uptime.textContent = forupdata();
	}
	console.log(uptime.textContent);
},10000000)

for(let i=0;i<everyli.length;i+2){
	everyli[i].classList.add('odd');
}

function getURL(url){
	return new Promise(function(resolve,reject){
		var xhr = new XMLHttpRequest();
		xhr.open('GET',url);
		let temp;
		let data;
		var tbody = document.querySelector('.tbody');
		var box = document.querySelector('.box');
		xhr.onreadystatechange = function(){
			
			try{
				if(xhr.readyState == 4 && xhr.status == 200){
				temp = JSON.parse(xhr.responseText);
				data = JSON.parse(JSON.stringify(temp.playlist.tracks));
				let countdata = temp.playlist.playCount;
				strong.textContent = countdata;
				let simg = temp.playlist.coverImgUrl;
				forimg.src = simg;
				songimg.appendChild(forimg);
				let hotname = temp.playlist.name;
				songh.textContent = hotname;
				
				let tem = "";
				for(let i=0;i<100;i++){
					let order = i+1;
					let name = data[`${i}`].name;
					let time = changetime(data[i].dt);
					let singer = data[i].ar[0].name;
					
					
					let template = `
							<li class="everyli">
								<span class="order">${order}</span>
								<span class="name">
									<i class="iconfont icon-bofang onei"></i>
									<a href="#"><b>${name}</b></a>
								</span>
								<span class="time">
									<span class="onlytime">${time}</span>
									<div class="dtime">
										<span class="add" title="添加到播放列表">
											<i class="iconfont icon-xinzeng"></i>
										</span>
										<span class="collect" title="收藏">
											<i class="iconfont icon-collect"></i>
										</span>
										<span class="share" title="分享">
											<i class="iconfont icon-share"></i>
										</span>
										<span class="download" title="下载">
											<i class="iconfont icon-download"></i>
										</span>
									</div>
								</span>
								<span class="singer">
									<a href="#">${singer}</a>
								</span>
							</li>
				`
					tem += template;
				}
				tbody.innerHTML = tem;
				let nameplay = document.querySelectorAll('.name');
				let bot = document.querySelector('.bottom');
				nameplay.forEach(function(ele,index){
					ele.addEventListener('click',function(){
						bot.style.display = 'block';
						let names = data[index-1].name;
						let songid = "http://music.163.com/song/media/outer/url?id="+data[index-1].id;
						let songimg = data[index-1].al.picUrl;
						const ap = new APlayer({
						    container: bot,
						    fixed: true,
						    audio: [{
							        name: 'name',
							        artist: names,
							        url: songid,
							        cover: songimg,
						    	}]
						});
					})
				})
				
				let tempname = document.querySelectorAll('.name');
				let tempi = document.querySelectorAll('.onei');
				let temptime = document.querySelectorAll('.time');
				let onlytime = document.querySelectorAll('.onlytime');
				let dtime = document.querySelectorAll('.dtime');
				for(let i=1;i<4;i++){
					console.log(tempi[i-1]);
					let tempimg = document.createElement('img');
					tempimg.src = data[i-1].al.picUrl;
					tempimg.style.height = '50px';
					tempimg.style.width = '50px';
					tempimg.style.marginRight = '20px';
					tempi[i-1].parentNode.insertBefore(tempimg,tempi[i-1]);
				}
				
				temptime.forEach(function(ele,index){
					ele.addEventListener('mouseenter',function(){
						onlytime[index-1].style.display = 'none';
						dtime[index-1].style.display = 'flex';
					})
					
					ele.addEventListener('mouseleave',function(){
						onlytime[index-1].style.display = 'inline-block';
						dtime[index-1].style.display = 'none';
					})
				})
				var everyli = document.querySelectorAll('.everyli');
				resolve(everyli);
				
				}
				
			}catch(e){
				reject(e);
			}
			
		}

		xhr.send(null);
	})
}
//http://netease.bluej.cn/top/list?idx=1
getURL('Json/data.json').then(
	(everyli)=>{
		let temspan = document.createElement('span');
		let templi = document.createElement('li');
		temspan.innerText = "加载更多";
		templi.appendChild(temspan);
		templi.classList.add('more');
		
		for(let i=0;i<everyli.length;i++){
			if((i+1)%2!=0){
				everyli[i].classList.add('odd');
			}
			if(i>2){
				everyli[i].style.height = '40px';
			}
			if(i==10){
				everyli[i].parentNode.insertBefore(templi,everyli[i]);
			}
			if(i >= 10){
				everyli[i].style.display = 'none';
			}
		}
		
		templi.addEventListener('click',function(){
			templi.style.display = 'none';
			let spanliretract = document.createElement('span');
			let liretract = document.createElement('li');
			let tempbody = document.querySelector('.tbody');
			spanliretract.innerText = "收起";
			liretract.appendChild(spanliretract);
			liretract.classList.add('retract');
			for(let i=10;i<everyli.length;i++){
				everyli[i].style.display = 'flex';
			}
			tempbody.appendChild(liretract);
			
			liretract.addEventListener('mouseenter',function(){
				liretract.style.fontSize = '18px';
			})
			
			liretract.addEventListener('mouseleave',function(){
				liretract.style.fontSize = '16px';
			})
			
			liretract.addEventListener('click',function(){
				liretract.style.display = 'none';
				for(let i=10;i<everyli.length;i++){
					everyli[i].style.display = 'none';
				}
				templi.style.display = 'flex';
			})
		})
		
		templi.addEventListener('mouseenter',function(){
			templi.style.fontSize = '18px';
		})
		
		templi.addEventListener('mouseleave',function(){
			templi.style.fontSize = '16px';
		})
		
		
		
	}
)


function changetime(time){
	let temp = Math.floor(time/1000);
	let minute = Math.floor(temp/60);
	let second = Math.floor(temp-minute*60);
	if(minute<10){
		minute = '0' + minute;
	}
	if(second < 10){
		second = '0' + second;
	}
	return minute + ":" + second;
}


function forupdata(){
	let newdata = new Date();
	if(newdata.getDay() == 4){
		return (newdata.getMonth()+1)+'月'+newdata.getDate()+'日';
	}
	
}

