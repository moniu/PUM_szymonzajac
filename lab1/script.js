var refreshInterval = setInterval(() => {
    let canvas = document.getElementById("canvas1");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#333333";
    ctx.fillRect(0,0,800,600);


    ctx.fillStyle = "#00FF00";
    ctx.arc(400, 300, 100, 0, Math.PI*2);
    ctx.fill();

}, 1000)