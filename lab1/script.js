let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
let time = 0;

var refreshInterval = setInterval(() => {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0,0,800,600);

    if (time%2 == 0) {
        ctx.fillStyle = "#00FF00";
    }
    else {
        ctx.fillStyle = "#0000FF";
    }
    
    ctx.arc(400, 300, 100, 0, Math.PI*2);
    ctx.fill();

    time++;

}, 1000)