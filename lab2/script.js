let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
let time = 0;

var refreshInterval = setInterval(() => {
    
    ctx.fillStyle = "#3784E6";
    ctx.fillRect(0,0,800,600);

    ctx.fillStyle = "#2D831B";
    ctx.fillRect(0,500,800,100);

    firstStepFill = Math.max(0, Math.min(50, time-100));
    ctx.fillStyle = "#83591B"
    ctx.fillRect(400,500-firstStepFill, 300, firstStepFill);

    // let color = Math.abs(time%510-255);
    // ctx.fillStyle = "rgb(0,"+color+","+(255-color)+")";

    // let position = 350 + 150*Math.sin(time/(2*Math.PI));

    // ctx.beginPath()
    // ctx.arc(400, position, 100, 0, Math.PI*2);
    // ctx.fill();

    time++;

}, 20)