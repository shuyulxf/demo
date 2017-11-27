let cxt = test.getContext('2d');

// //画网格
// drawGrid(cxt, 'lightgray', 10, 10);
// //画坐标系
// drawCoordinateAxis(cxt, 'blue', 40, 360, 2, 2, 5, 10, 10);

cxt.beginPath();
cxt.arcTo(50, 0, 0, 50, 30);
cxt.stroke();