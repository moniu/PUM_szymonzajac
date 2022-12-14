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
let score = 0;

let barrierSpawnTimer = 0;
let barrierSpawnInterval = 100;
let barriers = [];

let gameover = false;

ctx.font = '64px Consolas';

var refreshInterval = setInterval(() => {

    if (gameover) {
        ctx.font = '64px Consolas';
        ctx.fillStyle = "#202020";
        ctx.fillRect(000,0,800,600);
        ctx.fillStyle = "#404040";
        ctx.fillText("Game over", 200, 200);
        ctx.fillText("Score: " + score, 200, 300);
        ctx.fillText("Press spacebar", 200, 400);
        return;
    }
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
        if (barrier.y > 700) {
            score++;
            barriers = barriers.filter(b => barrier!=b)
            return;
        }
        
        //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        if (playerPosX < barrier.x + 50 &&
            playerPosX + 50 > barrier.x &&
            playerPosY < barrier.y + 100 &&
            100 + playerPosY > barrier.y) {
                gameover = true;
            }

        barrier.y += 5;
        ctx.fillStyle = "#3b25c4";
        ctx.fillRect(barrier.x - 25, barrier.y - 50, 50, 100);
    })
    playerPosX += playerSpeedX;
    playerPosY += playerSpeedY;

    if (playerPosX > 750) playerPosX = 750;
    if (playerPosX < 50) playerPosX = 50;
    if (playerPosY > 500) playerPosY = 500;
    if (playerPosY < 100) playerPosY = 100;

    if(barrierSpawnTimer++ > barrierSpawnInterval) {
        barrierSpawnTimer-= barrierSpawnInterval;
        barriers.push({x:100+Math.random()*600, y:-50})
    }

    ctx.font = '24px Consolas';
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + score, 350, 25);

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
        case spacebarKeyCode:
            if (gameover) {
                gameover = false;
                barriers = [];
                barrierSpawnTimer = 0;
                playerPosX = 400;
                playerPosY = 300
                score = 0;
            }
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
