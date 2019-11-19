let start = document.querySelector('.start');
let first = document.querySelector('.first');
let box = document.querySelector('.box');
let content = document.querySelector('.content');

let posi = [];

//生成圆形,并设置点击事件
function createball(){
	let tempx = parseInt(Math.random() *30 + 20);
	let tempW = parseInt(Math.random() *90);
	let tempH = parseInt(Math.random() *90);
	
	let forrig = 90 - tempW;
	let forbot = 90 - tempH;
	if(posi.length == 0){
		posi.push([tempH,tempW,forrig,forbot]);
		content.classList.add('active');
	}else{
		let i = 0;
		while(i < posi.length){
			let tempposi = posi[i];
			if(!(tempposi[0]> tempH + Math.floor(tempx/2) ||
				tempposi[1] > tempW + Math.floor(tempx/2) ||
				tempposi[2] > forrig + Math.floor(tempx/2) ||
				tempposi[3] > forbot + Math.floor(tempx/2)
			)){
				tempx = parseInt(Math.random() *30 + 20);
				tempW = parseInt(Math.random() *90);
				tempH = parseInt(Math.random() *90);
				forrig = 90 - tempW;
				forbot = 90 - tempH;
				i = 0;
				console.log(posi);
			}else{
				console.log([tempH,tempW,forrig,forbot])
				i++;
			}
			
		}
		posi.push([tempH,tempW,forrig,forbot]);
	}
	
	
	let temp = `<div id='one' class='ball'
					style="width:${tempx}px;
					height:${tempx}px;
					background-color: black;
					border-radius: 50%;
					top:${tempH}%;
					left:${tempW}%;
					right:${forrig}%;
					bottom:${forbot}%
					"></div>`;
	content.innerHTML += temp;
	let ball = document.querySelectorAll('.ball');
	if(ball.length < 20){
		ball.forEach(function(ele,index){
			if(index == ball.length-1){
				ele.addEventListener('click',function(){
					let change = document.createElement('div');
					change.classList.add('change');
					change.textContent = "第"+(index+1)+"关";
					box.appendChild(change);
					setTimeout(function(){
						change.style.right = '0';
						setTimeout(function(){
							change.style.right = '100%';
							createball();
						},1000)
					},0)
				})
			}else{
				ele.addEventListener('click',function(){
					let fails = `<div class="fail">
							    	<i class="failfont">
							    		挑战失败
							    	</i>
							    	<i class="restart">
							    		重新挑战
							    	</i>
							    </div>`;
					box.innerHTML = fails;
					let restart = document.querySelector('.restart');
					restart.addEventListener('click',function(){
						window.location.reload();
					})
				})
			}
		})
	}else{
		let success = `<div class="success">
				    	<i class="failfont">
				    		挑战成功
				    	</i>
				    	<i class="restart">
				    		重新挑战
				    	</i>
				    </div>`;
		box.innerHTML = success;
		let restart = document.querySelector('.restart');
		restart.addEventListener('click',function(){
			window.location.reload();
		})
	}
}

start.addEventListener('click',function(){
	first.style.transform = 'translateX(-1000px)';
	setTimeout(function(){
		first.style.display = 'none';
		createball();
	},600)
})






