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

    secondStepFill = Math.max(0, Math.min(50, time-200));
    ctx.fillStyle = "#654008"
    ctx.fillRect(450,450-secondStepFill, 250, secondStepFill);

    thirdStepFill = Math.max(0, Math.min(50, time-300));
    ctx.fillStyle = "#926929"
    ctx.fillRect(500,400-thirdStepFill, 200, thirdStepFill);

    

    // let color = Math.abs(time%510-255);
    // ctx.fillStyle = "rgb(0,"+color+","+(255-color)+")";

    // let position = 350 + 150*Math.sin(time/(2*Math.PI));

    // ctx.beginPath()
    // ctx.arc(400, position, 100, 0, Math.PI*2);
    // ctx.fill();

    time++;

}, 20)