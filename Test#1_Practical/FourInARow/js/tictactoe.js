

//get the canvas element
var canvas;

//get the 2d context out of canvas el
var context;

//get width and height of canvas el
var width;
var height;

var score = {
    win: 0,
    lost: 0,
    tie:0
};

var xBoard = 0;
var oBoard = 0;
var begin = true;

function drawBoard() {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 2;

    var w3 = width/4;
    var h3 = height/4;

    for(i=1;i<4;i++){
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

    var w3 = width/3;
    var h3 = height/3;
    var ix = Math.floor(x/w3);
    var iy = Math.floor(y/h3);

    var x0 = ix*w3;
    var x1 = x0+w3;

    var y0 = iy*h3;
    var y1 = y0+h3;

    context.arc((x0+1)/2, (y0+y1)/2);

    context.moveTo(x0,y0);
    context.lineTo(x1,y1);

    context.moveTo(x0, y1);
    context.lineTo(x1, y0);

    context.stroke();
    context.closePath();

}

function isEmpty(xBoard, oBoard, bit) {
    return (((xBoard & bit) == 0) && ((oBoard & bit) == 0));
}

function markBit(markBit, player, x, y) {
    if (player === 'O') {
        oBoard = oBoard | markBit;
        drawO(x, y);
    } else {
        xBoard = xBoard | markBit;
        drawX(x, y);
    }
}

function play(){
    var bestPlay = simulate(oBoard, xBoard);
    markBit(bestPlay, 'O');
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

    var x = Math.floor((event.clientX-canvas.offsetLeft)/(width/3));
    var y = Math.floor((event.clientY - canvas.offsetTop) / (height / 3));

    var bit = (1 << x + (y * 3));

    cosole.log('bit:' + bit);

    if(isEmpty(xBoard, oBoard, bit)){
        markBit(bit, 'X', x-x1, y-y1);
        //AI Action
        if(checkWinner(xBoard)){
            alert('You Win!');
            score.win++;
            //restart();
        } else {
            //console.log('Play AI');
            //
            play();

        }
    }else{
        alert('cell occupied');
    }

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
