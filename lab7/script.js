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
let playerPosX = 200;
let playerPosY = 300;
let playerSpeedX = 0;
let playerSpeedY = 0;
let playerWeight = 1;
let playerWidth = 150;
let playerHeight = 50;

let gravity = 0.5
let gameover = false;
let roadSpeed = 5

let enemies = [];
let enemySpeed = 3;
let enemyWidth = 150;
let enemyHeight = 50;
let enemySpawningInterval = 200;
let enemySpawningTimer = 0;


let score = 0;

ctx.font = '64px Consolas';

var refreshInterval = setInterval(() => {
    
    if (gameover) {
        paintGameOver()
        return;
    }

    paintBackground()
    paintRoadStripes()
    paintPlayer()
    displayScore();

    playerPosY += playerSpeedY;
    playerSpeedY += gravity * playerWeight
    playerPosY = Math.min(playerPosY, 500)

    enemies = enemies.filter(enemy => {
        enemy.x -= enemySpeed;
        if (enemy.x < -200) {
            score++;
            return false;
        }
        if (enemyAndPlayerCollides(enemy)) {
            gameover = true;
        }
        paintEnemy(enemy);
        return true;
    });


    enemySpawningTimer++;
    if (enemySpawningTimer >= enemySpawningInterval) {
        enemySpawningTimer -= enemySpawningInterval;
        spawnEnemy();

        enemySpawningInterval = Math.random() * 150 + 50
    }
    time += 3;


}, 4)

function handleKeyDown(event) {
    console.log(event.which)
    switch (event.which) {
        case spacebarKeyCode:
            if (gameover) {
                gameover = false;
                enemies = []
                playerPosY = 500;
                score = 0;
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

function spawnEnemy() {
    enemies.push({x:1200, y:500})
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
    ctx.fillRect(1000 - (roadSpeed*time+300)%1200, 500, 100, 25);
    ctx.fillRect(1000 - (roadSpeed*time+600)%1200, 500, 100, 25);
    ctx.fillRect(1000 - (roadSpeed*time+900)%1200, 500, 100, 25);
}

function paintGameOver() {
    ctx.font = '64px Consolas';
    ctx.fillStyle = "#202020";
    ctx.fillRect(000,0,800,600);
    ctx.fillStyle = "#404040";
    ctx.fillText("Game over", 200, 200);
    ctx.fillText("Score: " + score, 200, 300);
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
    ctx.fillRect(playerPosX - 75, playerPosY - 25, playerWidth, playerHeight);
}

function paintEnemy(enemy) {
    ctx.fillStyle = "#252525";

    ctx.beginPath()
    ctx.arc(enemy.x-40, enemy.y+25, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath()
    ctx.arc(enemy.x+40, enemy.y+25, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1A1A92";
    ctx.fillRect(enemy.x - 75, enemy.y - 25, 150, 50);
}

function displayScore() {
    ctx.font = '32px Arial';
    ctx.fillStyle = "#FFF"
    ctx.fillText("Score: " + score, 25, 50);
}

function enemyAndPlayerCollides(enemy) {
    let pw2 = playerWidth/2;
    let ph2 = playerHeight/2;
    let ew2 = enemyWidth/2;
    let eh2 = enemyHeight/2;

    return (playerPosX + pw2 > enemy.x - ew2 &&
            playerPosX - pw2 < enemy.x + ew2 &&
            playerPosY + ph2 > enemy.y - eh2 &&
            playerPosY - ph2 < enemy.y + eh2);
}