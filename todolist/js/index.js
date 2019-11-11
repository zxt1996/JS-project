var addinput = document.querySelector('#add-task-input');
var add = document.querySelector('#js-add-task');
var content = document.querySelector('ul');
let name;
let template = "";

add.addEventListener('click',function(){
	let createli = document.createElement('li');
	name = addinput.value;
	template = `
                <p>${name} </p>
                <span class="iconfont icon-close close"></span>
		`
	if(name != ""){
		createli.classList.add('task');
		createli.innerHTML = template;
		content.appendChild(createli);
	}else{
		addinput.placeholder = "请输入内容"
	}
	
	forcheck();
	let close = document.querySelectorAll('.close');
	forclose(close);
})

function forcheck(){
	let task = document.querySelectorAll('.task');
	task.forEach(function(ele,index){
		let forchange = true
		ele.addEventListener('click',function(){
			// ele.classList.toggle('checked');
			if(forchange){
				ele.classList.add('checked');
				forchange = !forchange;
			}else{
				ele.classList.remove('checked');
				forchange = !forchange;
			}
			
		})
	})
}

forcheck();
let close = document.querySelectorAll('.close');	
function forclose(close){
	close.forEach(function(ele,index){
		ele.addEventListener('click',function(){
			ele.parentNode.remove();
		})
	})
}

forclose(close);
