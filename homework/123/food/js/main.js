var foods = {
    "bj1": {
        "name" : "Beijing Roast Duck(北京烤鸭)",
        "pic"  : "./images/bj-1.png",
        "": "1 Duck meat<br>1 apple<br>1 small piece of ginger<br>1 can of coke<br>1 small spoon of baking powder<br>2green onion"
    }
}


function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
} 

var id = getQueryString("id");
if (id == null) alert("Please define the food that to be viewed！");

var food = foods[id];

var $foodName = $(".food-name"),
    $foodPic = $(".food-pic");

$foodName.html(food.name);
debugger
$foodPic[0].src = food.pic