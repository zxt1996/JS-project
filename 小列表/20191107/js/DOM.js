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

function createone(onlyindex){
	
	var everyimg = data.users[onlyindex].avatar_source;
	var everyname = data.users[onlyindex].nickname;
	var likes_count = data.users[onlyindex].total_likes_count;
	var wordage = data.users[onlyindex].total_wordage;
	
	wordage = changenum(wordage);
	likes_count = changenum(likes_count);
	
	var box = document.querySelector('.box');
	var everyli = document.createElement('li');
	var avatar = document.createElement('a');
	var username = document.createElement('a');
	var follow = document.createElement('a');
	var rightp = document.createElement('p');
	var left = document.createElement('div');
	var right = document.createElement('div');
	var everyp = document.createElement('p');
	var fontnum = document.createElement('span');
	var img = document.createElement('img');
	var fori = document.createElement('i');
	
	var onlyfont = "写了"+wordage + "字 · "+ likes_count+"喜欢";
	
	var nametext = document.createTextNode(everyname);
	var innerfontnum = document.createTextNode(onlyfont);
	var followfont = document.createTextNode('关注');
	img.src = everyimg;

	fori.classList.add('iconfont');
	fori.classList.add('icon-add');
	avatar.classList.add('avatar');
	img.classList.add('allimg');
	everyli.classList.add('everyli');
	fontnum.classList.add('fontnum');
	username.classList.add('username');
	follow.classList.add('follow');
	rightp.classList.add('rightp');
	
	
	avatar.appendChild(img);
	left.appendChild(avatar);
	everyli.appendChild(left);
	
	username.appendChild(nametext);
	rightp.appendChild(username);
	follow.appendChild(fori);
	rightp.appendChild(follow);

	fontnum.appendChild(innerfontnum);
	
	follow.appendChild(followfont);
	
	everyp.appendChild(fontnum);
	right.appendChild(rightp);
	right.appendChild(everyp);
	everyli.appendChild(right);
	
	
	box.appendChild(everyli);
}

//转变大于1000的数字
function changenum(num){
	if(num >= 1000){
		let temp = Math.floor(num/10000);
		num = Math.floor(num/1000);
		if((num-temp*10) == 0){
			return num + 'k';
		}else{
			return num + '.' + (num-temp*10) + 'k';
		}
	}else{
		return num;
	}
}

data.users.forEach(function(ele,index){
	createone(index);
})