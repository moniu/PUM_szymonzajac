let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
let time = 0;

document.onclick = clickHandler;
document.onkeydown = keyHandler;

let linesX = 19;
let linesY = 19;
let pieceSizeX = 800 / (linesX+1)
let pieceSizeY = 600 / (linesY+1)

const pieceState = {
    Empty: "Empty",
    Black: "Black",
    White: "White"
};

let board = new Array(linesY)
for (var y=0; y < linesY; y++){
    board[y] = new Array(linesX);
    for (var x=0; x<linesX; x++) {
        board[y][x] = pieceState.Empty;
    }
}

let turn = "Black";

ctx.font = '16px Consolas';
refreshCanvas()

function refreshCanvas() {
    paintBackground()
    paintAllPieces()
    printWhoseTurn()
}

function paintBackground() {
    ctx.fillStyle = "#BBB145";
    ctx.fillRect(0, 0, 800, 600);

    ctx.fillStyle = "#FFF"
    for(var x = 0; x < linesX; x++) {
        ctx.beginPath();
        ctx.moveTo(pieceSizeX*(x+1), pieceSizeY)
        ctx.lineTo(pieceSizeX*(x+1), 600-pieceSizeY)
        ctx.stroke();
    }

    for(var y = 0; y < linesY; y++) {
        ctx.beginPath();
        ctx.moveTo(pieceSizeX, pieceSizeY*(y+1))
        ctx.lineTo(800 - pieceSizeX, pieceSizeY*(y+1))
        ctx.stroke();
    }
}

function paintAllPieces() {
    for (var y=0; y < linesY; y++){
        for (var x=0; x<linesX; x++) {
            paintPiece(x, y, board[y][x])
        }
     }
}

function paintPiece(x, y, color) {
    if (color == pieceState.Empty) {
        return;
    }
    if (color == pieceState.White) {
        ctx.fillStyle = "#EEE";
    }
    if (color == pieceState.Black) {
        ctx.fillStyle = "#111";
    }

    var radius = Math.min(pieceSizeX, pieceSizeY)/2.2;

    ctx.beginPath();
    ctx.arc((x+1) * pieceSizeX, (y+1) * pieceSizeY, radius, 0, Math.PI * 2);
    ctx.fill();
}

function printWhoseTurn() {
    ctx.fillStyle = "#FFF"
    ctx.fillText(turn+"s turn",5,12)
}

function swapTurn() {
    if (turn == pieceState.White)
        turn = pieceState.Black
    else turn = pieceState.White
}

function keyHandler(event) {
    if (event.which == 32) {
        swapTurn();
        refreshCanvas();
        return;
    }
}

function getBoardClone() {
    return JSON.parse(JSON.stringify(board));
}

function clickHandler(event) {
    var clickedX = Math.round(event.offsetX/pieceSizeX) - 1;
    var clickedY = Math.round(event.offsetY/pieceSizeY) - 1;

    if (board[clickedY][clickedX] == pieceState.Empty) {
        board[clickedY][clickedX] = turn;
        swapTurn();
    }
    refreshCanvas();
}