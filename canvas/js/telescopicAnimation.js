(function(){
    let TetescopicAnimation = function(options) {
       
        this.init(options);
    }
    TetescopicAnimation.prototype = {
        init: function(opts) {

            let defautOptions = {
                fillStyle: "lightgray"
            }
            this.options = extend(defautOptions, opts);
        },
        drawCircle: function(radius){
            
            let {cxt, arcAttrs} = this.options; 
            let canvas = cxt.canvas;

            cxt.beginPath();
            cxt.arc(canvas.width/2, canvas.height/2, radius, 0, Math.PI * 2);
            cxt.closePath();
        },
        fill: function(color) {
            
            let {cxt} = this.options;
            let canvas = cxt.canvas;
            cxt.fillStyle = color;
            cxt.fillRect(0, 0, canvas.width, canvas.height);
        },
        setClipRegion: function(radius) {
            
            let {cxt} = this.options;
            this.drawCircle(radius);
            cxt.clip();
        },
        drawText: function() {

            let {textAttrs, cxt} = this.options;
            cxt.save();
            if (textAttrs) {

                let {shadowColor, fillStyle, strokeStyle, text} = textAttrs;

                if (shadowColor) cxt.shadowColor = shadowColor;
                cxt.shadowOffsetX = 5;
                cxt.shadowOffsetY = 5;
                cxt.shadowBlur = 10;
                
                let canvas = cxt.canvas;
                let width = canvas.width, 
                    height = canvas.height;
                let fontSize = Math.floor(Math.min(height, width)/2);

                cxt.font = fontSize + "px Arial";  
                let fontWidth = cxt.measureText(text).width;
                while (fontWidth > width) {

                    fontSize = Math.floor(fontSize * 0.8);
                    cxt.font =  fontSize + "px Arial";  
                    fontWidth = cxt.measureText(text).width;
                }
                
                let top = height / 2,
                    left = (width - fontWidth) / 2;

                cxt.textBaseline = "middle";
                if (fillStyle) cxt.fillStyle = fillStyle;
                cxt.fillText(text, left, top); 
                if (strokeStyle) cxt.strokeStyle = strokeStyle;
                cxt.strokeText(text, left, top);
            }
            cxt.restore();
        },
        drawAnimationFrame(radius) {
        
            let {cxt, innerColor} = this.options;
            this.setClipRegion(radius);
            this.fill(innerColor);
            this.drawText();
        },
        
        animate: function() {

            let {bgColor, cxt} = this.options;
            let that = this,
                canvas = cxt.canvas,
                radius = cxt.canvas.width / 2;

            let helper = function() {
                that.fill(bgColor);

                cxt.save();
                that.drawAnimationFrame(radius);
                cxt.restore();
                radius -= 3;
                
                if (radius < 0) {
                    cxt.clearRect(0, 0, canvas.width, canvas.height);
                    that.drawText();
                } else {
                    requestAnimationFrame(helper);
                }
            }

            requestAnimationFrame(helper);
        }
        
    }

    window.TetescopicAnimation = TetescopicAnimation;
})();