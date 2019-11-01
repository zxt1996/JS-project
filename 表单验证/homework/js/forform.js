var userfather = document.querySelector('.userfather');
var user_name = document.querySelector('input[name="user_name"]');
var pasfather = document.querySelector('.pasfather');
var pass = document.querySelector('input[name="pas_name"]');
var sexfather = document.querySelector('.sexfather');
var sex = document.querySelectorAll('input[name="sex"]');
var likefather = document.querySelector('.likefather');
var like = document.querySelectorAll('input[name="like"]');
var phonefather = document.querySelector('.phonefather');
var phone = document.querySelector('input[name="phone"]');
var aboutfather = document.querySelector('.aboutfather');
var aboutyou = document.querySelector('textarea[name="about_you"]');
var formone = document.querySelector('#formone');
var but = document.querySelector('button');
var erruser = document.querySelector('.erruser');
var errpas = document.querySelector('.errpas');
var errsex = document.querySelector('.errsex');
var errlike = document.querySelector('.errlike');
var errphone = document.querySelector('.errphone');
var errabout = document.querySelector('.errabout');
let havephone = phone.files.length;

function whenerror(err,errfather){
	errfather.style.marginBottom = '0px';
	err.style.display = 'flex';
	err.style.paddingLeft = '82px';
}

function forright(err,errfather){
	err.style.display = 'none';
	errfather.style.marginBottom = '20px';
}


user_name.addEventListener('keydown',function(e){
	let haveuser = user_name.value.length;
	if(haveuser>=0){
		forright(erruser,userfather);
	}
})

pass.addEventListener('keydown',function(e){
	let havepass = pass.value.length;
	if(havepass>=0){
		forright(errpas,pasfather);
	}
})

aboutyou.addEventListener('keydown',function(){
	let about = aboutyou.value.length;
	if(about>=0){
		forright(errabout,aboutfather);
	}
})

function test(){
	forright(errsex,sexfather);
}

function testlike(){
	forright(errlike,likefather);
}

function testphone(){
	forright(errphone,phonefather);
}
formone.addEventListener('submit',function(e){
	e.preventDefault();
	const foruser = /^[a-zA-Z0-9_-]{4,16}$/;
	const forpass = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
	let haveuser = foruser.test(user_name.value);
	let havepass = forpass.test(pass.value);
	let havesex = 0;
	let havelike = 0;
	let about = aboutyou.value.length;
	
	if(sex[0].checked || sex[1].checked){
		havesex+=1;
	}
	if(like[0].checked || like[1].checked || like[2].checked){
		havelike += 1;
	}
	
	if(!haveuser){
		whenerror(erruser,userfather);
	}
	if(!havepass){
		whenerror(errpas,pasfather);
	}
	if(havesex == 0){
		whenerror(errsex,sexfather);
	}
	if(havelike == 0){
		whenerror(errlike,likefather);
	}
	if(!phone.files.length){
		whenerror(errphone,phonefather);
	}
	if(!about){
		whenerror(errabout,aboutfather);
	}
	if(haveuser && havepass && havesex>0 && havelike>0 && phone.files.length && about){
		formone.submit();
	}
})

