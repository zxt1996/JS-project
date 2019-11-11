var province = [{
					name: "北京",
					id: 0
				},
				{
					name: "广东省",
					id: 1
				},
				{
					name: "山西省",
					id: 2
				}
			];
			var city = [{
					name: "北京市",
					id: 00,
					pId: 0
				},
				{
					name: "广州市",
					id: 01,
					pId: 1
				},
				{
					name: "深圳",
					id: 02,
					pId: 1
				},
				{
					name: "东莞",
					id: 03,
					pId: 1
				},
				{
					name: "汕尾",
					id: 04,
					pId: 1
				},
				{
					name: "茂名",
					id: 05,
					pId: 1
				},
				{
					name: "大同",
					id: 06,
					pId: 2
				},
				{
					name: "临汾",
					id: 07,
					pId: 2
				},
				{
					name: "太原",
					id: 08,
					pId: 2
				},
				{
					name: "朔州",
					id: 09,
					pId: 2
				}
			]
			var area = [{
					name: "朝阳区",
					id: 000,
					pId: 00
				},
				{
					name: "大兴",
					id: 001,
					pId: 00
				},
				{
					name: "天河",
					id: 002,
					pId: 01
				},
				{
					name: "白云区",
					id: 003,
					pId: 01
				},
				{
					name: "越秀区",
					id: 004,
					pId: 01
				},
				{
					name: "保安区",
					id: 005,
					pId: 02
				},
				{
					name: "福田区",
					id: 006,
					pId: 02
				},{
					name: "石碣镇",
					id: 001,
					pId: 03
				},{
					name: "石龙镇",
					id: 002,
					pId: 03
				},{
					name: "茶山镇",
					id: 003,
					pId: 03
				},{
					name: "海丰县",
					id: 001,
					pId: 04
				},{
					name: "陆河县",
					id: 002,
					pId: 04
				},{
					name: "陆丰市",
					id: 003,
					pId: 04
				},{
					name: "电白区",
					id: 001,
					pId: 05
				},{
					name: "茂南区",
					id: 002,
					pId: 05
				},{
					name: "高州市",
					id: 003,
					pId: 05
				},{
					name: "矿区",
					id: 001,
					pId: 06
				},{
					name: "城区",
					id: 002,
					pId: 06
				},{
					name: "南郊区",
					id: 003,
					pId: 06
				},{
					name: "尧都区",
					id: 001,
					pId: 07
				},
				{
					name: "襄汾县",
					id: 002,
					pId: 07
				},
				{
					name: "太原一区",
					id: 007,
					pId: 08
				},
				{
					name: "太原二区",
					id: 008,
					pId: 08
				},
				{
					name: "朔城区",
					id: 001,
					pId: 09
				},
				{
					name: "平鲁区",
					id: 002,
					pId: 09
				}
			]

let pro = document.querySelector('#province');
let cit = document.querySelector('#city');
let are = document.querySelector('#area');
let template;
province.forEach(function(ele,index){
	 template += `
				<option value="" id= "${ele.id}">${ele.name}</option>
`

})
pro.innerHTML = template;

let templatetwo;
city.forEach(function(ele,index){
	if(ele.pId == province[0].id){
		templatetwo += `
				<option value="">${ele.name}</option>
`
	}
})
cit.innerHTML = templatetwo;

let templatethree;
area.forEach(function(ele,index){
	if(ele.pId == city[0].id){
		templatethree += `
				<option value="">${ele.name}</option>
`
	}
})
are.innerHTML = templatethree;
//console.log(city);
pro.addEventListener('change',function(){
	let templatetwo;
	city.forEach(function(ele,index){
//		console.log(ele.id);
		if(parseInt(pro.options[pro.selectedIndex].id) == parseInt(ele.pId)){
			templatetwo += `
					<option value="" id= "${ele.id}">${ele.name}</option>
	`
		}
	})
	cit.innerHTML = templatetwo;
	
	let templatethree;
	area.forEach(function(ele,index){
		if(parseInt(cit.options[cit.selectedIndex].id) == parseInt(ele.pId)){
			templatethree += `
					<option value="" id= "${ele.id}">${ele.name}</option>
	`
		}
	})
	are.innerHTML = templatethree;
})

console.log(cit);
cit.addEventListener('change',function(){
//	console.log(cit.options[cit.selectedIndex].id);
	let templatethree;
	area.forEach(function(ele,index){
		if(parseInt(cit.options[cit.selectedIndex].id) == parseInt(ele.pId)){
			templatethree += `
					<option value="" id= "${ele.id}">${ele.name}</option>
	`
		}
	})
	are.innerHTML = templatethree;
})