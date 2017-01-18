//get the canvas element
var canvas;

//get the 2d context out of canvas el
var context;

//get width and height of canvas el
var width;
var height;
    


var xBoard = 0;
var oBoard = 0;
var begin = true;

function drawBoard() {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 2;

    // var vl1 = Math.round(width / 3);
    // var vl2 = Math.round(vl1*2);
    // var hl1 = Math.round(height / 3);
    // var hl2 = Math.round(hl1*2);

    /*
    context.moveTo(vl1, 0);
    context.lineTo(vl1, height);

    context.moveTo(vl2, 0);
    context.lineTo(vl2, height);

    context.moveTo(0, hl1);
    context.lineTo(width, hl1);

    context.moveTo(0, hl2);
    context.lineTo(width, hl2);
    */
    //var w3 = Math.round(width/3);

    // for(y=1; y<3; y++){
    //     context.moveTo(0, Math.round(w3*y));
    //     context.lineTo(width, Math.round(w3*y));
    // }

    // var h3 = Math.round(height/3);

    // for(x=1;x<3;x++){
    //     context.moveTo(Math.round(h3*x), 0);
    //     context.lineTo(Math.round(h3*x), height);
    // }
    var w3 = width/3;
    var h3 = height/3;

    for(i=1;i<3;i++){
        context.moveTo(0, w3*i);
        context.lineTo(width, w3*i);
        context.moveTo(h3*i, 0);
        context.lineTo(h3*i, height);
    }
    context.stroke();
    context.closePath();


}

function init(canvasID){
    canvas = document.getElementById(canvasID);
    context = canvas.getContext('2d');
    width=canvas.width;
    height = canvas.height;

    console.log('width:' + width + '\n' + 'height: ' + height);

     canvas.addEventListener('click', clickHandler);

     drawBoard();
}


function drawX(x, y) {
    context.beginPath();
    context.strokeStyle = '#ff0000';
    context.lineWidth = 4;

    // var ox = (width / 3) * .1;
    // var bx = ox + x * (width / 3);
    // var ex = -ox + (x + 1) * (width / 3);

    // var oy = (height / 3) * .1;
    // var by = oy + y * (height / 3);
    // var ey = -oy + (y + 1) * (height / 3);

    // context.moveTo(bx, by);
    // context.lineTo(ex, ey);

    // context.moveTo(bx, ey);
    // context.lineTo(ex, by);

    var w3 = width/3;
    var h3 = height/3;
    var ix = Math.floor(x/w3);
    var iy = Math.floor(y/h3);

    var x0 = ix*w3;
    var x1 = x0+w3;

    var y0 = iy*h3;
    var y1 = y0+h3;

    context.moveTo(x0,y0);
    context.lineTo(x1,y1);

    context.moveTo(x0, y1);
    context.lineTo(x1, y0);

    context.stroke();
    context.closePath();

}

function clickHandler(event) {

    var x = event.clientX;
    var y = event.clientY;
    var x1 = canvas.offsetLeft;
    var y1 = canvas.offsetTop;

    console.log('x: ' + x);
    console.log('y: ' + y);
    console.log('x1: ' + x1);
    console.log('y1: ' + y1);

    drawX(x-x1, y-y1);

    // var x = Math.floor((event.clientX-canvas.offsetLeft)/(width/3));
    // var y = Math.floor((event.clientY - canvas.offsetTop) / (height / 3));

    // var bit = (1 << x + (y * 3));

    // console.log('ch:x=' + x + " ,y=" + y + " ,b=" + bit);
    // if (isEmpty(xBoard, oBoard, bit)) {
    //     markBit(bit, 'X');
    //     if (!checkTie()) {
    //         if (checkWinner(xBoard)) {
    //             alert('You Win!');
    //             score.win++;
    //             restart();
    //         } else {
    //             play();
    //             if (!checkTie()) {
    //                 if (checkWinner(oBoard)) {
    //                     alert('You Lost!');
    //                     score.lost++;
    //                     restart();
    //                 }
    //             } else {
    //                 score.tie++;
    //             }

    //         }
    //     } else {
    //         score.tie++;
    //     }



    // } else {
    //     alert('cell occupied');
    // }
}
