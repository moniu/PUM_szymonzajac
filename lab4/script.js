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

let playerSpeed = 10;
let playerPosX = 400;
let playerPosY = 300;

let playerSpeedX = 0;
let playerSpeedY = 0;

let barriers = [];

ctx.font = '256px Consolas';

var refreshInterval = setInterval(() => {

    //bg
    ctx.fillStyle = "#3d893b";
    ctx.fillRect(000,0,800,600);
    ctx.fillStyle = "#808080";
    ctx.fillRect(100,0,600,600);
    ctx.fillStyle = "#994336";
    ctx.fillRect(100,0,10,600);
    ctx.fillRect(700,0,10,600);

    // middle road stripes
    ctx.fillStyle = "#FFF";
    ctx.fillRect(250, (5*time+100)%600, 10, 100);
    ctx.fillRect(250, (5*time+400)%600, 10, 100);
    ctx.fillRect(550, (5*time+100)%600, 10, 100);
    ctx.fillRect(550, (5*time+400)%600, 10, 100);

    // side stripes
    ctx.fillRect(100, (5*time+100)%600, 10, 50);
    ctx.fillRect(100, (5*time+200)%600, 10, 50);
    ctx.fillRect(100, (5*time+300)%600, 10, 50);
    ctx.fillRect(100, (5*time+400)%600, 10, 50);
    ctx.fillRect(100, (5*time+500)%600, 10, 50);
    ctx.fillRect(100, (5*time+600)%600, 10, 50);
    ctx.fillRect(700, (5*time+100)%600, 10, 50);
    ctx.fillRect(700, (5*time+200)%600, 10, 50);
    ctx.fillRect(700, (5*time+300)%600, 10, 50);
    ctx.fillRect(700, (5*time+400)%600, 10, 50);
    ctx.fillRect(700, (5*time+500)%600, 10, 50);
    ctx.fillRect(700, (5*time+600)%600, 10, 50);

    ctx.fillStyle = "#921A1A";
    ctx.fillRect(playerPosX - 25, playerPosY - 50, 50, 100);

    barriers.forEach(barrier => {

    })

    playerPosX += playerSpeedX;
    playerPosY += playerSpeedY;

    if (playerPosX > 750) playerPosX = 750;
    if (playerPosX < 50) playerPosX = 50;
    if (playerPosY > 500) playerPosY = 500;
    if (playerPosY < 100) playerPosY = 100;

    time += 5;

}, 20)


function handleKeyDown(event) {
    switch (event.which) {
        case leftArrowKeyCode:
            playerSpeedX = -playerSpeed
            break;
        case rightArrowKeyCode:
            playerSpeedX = playerSpeed;
            break;
        case downArrowKeyCode:
            playerSpeedY = playerSpeed;
            break;
        case upArrowKeyCode:
            playerSpeedY = -playerSpeed;
            break;
        default:
    }
}
function handleKeyUp(event) {
    switch (event.which) {
        case leftArrowKeyCode:
            playerSpeedX = 0;
            break;
        case rightArrowKeyCode:
            playerSpeedX = 0;
            break;
        case downArrowKeyCode:
            playerSpeedY = 0;
            break;
        case upArrowKeyCode:
            playerSpeedY = 0;
            break;
        default:
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
