//图片展示问题

var getImgSrcs = function(text) {
	var imgReg = /<img.*?(?:>|\/>)/gi;
	imgReg.lastIndex = 0;
	var imgs = text.match(imgReg);
		
	var len = imgs.length;
	var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
	var imgsSrcs = [];
	for (var k = 0; k < len; k++) {
		 srcReg.lastIndex = 0;
		 var src = imgs[k].match(srcReg);
		  
		 if(src[1]){
		    imgsSrcs.push(src[1]);
		 }
	}

	return imgsSrcs;
		
}
	
function loadImages(srcs, callback, text, width){  

    var count = 0,  
        images ={},  
        imgNum = srcs.length;
    
    for (var i = 0; i < imgNum; i++) {
    	
    	var src = srcs[i];
    	images[src] = new Image();  

    	(function(t){
	        images[t].onload = function(){  
	        		var img = images[t];
	        		
	        		if (img.width > width) {
	        		
	        			text = text.replace(new RegExp("(<img[^>]*src[\s]*=[\s]*[\'\"]*"+t+"[\'\"]*[^>]*>)", "gi"),"<div class='imgLongWrap'><span class='imgTip'>长图</span><br><img border=0 src="+t+"></div>");
	        		}
	                if(++count >= imgNum){  
	                   callback(text);
	                }  
	        }  
        })(src);

        images[src].src = src;  
    } 
}   
