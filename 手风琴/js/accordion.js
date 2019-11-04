var forfont = document.querySelectorAll('.forfont');
var forimg = document.querySelectorAll('.forimg');

//方法一
//forfont.forEach(function(ele,index){
//	forfont[index].addEventListener('click',function(){
//		forimg.forEach(function(eles,indexs){
//			if(indexs == index){
//				forimg[indexs].style.maxHeight = '300px';
//			}else{
//				forimg[indexs].style.maxHeight = '0';
//			}
//		})
//	})
//})

//方法二
//forfont.forEach(function(ele,index){
//	forfont[index].addEventListener('mouseenter',function(){
//		forimg[index].style.maxHeight = '300px';
//	})
//})
//
//forfont.forEach(function(ele,index){
//	forfont[index].addEventListener('mouseleave',function(){
//		forfont[index].removeEventListener('mouseenter',function(){
//			forimg[index].style.maxHeight = '300px';
//		});
//		forimg[index].style.maxHeight = '0';
//	})
//})

//方法三
//var count = 0;
//var forcli = function(index){
//	if(count == 0){
//		forimg[index].style.maxHeight = '300px';
//		count += 1;
//	}else{
//		forimg[index].style.maxHeight = '0';
//		count = 0;
//	}
//}
//forfont.forEach(function(ele,index){
//	forfont[index].addEventListener('click',forcli.bind(this,index));
//})

//方法四
//forfont.forEach(function(ele,index){
//	var count = 0;
//	var forcli = function(index){
//		if(count == 0){
//			forimg[index].style.maxHeight = '300px';
//			count += 1;
//		}else{
//			forimg[index].style.maxHeight = '0';
//			count = 0;
//		}
//	}
//	forfont[index].addEventListener('click',()=>forcli(index));
//})


