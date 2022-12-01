let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
let time = 0;
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

let leftArrowKeyCode = 37;
let rightArrowKeyCode = 39;
let spacebarKeyCode = 32;
let upArrowKeyCode = 38;
let downArrowKeyCode = 40;
let aKeyCode = 65;
let zKeyCode = 90;

let playerSpeed = 10;
let playerPosX = 400;
let playerPosY = 300;
let playerSpeedX = 0;
let playerSpeedY = 0;
let playerWeight = 1;

let gravity = 0.98

let gameover = false;

let roadSpeed = 5

ctx.font = '64px Consolas';

var refreshInterval = setInterval(() => {
    
    if (gameover) {
        paintGameOver()
        return;
    }

    paintBackground()
    paintRoadStripes()
    paintPlayer()

    playerPosY += playerSpeedY;
    playerSpeedY += gravity * playerWeight

    playerPosY = Math.min(playerPosY, 500)

    time += 1;


}, 4)

function handleKeyDown(event) {
    console.log(event.which)
    switch (event.which) {
        case spacebarKeyCode:
            if (gameover) {
                gameover = false;

            }
            else {
                playerSpeedY = -20
            }
        default:
    }
}
function handleKeyUp(event) {
    switch (event.which) {
        default:
    }
}

function paintBackground() {
    ctx.fillStyle = "#0099ff";
    ctx.fillRect(-200,-200,1200,1000);
    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(-200,500,1200,1000);
    ctx.fillStyle = "#660000"
    ctx.fillRect(-200,500,1200,25);
}

function paintRoadStripes() {
    ctx.fillStyle = "#CCC";
    ctx.fillRect(1000 - (roadSpeed*time+0)%1200, 500, 100, 25);
    ctx.fillRect(1000 - (roadSpeed*time+600)%1200, 500, 100, 25);
}

function paintGameOver() {
    ctx.font = '64px Consolas';
    ctx.fillStyle = "#202020";
    ctx.fillRect(000,0,800,600);
    ctx.fillStyle = "#404040";
    ctx.fillText("Game over", 200, 200);
    ctx.fillText("Cars: " + cars, 200, 300);
    ctx.fillText("Coins: " + collectedCoins, 200, 400);
    ctx.fillText("Press spacebar", 200, 500);
}

function paintPlayer() {
    ctx.fillStyle = "#252525";

    ctx.beginPath()
    ctx.arc(playerPosX-40, playerPosY+25, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath()
    ctx.arc(playerPosX+40, playerPosY+25, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#921A1A";
    ctx.fillRect(playerPosX - 75, playerPosY - 25, 150, 50);
}