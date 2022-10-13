let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
let time = 0;

var refreshInterval = setInterval(() => {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0,0,800,600);

    let color = Math.abs(time%510-255);
    console.log(color)
    ctx.fillStyle = "rgb(0,"+color+","+(255-color)+")";
    console.log(ctx.fillStyle);
    
    ctx.arc(400, 300, 100, 0, Math.PI*2);
    ctx.fill();

    time++;

}, 10)