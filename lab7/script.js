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

let rotation = 0;
let rotationGoal = 0;
let rotationChangeSpeed = 1;
let maximumRotation = 4;

let cars = 0;
let collectedCoins = 0;

let barrierSpawnTimer = 0;
let barrierSpawnInterval = 50;
let barriers = [];
let barrierSpeed = 5;

let bonusSpawnTimer = 0;
let bonusSpawnInterval = 166;
let bonuses = [];
let bonusSpeed = 10

let bullets = [];
let bulletSpeed = 30;

let gameover = false;
let speedIndex = 1.0;
let roadSpeed = 5;
let maxSpeedIndex = 1.5;
let minSpeedIndex = 0.5;

let captuterPlayerPosX = playerPosX;
let captuterPlayerPosY = playerPosY;
let capturedRotation = rotation;

ctx.font = '64px Consolas';

var refreshInterval = setInterval(() => {
    
    if (gameover) {
        paintGameOver()
        return;
    }


    time += 1;


}, 4)

function handleKeyDown(event) {
    console.log(event.which)
    switch (event.which) {
        case leftArrowKeyCode:
            playerSpeedX = -playerSpeed
            rotationGoal = -maximumRotation;
            break;
        case rightArrowKeyCode:
            playerSpeedX = playerSpeed;
            rotationGoal = maximumRotation;
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
                bonuses = [];
                barrierSpawnTimer = 0;
                playerPosX = 400;
                playerPosY = 300
                cars = 0;
                collectedCoins = 0;
            }
            else {
                bullets.push({x:playerPosX, y:playerPosY});
            }
            break;
        case aKeyCode:
            speedIndex += 0.1;
            speedIndex = Math.min(maxSpeedIndex, Math.max(minSpeedIndex, speedIndex))
            break;
        case zKeyCode:
            speedIndex -= 0.1;
            speedIndex = Math.min(maxSpeedIndex, Math.max(minSpeedIndex, speedIndex))
            break;
        default:
    }
}
function handleKeyUp(event) {
    switch (event.which) {
        case leftArrowKeyCode:
            playerSpeedX = 0;
            rotationGoal = 0;
            break;
        case rightArrowKeyCode:
            playerSpeedX = 0;
            rotationGoal = 0;
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

function paintBackground() {
    ctx.fillStyle = "#3d893b";
    ctx.fillRect(-200,-200,1200,1000);
    ctx.fillStyle = "#606060";
    ctx.fillRect(100,-200,600,1000);
    ctx.fillStyle = "#994336";
    ctx.fillRect(100,-200,10,1000);
    ctx.fillRect(700,-200,10,1000);
}

function paintRoadStripes() {
    ctx.fillStyle = "#CCC";
    ctx.fillRect(250, (speedIndex*roadSpeed*time+100)%600, 10, 100);
    ctx.fillRect(250, (speedIndex*roadSpeed*time+400)%600, 10, 100);
    ctx.fillRect(550, (speedIndex*roadSpeed*time+100)%600, 10, 100);
    ctx.fillRect(550, (speedIndex*roadSpeed*time+400)%600, 10, 100);

    ctx.fillStyle = "#C25B4B";
    // side stripes
    ctx.fillRect(100, (speedIndex*roadSpeed*time+100)%600, 10, 50);
    ctx.fillRect(100, (speedIndex*roadSpeed*time+200)%600, 10, 50);
    ctx.fillRect(100, (speedIndex*roadSpeed*time+300)%600, 10, 50);
    ctx.fillRect(100, (speedIndex*roadSpeed*time+400)%600, 10, 50);
    ctx.fillRect(100, (speedIndex*roadSpeed*time+500)%600, 10, 50);
    ctx.fillRect(100, (speedIndex*roadSpeed*time+600)%600, 10, 50);
    ctx.fillRect(700, (speedIndex*roadSpeed*time+100)%600, 10, 50);
    ctx.fillRect(700, (speedIndex*roadSpeed*time+200)%600, 10, 50);
    ctx.fillRect(700, (speedIndex*roadSpeed*time+300)%600, 10, 50);
    ctx.fillRect(700, (speedIndex*roadSpeed*time+400)%600, 10, 50);
    ctx.fillRect(700, (speedIndex*roadSpeed*time+500)%600, 10, 50);
    ctx.fillRect(700, (speedIndex*roadSpeed*time+600)%600, 10, 50);
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
    ctx.translate(playerPosX, playerPosY)
    ctx.rotate(capturedRotation  * Math.PI / 180)
    ctx.translate(-playerPosX, -playerPosY)
    ctx.fillStyle = "#252525";
    ctx.fillRect(playerPosX-30, playerPosY-40, 8, 20);
    ctx.fillRect(playerPosX+22, playerPosY-40, 8, 20);
    ctx.fillRect(playerPosX-30, playerPosY+20, 8, 20);
    ctx.fillRect(playerPosX+22, playerPosY+20, 8, 20);
    ctx.fillStyle = "#921A1A";
    ctx.fillRect(playerPosX - 25, playerPosY - 50, 50, 100);
    ctx.fillStyle = "#363B40";
    ctx.fillRect(playerPosX - 20, playerPosY - 45, 40, 20);
    ctx.fillRect(playerPosX - 20, playerPosY + 15, 40, 30);
    ctx.fillStyle = "#B81D1D";
    ctx.fillRect(playerPosX - 20, playerPosY -25, 40, 40);
    ctx.translate(playerPosX, playerPosY)
    ctx.rotate(-capturedRotation * Math.PI / 180)
    ctx.translate(-playerPosX, -playerPosY)
}

function paintBarrier(barrier) {
    ctx.fillStyle = "#252525";
    ctx.fillRect(barrier.x - 30, barrier.y - 40, 8, 20);
    ctx.fillRect(barrier.x + 22, barrier.y-40, 8, 20);
    ctx.fillRect(barrier.x - 30, barrier.y+20, 8, 20);
    ctx.fillRect(barrier.x + 22, barrier.y+20, 8, 20);
    ctx.fillStyle = "#1E4A9D";
    ctx.fillRect(barrier.x - 25, barrier.y - 50, 50, 100);
    ctx.fillStyle = "#363B40";
    ctx.fillRect(barrier.x - 20, barrier.y - 45, 40, 20);
    ctx.fillRect(barrier.x - 20, barrier.y + 15, 40, 30);
    ctx.fillStyle = "#1F56BD";
    ctx.fillRect(barrier.x - 20, barrier.y -25, 40, 40);
}

function paintBonus(bonus) {
    ctx.fillStyle = "#F8BA0A";
    ctx.beginPath()
    ctx.arc(bonus.x, bonus.y, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#F7C63A";
    ctx.arc(bonus.x, bonus.y, 20, 0, Math.PI * 2);
    ctx.fill();
}