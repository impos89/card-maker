import { fabric } from "fabric";

const WIDTH = 650;
const HEIGHT = 1016;

var canvas = new fabric.Canvas('c');

canvas.setWidth(WIDTH);
canvas.setHeight(HEIGHT);

drawBossTemplate(); // TODO remove not common part - images, text from template and use it later

/*
    A plan is following:
        1. User select from the list of existing templates
        2. depending on the template user should be able to provide text, effects, images and properties on editor
        3. user may choose card specific properties and mechanics - including special effects
        4. user may save a card as a draft or public to existing decks - (see label on the bottom)
*/

function drawBossTemplate() {
    drawBackground('#e6daa6');
    drawBorder();
    drawLabel("BOSS", 20, 50, 60, '#c94a3b');
    drawCirclePortrait('../public/assets/images/1.png');
    drawLabel("DRAFT", 965, 10, 30, '#c94a3b');
    drawBossName('BHEG');
    drawDamageBox()
}

function drawDamageBox() {

    let margin = 40;
    let boxTop = 400;
    let boxHeight = 240;

    var rect = new fabric.Rect({
        width: WIDTH - margin * 2,
        height: boxHeight,
        stroke: '#25120c',
        strokeWidth: 2,
        fill: 'white',
        rx: 15,
        ry: 0
    });
    canvas.add(rect);

    var group = new fabric.Group([rect], {
        left: margin,
        top: boxTop,
        selectable: false
    });

    var centerPoint = group.getCenterPoint();

    fabric.Image.fromURL('../public/assets/images/players.png',
        (imgPlayers) => {
            const width = 512;
            imgPlayers.scale(0.1).set({
                left: 70,
                top: centerPoint.y - 70,
                width: width,
                height: width,
                originX: 'center',
                originY: 'center'
            });
            canvas.add(imgPlayers);
            group.addWithUpdate(imgPlayers);
        });

    fabric.Image.fromURL('../public/assets/images/sword.png',
        (imgDamage) => {
            const width = 256;
            imgDamage.scale(0.18).set({
                left: 70,
                top: centerPoint.y,
                width: width,
                height: width,
                originX: 'center',
                originY: 'center'
            });
            canvas.add(imgDamage);
            group.addWithUpdate(imgDamage);
        });

    fabric.Image.fromURL('../public/assets/images/hp.png',
        (imgDamage) => {
            const width = 512;
            imgDamage.scale(0.08).set({
                left: 70,
                top: centerPoint.y + 70,
                width: width,
                height: width,
                originX: 'center',
                originY: 'center'
            });
            canvas.add(imgDamage);
            group.addWithUpdate(imgDamage);
        });


    const playerNumbers = ['3', '4', '5-6', '7-8'];
    const dps = ['35', '50', '75', '100'];
    const hp = ['45', '60', '90', '120'];
    const pixelsAboveBox = 70;
    for (var i = 0; i < playerNumbers.length; i++) {
        var playerNumber = new fabric.Text(playerNumbers[i],
            {
                left: 150 + 130 * i,
                top: centerPoint.y - pixelsAboveBox,
                fill: '#25120c',
                originX: 'center',
                originY: 'center'
            });
        canvas.add(playerNumber);
        group.addWithUpdate(playerNumber);
        var dpsNumber = new fabric.Text(dps[i],
            {
                left: 150 + 130 * i,
                top: centerPoint.y,
                fill: '#25120c',
                originX: 'center',
                originY: 'center'
            });
        canvas.add(dpsNumber);
        group.addWithUpdate(dpsNumber);
        var hpNumber = new fabric.Text(hp[i],
            {
                left: 150 + 130 * i,
                top: centerPoint.y + 70,
                fill: '#25120c',
                originX: 'center',
                originY: 'center'
            });
        canvas.add(hpNumber);
        group.addWithUpdate(hpNumber);
    }


    canvas.add(group);
}


function drawBossName(name) {
    var bossName = new fabric.Text(name,
        {
            left: 380,
            top: 100,
            fontSize: 60,
            fill: '#25120c',
        });
    canvas.add(bossName);
}

function drawCirclePortrait(url) {
    var width = 250;
    fabric.Image.fromURL(url,
        function (oImg) {
            oImg.clipPath = new fabric.Circle(
                {
                    radius: width / 2,
                    originX: 'center',
                    originY: 'center'
                }
            );

            oImg.scale(1.0).set({
                width: width,
                height: width,
                originX: 'center',
                originY: 'center'
            });

            var stroke = new fabric.Circle(
                {
                    radius: (width / 2) + 5,
                    originX: 'center',
                    originY: 'center',
                    fill: '#25120c'
                }
            );
            canvas.add(stroke);
            canvas.add(oImg);

            var group = new fabric.Group([stroke, oImg], {
                left: 45,
                top: 90,
                selectable: false
            });
            canvas.add(group);
        });
}

function drawLabel(text, height, margin, fontSize, backgroundColor) {
    var text = new fabric.Text(text,
        {
            fontSize: fontSize,
            fill: '#25120c',
            originX: 'center',
            originY: 'center'
        });

    var rect = new fabric.Rect({
        width: text.width + margin * 2,
        height: text.height,
        fill: backgroundColor,
        originX: 'center',
        originY: 'center',
        rx: 15,
        ry: 0
    });

    var group = new fabric.Group([rect, text], {
        left: 0,
        top: height,
    });

    canvas.add(group);
    group.centerH();
    return group;
}

function drawBackground(color) {
    var margin = 15;
    var marginLeft = margin;
    var marginTop = margin;
    var width = WIDTH - marginLeft - margin;
    var height = HEIGHT - marginTop - margin;

    canvas.add(
        new fabric.Rect({
            left: marginLeft,
            top: marginTop,
            width: width,
            height: height,
            fill: color,

        }));
}

function drawBorder() {
    var outerBorder = (drawBorder(0, 0, WIDTH, HEIGHT, 30));
    outerBorder.stroke = '#25120c';

    var innerBorder = drawBorder(15, 15, WIDTH - 30, HEIGHT - 30, 15);
    innerBorder.stroke = '#c94a3b';

    canvas.add(outerBorder);
    canvas.add(innerBorder);

    function drawBorder(x, y, width, height, stroke) {
        return new fabric.Rect({
            left: x,
            top: y,
            width: width - stroke,
            height: height - stroke,
            stroke: 'black',
            strokeWidth: stroke,
            fill: 'rgba(0,0,0,0)',
            rx: 15,
            ry: 0
        });
    }
}

canvas.selection = false;
canvas.forEachObject(function (o) {
    o.selectable = false;
});
canvas.renderAll();