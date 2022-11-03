let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
let time = 0;
document.onkeydown = handleKey;

let leftArrowKeyCode = 37;
let rightArrowKeyCode = 39;
let spacebarKeyCode = 32;
let upArrowKeyCode = 38;
let downArrowKeyCode = 40;

let playerSpeed = 10;
let playerPosX = 400;
let playerPosY = 300;

ctx.font = '256px Consolas';

var refreshInterval = setInterval(() => {

    ctx.fillStyle = "#3d893b";
    ctx.fillRect(000,0,800,600);
    ctx.fillStyle = "#808080";
    ctx.fillRect(100,0,600,600);
    ctx.fillStyle = "#994336";
    ctx.fillRect(100,0,10,600);
    ctx.fillRect(700,0,10,600);
    
    ctx.fillStyle = "#FFF";
    ctx.fillRect(250, (5*time+100)%600, 10, 30);
    ctx.fillRect(250, (5*time+400)%600, 10, 30);
    ctx.fillRect(550, (5*time+100)%600, 10, 30);
    ctx.fillRect(550, (5*time+400)%600, 10, 30);

    ctx.fillRect(100, (5*time+100)%600, 10, 50);
    ctx.fillRect(100, (5*time+200)%600, 10, 50);
    ctx.fillRect(100, (5*time+300)%600, 10, 50);
    ctx.fillRect(100, (5*time+400)%600, 10, 50);
    ctx.fillRect(100, (5*time+500)%600, 10, 50);
    ctx.fillRect(100, (5*time+600)%600, 10, 50);
    

    ctx.fillStyle = "#921A1A";
    ctx.fillRect(playerPosX - 25, playerPosY - 50, 50, 100);

    time += 5;

}, 20)


function handleKey(event) {
    switch (event.which) {
        case leftArrowKeyCode:
            playerPosX -= playerSpeed;
            playerPosX = Math.max(50, playerPosX);
            break;
        case rightArrowKeyCode:
            playerPosX += playerSpeed;
            playerPosX = Math.min(750, playerPosX);
            break;
        case downArrowKeyCode:
            playerPosY += playerSpeed;
            playerPosY = Math.min(500, playerPosY)
            break;
        case upArrowKeyCode:
            playerPosY -= playerSpeed;
            playerPosY = Math.max(100, playerPosY)
            break;
        default:
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
