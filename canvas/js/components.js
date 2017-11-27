/*
 * 方法说明
 * @method drawGrid
 * @param 
 * {
 *      cxt: canvas上下文，
 *      color: 网格颜色,
 *      stepX: 网格横向间隔
 *      stepY: 网格纵向间隔
 * } 参数名 参数说明
 * @return {void} 
 */
let drawGrid = (cxt, color, stepX, stepY) => {

    if (!cxt) throw Error("canvas context does not exist");
    
    let canvas = cxt.canvas,
        w = canvas.width,
        h = canvas.height;

    cxt.strokeStyle = color;
    cxt.lineWidth = 1;

    for (let i = 0.5; i <= w; i += stepX) {

        cxt.beginPath();
        cxt.moveTo(i, 0);
        cxt.lineTo(i, h);
        cxt.stroke();
    }

    for (let j = 0.5; j <= h; j += stepY) {

        cxt.beginPath();
        cxt.moveTo(0, j);
        cxt.lineTo(w, j);
        cxt.stroke();
    }     
}

/*
 * 方法说明
 * @method drawCoordinateAxis
 * @param 
 * {
 *      cxt: canvas上下文,
 *      color: 坐标颜色,
 *      stepX: 起始横坐标,
 *      stepY: 起始纵坐标,
 *      rulerH: 标尺高度,
 *      scaleW: 刻度宽度,
 *      scaleH: 刻度高度,
 *      stepX: 水平方向刻度单位,
 *      stepY: 竖直方向刻度单位
 * } 
 * @return {void} 
 */
let drawCoordinateAxis = (cxt, color, startX, startY, rulerH = 0.5, scaleW = 0.5, scaleH = 1, stepX = 5, stepY = 5) => {
    
    if (!cxt) throw Error("canvas context does not exist");

    let canvas = cxt.canvas,
        W = canvas.width,
        H = canvas.height;

    
    let correctPixelDelta = (x) => x % 2 == 0 ? 0 : 0.5;
    cxt.strokeStyle = color;

    let drawHorizontalArrow = (x, y) => {

        let deltaX = 5,
            deltaY = 3;

        cxt.lineWidth = 0.5;

        cxt.beginPath();
        cxt.moveTo(x, y);
        cxt.lineTo(x - deltaX, y - deltaY);
        cxt.lineTo(x + deltaX, y);
        cxt.lineTo(x - deltaX, y + deltaY);
        cxt.closePath();
        cxt.stroke();
        cxt.fillStyle = color;
        cxt.fill();
    }

    let drawVerticalArrow = (x, y) => {
        
        let deltaY = 5,
            deltaX = 3;

        cxt.lineWidth = 0.5;

        cxt.beginPath();
        cxt.moveTo(x, y);
        cxt.lineTo(x - deltaX, y + deltaY);
        cxt.lineTo(x, y - deltaY);                                                                                                                                                             
        cxt.lineTo(x + deltaX, y + deltaY);
        cxt.closePath();
        cxt.stroke();
        cxt.fillStyle = color;
        cxt.fill();
    }

    let drawHorizontalAxis = () => {
        
        let delta = rulerH / 2 >= 1 ? 1 : rulerH/2;

        cxt.beginPath();
        cxt.lineWidth = rulerH;
        cxt.moveTo(startX + delta, startY + delta);
        cxt.lineTo(W - startX - delta, startY + delta);
        cxt.stroke();
        drawHorizontalArrow(W - startX - delta + 1, startY + delta);
        drawHorizontalScale(W - startX - delta + 1, startY + delta)
    }

    let drawVerticalAxis = () => {
        let delta = rulerH / 2 >= 1 ? 1 : rulerH / 2;
        
        cxt.beginPath();
        cxt.lineWidth = rulerH;
        cxt.moveTo(startX + delta, startY + delta);
        cxt.lineTo(startX + delta, H - startY - delta);
        cxt.stroke();
        drawVerticalArrow(startX + delta, H - startY - delta - 1);
        drawVerticalScale(startX + delta,  H - startY - delta - 1);
    }

    let drawHorizontalScale = (endX, endY) => {

        let scaleWNum = Math.floor((endX - startX) / 5 / stepX) * 5,
            deltaX = scaleW / 2;
        let delta = rulerH / 2 >= 1 ? 1 : rulerH / 2;
        let deltaPixel = scaleW % 2 == 0 ? 0 : 0.5;

        for (let i = 1; i <= scaleWNum; i++) {

            let deltaY = i % 5 == 0 ? scaleH : scaleH / 2;

            cxt.lineWidth = scaleW;
            cxt.beginPath();
            cxt.moveTo(startX + i * stepX + deltaPixel, startY + delta - deltaY);
            cxt.lineTo(startX + i * stepX + deltaPixel, startY + delta + deltaY);
            cxt.stroke();
        }
    }

    let drawVerticalScale = (endX, endY) => {
        
        let scaleWNum = Math.floor((startY - endY) / 5 / stepY) * 5,
            deltaY = scaleW / 2 ;
        let delta = rulerH / 2 >= 1 ? 1 : rulerH / 2;
        let deltaPixel = scaleW % 2 == 0 ? 0 : 0.5;

        for (let i = 1; i <= scaleWNum; i++) {

            let deltaX = i % 5 == 0 ? scaleH : scaleH / 2;

            cxt.lineWidth = scaleW;
            cxt.beginPath();
            cxt.moveTo(startX + delta - deltaX, startY - i * stepY + deltaPixel);
            cxt.lineTo(startX + delta + deltaX, startY - i * stepY + deltaPixel);
            cxt.stroke();
        }
    }
        
    drawHorizontalAxis();
    drawVerticalAxis();
}


