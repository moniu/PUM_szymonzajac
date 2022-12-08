let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
let time = 0;

ctx.font = '64px Consolas';

var refreshInterval = setInterval(() => {


}, 4)



function paintBackground() {
    ctx.fillStyle = "#0099ff";
    ctx.fillRect(-200,-200,1200,1000);
    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(-200,500,1200,1000);
    ctx.fillStyle = "#660000"
    ctx.fillRect(-200,500,1200,25);
}

function paintEnemy(enemy) {
    ctx.fillStyle = "#252525";

    ctx.beginPath()
    ctx.arc(enemy.x-40, enemy.y+25, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1A1A92";
    ctx.fillRect(enemy.x - 75, enemy.y - 25, 150, 50);
}
