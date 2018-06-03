function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
} 

var id = getQueryString("id");
if (id == null) alert("Please define the food that to be viewed！");

var lists = {
    "bj": [{
        "en": "Beijing Roast Duck",
        "cn": "(北京烤鸭)"
    },{
        "en": "Mongolian Hot Pot",
        "cn": "(涮羊肉)"
    },{
        "en": "Crystal Pork Knuckle",
        "cn": "(水晶肘子)"
    },{
        "en": "Sauted Shredded Porkin Sweet Bean Sauce",
        "cn": "(京酱肉丝)"
    }],
    "cq": [{
        "en": "Numb Spicy Hot",
        "cn": "(麻辣烫)"
    },{
        "en": "Hot and Sour Rice Noodles",
        "cn": "(酸辣粉)"
    },{
        "en": "Dandan Noodles",
        "cn": "(担担面)"
    },{
        "en": "Gross blood in Mong Kok",
        "cn": "(毛血旺)"
    }],
    "xm": [{
        "en": "Noodles with Satay Sauce",
        "cn": "(沙茶面)"
    },{
        "en": "Fried Oyster with Egg",
        "cn": "(海蛎煎)"
    },{
        "en": "Fish Balls in the Alley",
        "cn": "(原巷口鱼丸)"
    },{
        "en": "Peanut Soup",
        "cn": "(花生汤)"
    }],
    "gz": [{
        "en": "Ginger Milk",
        "cn": "(姜撞奶)"
    },{
        "en": "Cantonese Mooncake",
        "cn": "(广式月饼)"
    },{
        "en": "Water Chestnut Pudding",
        "cn": "(马蹄糕)"
    },{
        "en": "Steamed Dumplings",
        "cn": "(干蒸烧卖)"
    }],
    "xa": [{
        "en": "Hanzhong Liangpi",
        "cn": "(汉中凉皮)"
    },{
        "en": "Pita Bread Soaked in Lamb Soup",
        "cn": "(羊肉泡馍)"
    },{
        "en": "Dry County GuoKui",
        "cn": "(乾县锅盔)"
    },{
        "en": "Qishan Saozi Noodles",
        "cn": "(岐山臊子面)"
    }],
    "wh": [{
        "en": "Hot Noodles with Sesame Paste",
        "cn": "(热干面)"
    },{
        "en": "Tofu Skin",
        "cn": "(豆皮)"
    },{
        "en": "Soup Dumpling",
        "cn": "(汤包)"
    },{
        "en": "Simmer Soup",
        "cn": "(煨汤)"
    }],
    "hz": [{
        "en": "Hangzhou Cat Ear",
        "cn": "(杭州猫耳朵)"
    },{
        "en": "Southern Song Victory Cake",
        "cn": "(南宋定胜糕)"
    },{
        "en": "Shallot Stuffed Pancake",
        "cn": "(葱包桧)"
    },{
        "en": "Wushan Hill Crisp Cake",
        "cn": "(吴山酥油饼)"
    }],
    "cs": [{
        "en": "Glutinous Rice Zongzi",
        "cn": "(糯米粽子)"
    },{
        "en": "Stinky Tofu",
        "cn": "(臭豆腐)"
    },{
        "en": "Cannabis Candy",
        "cn": "(麻仁奶糖)"
    },{
        "en": "Hibiscus Sanxian Hotpot",
        "cn": "(芙蓉三鲜火锅)"
    }]
}

var cities = {
    "bj": "北京(Beijing)",
    "cq": "重庆(Chongqing)",
    "wh": "武汉(Wuhan)",
    "cs": "长沙(Changsha)",
    "hz": "杭州(Hangzhou)",
    "xa": "西安(Xian)",
    "xm": "厦门(Xiamen)",
    "gz": "广州(Guangzhou)"
}


var $LI = $(".item.hide");
var $itemWrap = $(".item-wrap");

var list = lists[id];

$(".header").html(cities[id]);

for (var i = 0; i < list.length; i++) {
 
   var item = list[i];

   var $li = $LI.clone();
   $li.removeClass("hide");
   
   $li.find("a").attr("href", "./detail.html?id=" + id + (i+1));
   $li.find("img").attr("src", "./images/" + id + "-" + (i+1) + ".png");
   $li.find(".en").html(item.en);
   $li.find(".cn").html(item.cn);

   $itemWrap.append($li);
}
