var data = {
				"users": [{
					"id": 301940,
					"slug": "ef4f2422125f",
					"nickname": "卢璐说",
					"avatar_source": "http://upload.jianshu.io/users/upload_avatars/301940/189d69dd-af7c-4290-9e2c-89e98acf3603.jpg",
					"total_likes_count": 27532,
					"total_wordage": 1268043,
					"is_following_user": false
				}, {
					"id": 9988193,
					"slug": "51b4ef597b53",
					"nickname": "董克平日记",
					"avatar_source": "http://upload.jianshu.io/users/upload_avatars/9988193/fc26c109-1ae6-4327-a298-2def343e9cd8.jpg",
					"total_likes_count": 2241,
					"total_wordage": 746832,
					"is_following_user": false
				}, {
					"id": 3950651,
					"slug": "ca5b9d6f94dc",
					"nickname": "三儿王屿",
					"avatar_source": "http://upload.jianshu.io/users/upload_avatars/3950651/acfaa0ce-42fe-424a-b7c8-9a0136fb96ec.jpg",
					"total_likes_count": 3546,
					"total_wordage": 166885,
					"is_following_user": false
				}, {
					"id": 14715425,
					"slug": "c5a2ce84f60b",
					"nickname": "简书钻首席小管家",
					"avatar_source": "http://upload.jianshu.io/users/upload_avatars/14715425/e0668349-8c75-43db-8a9d-c388e5f00d0d.jpg",
					"total_likes_count": 151156,
					"total_wordage": 196602,
					"is_following_user": false
				}, {
					"id": 3136195,
					"slug": "6810a6332de9",
					"nickname": "梅拾璎",
					"avatar_source": "http://upload.jianshu.io/users/upload_avatars/3136195/484e32c3504a.jpg",
					"total_likes_count": 29480,
					"total_wordage": 263756,
					"is_following_user": false
				}],
				"total_count": 39170
			};



var box = document.querySelector('.box');

function createone(onlyindex){
	var everyimg = data.users[onlyindex].avatar_source;
	var everyname = data.users[onlyindex].nickname;
	var likes_count = data.users[onlyindex].total_likes_count;
	var wordage = data.users[onlyindex].total_wordage;
	
	wordage = changenum(wordage);
	likes_count = changenum(likes_count);
	
	var template = `
			<li class="everyli">
				<div>
					<a class="avatar"><img class="allimg" src="${everyimg}"></a>
				</div>
				<div>
					<p class="rightp">
						<a class="username">${everyname}</a>
						<a class="follow"><i class="iconfont icon-add"></i>关注</a>
					</p>
					<p>写了${wordage}字 · ${likes_count}喜欢</p>
				</div>
			</li>
		`;
	console.log(template);
	return template;
}


//转变大于1000的数字
function changenum(num){
	if(num >= 1000){
		num = (num/1000).toFixed(1);
		let temp = num.toString().split('.');
		if(temp[1] == 0){
			return Math.floor(num) + 'k';
		}else{
			return num + 'k';
		}
	}else{
		return num;
	}
}

var result = "";
data.users.forEach(function(ele,index){
	result += createone(index);
})

box.innerHTML = result;