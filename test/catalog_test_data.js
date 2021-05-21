export default {
	units: [
		"双",
		"只",
		"个",
		"提",
		"盒",
		"本",
		"支",
		"瓶",
		"包",
		"袋",
		"套",
		"对",
		"件",
		"把",
		"500g",
		"条",
		"台",
		"罐",
		"打",
		"公斤",
		"箱",
		"卷",
		"挂"
	],
	category: [{
			id: '0',
			name: "全部",
		},
		{
			id: '1',
			name: "生鲜",
			sub: [{
					id: "211",
					name: "水产"
				}, {
					id: "2134",
					name: "鲜肉",
					sub: [{
						id: "754",
						name: "猪肉及分割品"
					}, {
						id: "234",
						name: "禽类"
					}]
				}, {
					id: "98874",
					name: "水果"
				},
				{
					id: "9874",
					name: "蔬菜"
				},
				{
					id: "987",
					name: "熟食"
				}
			]
		},
		{
			id: "2",
			name: "粮油",
			sub: [{
					id: "23412",
					name: "食用油",
					sub: [{
							id: "4767",
							name: "菜籽油",
						}, {
							id: "0853",
							name: "花生油",
						}, {
							id: "083553",
							name: "调和油",
						},
						{
							id: "0553",
							name: "大豆油",
						},
						{
							id: "083553",
							name: "玉米油",
						}
					]
				},
				{
					id: "212",
					name: "粮食"
				},
				{
					id: "212325",
					name: "速食"
				},
			]
		},
		{
			id: "3",
			name: "文玩"
		},
		{
			id: "4",
			name: "日化",
			sub: [{
				id: "234",
				name: "纸品"
			}, {
				id: "24",
				name: "清洁用品"
			}, {
				id: "224",
				name: "杀虫芳香"
			}]
		},
		{
			id: "5",
			name: "文玩"
		},
		{
			id: "6",
			name: "烟酒"
		},
		{
			id: "7",
			name: "散点"
		},
		{
			id: "8",
			name: "五金家电"
		},
		{
			id: "9",
			name: "针织服饰"
		},
		{
			id: "10",
			name: "家居百货"
		},
	],
	catalog: [{
			id: "201451060435585024",
			name: '彩虹柠檬香电热灭蚊香液',
			barcode: 6907861191394,
			specs: '150ml',
			placeOfOrigin: '四川.成都',
			grade: '合格品',
			category_id: "224",
			retailPrice: '19.59/盒',
			memberPrice: '18.00/盒',
			vipPrice: '0.00/盒',
			vip: {
				referenceSalePrice: '19.00/瓶',
				referencePurchasePrice: '12.60/瓶'
			},
			storage: {
				lastPurchasePrice: '13.00/瓶',
				amount: 226,
				number: 12,
				stockTurn: 1.33
			},
			promotion: {
				title: '5.1节会员促销',
				price: '1450.00/公斤',
				startDate: "2021-05-06 00:00:00",
				endDate: "2021-05-07 23:59:59",
				explain: '厂家回馈用户，只限于本店PLUS会员用户'
			},
		}, {
			plu: 133,
			name: '广西沃柑',
			specs: '500g',
			placeOfOrigin: '广西.桂林',
			grade: '合格品',
			category_id: "98874",
			retailPrice: '4.59/500g',
			memberPrice: '4.00/500g',
			vipPrice: '2.50/500g',
			vip: {
				referenceSalePrice: '3.99/500g',
				referencePurchasePrice: '1.99/500g'
			},
			storage: {
				lastPurchasePrice: '1.786/500g',
				amount: 22.36,
				number: 10.58,
				stockTurn: 22.756
			},
		}, {
			id: '201452393217567744',
			name: '哇哈哈营养快线水果牛奶饮品（菠萝味）',
			barcode: 6902083898625,
			specs: '550ml',
			placeOfOrigin: '浙江.杭州',
			grade: '合格品',
			retailPrice: '11.98/瓶',
			memberPrice: '10.98/瓶',
			vipPrice: '4.98/瓶',
			vip: {
				referenceSalePrice: '12.00/瓶',
				referencePurchasePrice: '6.98/瓶'
			},
			storage: {
				lastPurchasePrice: '5.98/瓶',
				amount: 420,
				number: 70,
				stockTurn: 10.25
			},
		}, {
			id: '201452853459475457',
			name: '川骄无芯卷纸（白四层）',
			barcode: 6970981171003,
			specs: '1800g',
			placeOfOrigin: '四川.彭州',
			grade: '合格品',
			retailPrice: '11.98/提',
			memberPrice: '0.00/提',
			vipPrice: '0.00/提',
		}, {
			id: '201452966564125697',
			name: '云南三七牙膏（清新留兰）',
			barcode: 6953067200880,
			specs: '220g',
			placeOfOrigin: '云南.昆明',
			grade: '合格品',
			retailPrice: '34.88/支',
			memberPrice: '32.88/支',
			vipPrice: '0.00/支',
			vip: {
				referenceSalePrice: '32.88/支',
				referencePurchasePrice: '29.88/支',
			}
		},
		{
			plu: 123,
			name: '红苋菜',
			specs: '500g',
			placeOfOrigin: '江阳区',
			grade: '合格品',
			category_id: "98874",
			retailPrice: '0.99/500g',
			memberPrice: '0.95/500g',
			vipPrice: '0.85/500g',
			vip: {
				referenceSalePrice: '1.59/500g',
				referencePurchasePrice: '0.59/500g'
			},
			storage: {
				lastPurchasePrice: '0.652/500g',
				amount: 3.578,
				number: 6.587,
				stockTurn: 12.24
			},
		},
		{
			id: '201452966564158972',
			name: '菊品郁金银屑片',
			barcode: '6926094418474',
			specs: '100片',
			placeOfOrigin: '陕西.商洛市',
			grade: '合格品',
			vip: {
				referenceSalePrice: '45.25/瓶',
				referencePurchasePrice: '23.33/瓶'
			},
			storage: {
				lastPurchasePrice: '22.47/瓶',
				amount: 240.23,
				number: 12,
				stockTurn: 7.33
			},
			retailPrice: '49.98/支',
			memberPrice: '38.88/支',
			vipPrice: '35.00/瓶',
		}, {
			id: '201452966564158973',
			name: '阿维A胶囊',
			barcode: '6920327600247',
			specs: '10粒/板*3板',
			placeOfOrigin: '重庆市',
			grade: '合格品',
			vip: {
				referenceSalePrice: '20.30/盒',
				referencePurchasePrice: '12.45/盒'
			},
			storage: {
				lastPurchasePrice: '11.11/盒',
				amount: 14.43,
				number: 1,
				stockTurn: 0.33
			},
			retailPrice: '19.80/盒',
			memberPrice: '18.80/盒',
			vipPrice: '0.00/盒',
		}, {
			id: '201452966564158974',
			name: '阿莫西林胶囊',
			barcode: '6931435340314',
			specs: '0.25g*50粒',
			placeOfOrigin: '黑龙江.哈尔滨市',
			grade: '合格品',
			vip: {
				referenceSalePrice: '20.30/盒',
				referencePurchasePrice: '12.45/盒'
			},
			storage: {
				lastPurchasePrice: '11.11/盒',
				amount: 14.43,
				number: 1,
				stockTurn: 0.33
			},
			retailPrice: '9.80/盒',
			memberPrice: '8.80/盒',
			vipPrice: '0.00/盒',
		},
		{
			id: '201452564158974',
			name: '伊利金典有机纯牛奶',
			barcode: '6907992508191',
			specs: '250ml',
			placeOfOrigin: '内蒙古.呼和浩特市',
			grade: '合格品',
			vip: {
				referenceSalePrice: '5.30/盒',
				referencePurchasePrice: '4.852/盒'
			},
			storage: {
				lastPurchasePrice: '4.785/盒',
				amount: 180,
				number: 36,
				stockTurn: 21.98
			},
			retailPrice: '5.29/盒',
			memberPrice: '0.00/盒',
			vipPrice: '4.98/盒',
		}
	]
}
