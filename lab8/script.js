let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
let time = 0;

let linesX = 19;
let linesY = 19;
let pieceSizeX = 800 / (linesX+1)
let pieceSizeY = 600 / (linesY+1)


let turn = "Black";

ctx.font = '64px Consolas';

var refreshInterval = setInterval(() => {
    paintBackground()
}, 4)



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

function paintPiece(x, y, color) {
    if (color == "Black") {
        ctx.fillStyle = "#EEE";
    }
    if (color == "White") {
        ctx.fillStyle = "#111";
    }

    
}

function paintEnemy(enemy) {
    ctx.fillStyle = "#252525";

    ctx.beginPath()
    ctx.arc(enemy.x-40, enemy.y+25, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1A1A92";
    ctx.fillRect(enemy.x - 75, enemy.y - 25, 150, 50);
}
