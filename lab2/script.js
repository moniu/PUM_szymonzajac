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
    ctx.fillRect(400, 500-firstStepFill, 300, firstStepFill);

    secondStepFill = Math.max(0, Math.min(50, time-200));
    ctx.fillStyle = "#654008"
    ctx.fillRect(450, 450-secondStepFill, 250, secondStepFill);

    thirdStepFill = Math.max(0, Math.min(50, time-300));
    ctx.fillStyle = "#926929"
    ctx.fillRect(500, 400-thirdStepFill, 200, thirdStepFill);

    fourthStepFill = Math.max(0, Math.min(50, time-400));
    ctx.fillStyle = "#735118"
    ctx.fillRect(550, 350-fourthStepFill, 150, fourthStepFill);

    fifthStepFill = Math.max(0, Math.min(50, time-500));
    ctx.fillStyle = "#52370F"
    ctx.fillRect(600, 300-fifthStepFill, 100, fifthStepFill);

    ballStepFill = Math.max(0, Math.min(Math.PI*2, (time-600)/10));
    ballXPos = 650 - Math.max(0, Math.min(500, time - 800));
    ballYPos = 900 - Math.max(425, Math.min(675, ballXPos + 100 * Math.abs(Math.sin(ballXPos/Math.PI/12))));
    ctx.fillStyle = "#C33";
    ctx.beginPath();
    ctx.arc(ballXPos, ballYPos, 25, 0, ballStepFill);
    ctx.fill();



    // let color = Math.abs(time%510-255);
    // ctx.fillStyle = "rgb(0,"+color+","+(255-color)+")";

    // let position = 350 + 150*Math.sin(time/(2*Math.PI));

    // ctx.beginPath()
    // ctx.arc(400, position, 100, 0, Math.PI*2);
    // ctx.fill();

    time+=5;

}, 20)