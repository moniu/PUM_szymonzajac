let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
let time = 0;
let bullets = [];
let balls = [];
let playerPos = 400;
document.onkeydown = handleKey;

let leftArrowKeyCode = 37;
let rightArrowKeyCode = 39;
let spacebarKeyCode = 32;

var refreshInterval = setInterval(() => {
    
    ctx.fillStyle = "#202020";
    ctx.fillRect(0,0,800,600);

    ctx.fillStyle = "#921A1A";
    ctx.fillRect(playerPos - 25, 525, 50, 50);

    balls.forEach(ball => {
        ctx.fillStyle = "#2562D5";
        // ctx.beginPath()
        // ctx.arc(400, position, 100, 0, Math.PI*2);
        // ctx.fill();
    });

    bullets.forEach(bullet => {
        
    });


    // let color = Math.abs(time%510-255);
    // ctx.fillStyle = "rgb(0,"+color+","+(255-color)+")";

    // let position = 350 + 150*Math.sin(time/(2*Math.PI));

    // ctx.beginPath()
    // ctx.arc(400, position, 100, 0, Math.PI*2);
    // ctx.fill();

    time+=5;

}, 20)

function createBullet(startX) {
    return {x:startX, y:525};
}

function handleKey(event) {
    switch (event.which) {
        case leftArrowKeyCode:
            break;
        case rightArrowKeyCode:
            break;
        case spacebarKeyCode:
            break;
        default:
    }
}

