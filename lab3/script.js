let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
let time = 0;
let bullets = [];
let balls = [];
let playerPos = 400;
document.onkeydown = handleKey;

var refreshInterval = setInterval(() => {
    
    ctx.fillStyle = "#202020";
    ctx.fillRect(0,0,800,600);

    ctx.fillStyle = "#921A1A";
    ctx.fillRect(playerPos - 25, 525, 50, 50);


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
    console.log("Hello")
}

