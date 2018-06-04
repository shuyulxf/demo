var categories = {
    "Food&Drink": "fd",
    "Games": "games",
    "Animals": "animals",
    "Cartoons": "cartoons",
    "Cars": "cars",
    "Girls": "girls",
    "Movies": "movies",
    "Sports": "sports",
    "Nature": "nature",
    "Space": "space",
    "Lifestyle": "lifestyle",
    "Palces": "palce"
}

var LISTURL = "./list.html?cate=";
var $keyword = $(".keyword");

$(".search-btn").on("click", function() {
    var keyword = $.trim($keyword.val());
    if (!keyword) {
        alert("Please input the theme you are looking for!");
        return; 
    }    
    keyword = keyword.toLocaleLowerCase();
    for (var name in categories) {
        if (name.toLocaleLowerCase().indexOf(keyword) != -1) {
            window.location = LISTURL + categories[name];
            return;
        }
    }
    alert("No Match theme!");
});


// themes 
var themes = {
    "fd": [
        {
            "picURL": "./images/fd-1.jpg"
        },
    ],
    "games": [

    ],
    "animals": [

    ],
    "cartoons": [

    ],
    "cars": [

    ],
    "girls": [

    ],
    "movies": [

    ],
    "sports": [

    ],
    "nature": [

    ],
    "space": [

    ],
    "lifestyle": [

    ],
    "palce": [

    ]
}

var findCategory = function(cate) {
    for (var name in categories) {
        if (categories[name] == cate) return name;
    }
}

function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
} 

var cate = getQueryString("cate"),
    category = findCategory(cate);
var theme = themes[cate];

var $cateHeader = $(".theme-list .header .cate");
$cateHeader.html(category);

var $LI　= $("li.hide");

for (var i = 0; i < theme.length; i++) {
    var $li = $LI.clone();
    $li.removeClass("hide");

    var item = theme[i];
    $li.find(".pic")[0].src = item.picURL;
}