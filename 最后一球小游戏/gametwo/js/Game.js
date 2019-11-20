function bump(obj1, obj2) {
	var obj1Info = obj1.getBoundingClientRect();
	console.log(obj1Info)
	var obj2Info = obj2.getBoundingClientRect();
	console.log(obj2Info)
	var t1 = obj1Info.top
	l1 = obj1Info.left
	r1 = obj1Info.right
	b1 = obj1Info.bottom

	var t2 = obj2Info.top
	l2 = obj2Info.left
	r2 = obj2Info.right
	b2 = obj2Info.bottom
	if(r1 < l2 || l1 > r2 || t1 > b2 || b1 < t2) {
		console.log("没有碰到")
		return false
	} else {
		console.log("碰到了")
		return true
	}

}
//点击开始,切换界面
var sPage = document.querySelector(".sPage")
var iPage = document.querySelector(".iPage")
var startBtn = document.querySelector(".sPage button")
startBtn.addEventListener("click", function() {
	sPage.classList.add("active1")
	iPage.classList.add("active2")
	getCircle()
	//	防止超出屏幕，如果超出屏幕的top/left，则让球贴边

	iPage.addEventListener("click", (event) => {
		console.log(event.target);
		var allBall = document.querySelectorAll(".iPage div");
		//	通过 getCircle 拿到每次新创建出来的圆,为下一步碰撞检测提供检测对象
		if(event.target == iPage.lastChild){
			var newCircle = getCircle();
			console.log(newCircle)

			function check(target) {
				allBall.forEach((e) => {
					//		如果新生成的圆与已有的元碰撞,则移除新圆并重新创建新圆
					if(bump(e, target)) {
						//			1.先移除
						target.remove()
						//			2.再创建
						var newCircle = getCircle()
						//			3.通过递归传入新创建的圆，重新进行判断
						check(newCircle)
					}
				})
			}
			check(newCircle)
		}
	})
})
//随机生成一个圆
function getCircle() {
	var div = document.createElement("div");
	var clientW = document.documentElement.clientWidth; //获取当前页面的宽度
	var clientH = document.documentElement.clientHeight; //获取当前页面的高度
	//随机生成球的宽高,且数字不小于15		
	var divW = divH = Math.floor(Math.random() * 60 + 15);
	//	随机生成top值,left值
	var divT = Math.floor(Math.random() * clientW);
	var divL = Math.floor(Math.random() * clientH);
	//	防止超出屏幕，如果超出最大top/left,则让球贴边
	divT > clientH - divH ? divT = clientH - divH : '';
	divL > clientW - divW ? divL = clientW - divW : '';

	div.style.width = `${divW}px`;
	div.style.height = `${divH}px`;
	div.style.top = `${divT}px`
	div.style.left = `${divL}px`
	div.style.borderRadius = "50%"
	div.style.backgroundColor = "white"
	div.style.position = "absolute"
	iPage.appendChild(div);
	ball = document.querySelectorAll(".iPage div");
	return div
}



