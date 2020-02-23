window.onload = function () {
    console.log('r/place');

    // var canvas = document.querySelector('canvas');
    var canvas = document.getElementById('fg_layer')
    var canvas_image = document.getElementById('bg_layer')
    
    var canvasf = new fabric.Canvas('fg_layer');
    
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      });
      canvasf.add(rect);
    // canvas.width = 650;
    // canvas.height = 1016;
    // canvas_image.width = 650;
    // canvas_image.height = 1016;


    // var ctx = canvas.getContext('2d');
    // var bf_ctx = canvas.getContext('2d');

    // ctx.fillStyle = "#e6daa6";
    // ctx.fillRect(0, 0, 650, 1016);
    // drawImage(55, 100, 250, 250, 'source', bf_ctx);
    // drawBorder(0, 0, canvas.width, canvas.height, 25, "#25120c");
    // drawBorder(25, 25, canvas.width - 25, canvas.height - 25, 25, "#c94a3b");
    // drawLabel(canvas.width / 4 + 2, 30, 300, 60, "#cb483b");
    // drawText(canvas.width / 4 + 95, 75, "BOSS", "45px Georgia", "rgb(0, 0, 0)");

    // drawLabel(canvas.width / 2 - 20, canvas.height - 70, 50, 50, "#25120c");
    // drawText(canvas.width / 2 - 17, canvas.height - 30, "M", "45px Georgia", "rgb(0, 0, 0)");
    // // drawHelpLines(15);
    // drawBossName();
    // drawText(330, 200, "+2", "22px Georgia", "rgb(0, 0, 0)");
    // drawImage(360, 165, 45, 45, 'fists_img', ctx);
    // drawText(405, 200, "za każdy Przedmiot", "22px Georgia", "rgb(0, 0, 0)");
    // drawText(330, 225, "na +0, walczących graczy", "22px Georgia", "rgb(0, 0, 0)");

    // function drawBossName() {
    //     drawText(350, 150, "BHEG", "60px Georgia", "rgb(0, 0, 0)");
    // }



    // function drawImage(x, y, width, height, imgId, context) {
    //     // TODO opacity and transparency of the image
    //     // ctx.globalAlpha = 0.5;
    //     const image = document.getElementById(imgId);
    //     context.drawImage(image, x, y, width, height);
    //     // ctx.globalAlpha = 1;
    // }

    // function drawLabel(x, y, width, height, fillStyle) {
    //     ctx.fillStyle = fillStyle;
    //     var radius = 15;
    //     ctx.beginPath();
    //     ctx.moveTo(x + width - radius, y);
    //     ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    //     ctx.lineTo(x + width, y + height - radius);
    //     ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    //     ctx.lineTo(x + radius, y + height);
    //     ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    //     ctx.lineTo(x, y + radius);
    //     ctx.quadraticCurveTo(x, y, x + radius, y);
    //     ctx.fill();
    //     ctx.closePath();

    // }

    // function drawText(x, y, text, font, fillStyle) {
    //     ctx.font = font;
    //     ctx.fillStyle = fillStyle;
    //     ctx.fillText(text, x, y);
    // }

    // function drawHelpLines(radius) {
    //     ctx.beginPath();
    //     var hy = 0;
    //     while (hy < canvas.height) {
    //         ctx.moveTo(0, hy);
    //         ctx.lineTo(canvas.width, hy);
    //         hy += radius;
    //     }

    //     var hy = 0;
    //     while (hy < canvas.height) {
    //         ctx.moveTo(0 + hy, 0);
    //         ctx.lineTo(0 + hy, canvas.height);
    //         hy += radius;
    //     }
    //     ctx.stroke();
    //     ctx.closePath();
    // }

    // function drawBorder(x, y, borderWidth, borderHeight, radius, fillStyle) {
    //     ctx.beginPath();
    //     ctx.fillStyle = fillStyle;
    //     ctx.moveTo(x + radius, y);
    //     ctx.lineTo(borderWidth - radius, y);
    //     ctx.quadraticCurveTo(borderWidth, y, borderWidth, y + radius);
    //     ctx.lineTo(borderWidth, (y + borderHeight) / 2);
    //     ctx.lineTo(borderWidth - radius, (y + borderHeight) / 2);
    //     ctx.lineTo(borderWidth - radius, y + radius * 2);
    //     ctx.quadraticCurveTo(borderWidth - radius, y + radius, borderWidth - radius * 2, y + radius);
    //     ctx.lineTo(x + radius * 2, y + radius);
    //     ctx.quadraticCurveTo(x + radius, y + radius, x + radius, y + radius * 2);
    //     ctx.lineTo(x + radius, (y + borderHeight) / 2);
    //     ctx.lineTo(x, (y + borderHeight) / 2);
    //     ctx.lineTo(x, y + radius);
    //     ctx.quadraticCurveTo(x, y, x + radius, y);

    //     ctx.moveTo(x + radius, borderHeight);
    //     ctx.lineTo(borderWidth - radius, borderHeight);
    //     ctx.quadraticCurveTo(borderWidth, borderHeight, borderWidth, borderHeight - radius);
    //     ctx.lineTo(borderWidth, (y + borderHeight) / 2);
    //     ctx.lineTo(borderWidth - radius, (y + borderHeight) / 2);
    //     ctx.lineTo(borderWidth - radius, borderHeight - radius * 2);
    //     ctx.quadraticCurveTo(borderWidth - radius, borderHeight - radius, borderWidth - radius * 2, borderHeight - radius);
    //     ctx.lineTo(x + radius * 2, borderHeight - radius);
    //     ctx.quadraticCurveTo(x + radius, borderHeight - radius, x + radius, borderHeight - radius * 2);
    //     ctx.lineTo(x + radius, (y + borderHeight) / 2);
    //     ctx.lineTo(x, (y + borderHeight) / 2);
    //     ctx.lineTo(x, borderHeight - radius);
    //     ctx.quadraticCurveTo(x, borderHeight, x + radius, borderHeight);
    //     ctx.fill();
    //     // ctx.stroke();
    //     ctx.closePath();

    // }

    // console.log(canvas);


    // // change color on button click
    // document.getElementById('button_previous')
    //     .addEventListener('click', function (event) {
    //         ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    //         ctx.fillRect(0, 0, 650, 1016);
    //     });
    // // change color on button click
    // document.getElementById('button_next')
    //     .addEventListener('click', function (event) {
    //         ctx.fillStyle = 'rgba(0, 255, 0, 1)';
    //         ctx.fillRect(0, 0, 650, 1016);
    //     });
}