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