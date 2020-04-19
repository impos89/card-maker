import { fabric } from 'fabric';

export { CardPrinter }

class CardPrinter {

    glyphs = [
        '\uf6de', /*players*/
        '\uf21e', /*hp*/
        '\uf500', /*damage*/
        '\uf496', /*lock*/
    ]

    constructor(canvas, dimensions) {
        this.canvas = canvas
        this.dimensions = dimensions
    }

    print = (card) => { console.log("Abstract card printer - print called does nothing") }

    drawCirclePortrait = (url, style) => {

        let _canvas = this.canvas
        let width = 250
        fabric.Image.fromURL(url,
            function (oImg) {
                oImg.clipPath = new fabric.Circle(
                    {
                        radius: width / 2,
                        originX: 'center',
                        originY: 'center'
                    }
                )

                oImg.scale(1.0).set({
                    width: width,
                    height: width,
                    originX: 'center',
                    originY: 'center'
                })

                var stroke = new fabric.Circle(
                    {
                        radius: (width / 2) + 5,
                        originX: 'center',
                        originY: 'center',
                        fill: '#25120c'
                    }
                )
                _canvas.add(stroke)
                _canvas.add(oImg)

                var group = new fabric.Group([stroke, oImg], {
                    left: style.left,
                    top: style.top,
                    selectable: false
                })
                _canvas.add(group)
            })
    }

    drawLabel = (text, height, margin, fontSize, backgroundColor) => {
        var text = new fabric.Text(text.toUpperCase(),
            {
                fontSize: fontSize,
                fill: '#25120c',
                originX: 'center',
                originY: 'center'
            })

        var rect = new fabric.Rect({
            width: text.width + margin * 2,
            height: text.height,
            fill: backgroundColor,
            originX: 'center',
            originY: 'center',
            rx: 15,
            ry: 0
        })

        var group = new fabric.Group([rect, text], {
            left: 0,
            top: height,
        })

        this.canvas.add(group)
        group.centerH()
        return group
    }

    drawBackground = (color) => {
        let margin = 15
        let marginLeft = margin
        let marginTop = margin
        let width = this.dimensions.width - marginLeft - margin
        let height = this.dimensions.height - marginTop - margin

        this.canvas.add(
            new fabric.Rect({
                left: marginLeft,
                top: marginTop,
                width: width,
                height: height,
                fill: color,
            }))
    }

    drawBorder = (style) => {
        var outerBorder = (drawBorder(0, 0, this.dimensions.width, this.dimensions.height, 30))
        outerBorder.stroke = style.outerBorderColor

        var innerBorder = drawBorder(15, 15, this.dimensions.width - 30, this.dimensions.height - 30, 15)
        innerBorder.stroke = style.innerBorderColor

        this.canvas.add(outerBorder)
        this.canvas.add(innerBorder)

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
            })
        }
    }

    drawMiserableEnd = (text) => {
        let title = 'Marny koniec: '
        let boldTitle = { 0: {} }
        for (let i = 0; i < title.length; i++) {
            boldTitle[0][i] = { fontWeight: 'bold' }
        }

        let titleText = title + text
        let margin = 40
        let fontSize = 30

        this.canvas.add(new fabric.Textbox(titleText, {
            left: margin,
            top: 850,
            width: this.dimensions.width - margin * 2,

            fontSize: fontSize,
            fill: '#25120c',
            styles: boldTitle
        }))
    }

    drawTextWithIcons = (text, style) => {
        if (!text) {
            console.warn('Text passed to drawTextWithIcons function is ' + text)
            text = ''
        }
        let textbox = this.createTextboxWithGlyphs(text);
        textbox.set('left', style.left)
        textbox.set('top', style.top)
        textbox.set('fontSize', style.fontSize)
        textbox.set('width', style.width)
        textbox.set('height', style.height)
        textbox.set('fill', '#25120c')
        textbox.set('textAlign', 'center')
        this.canvas.add(textbox)
    }

    drawLootBox(lootText) {
        let margin = 40
        let boxTop = 650
        let boxHeight = 180
        let lootTitle = 'Nagroda'
        let lootTitleFontSize = 40

        let lootTextFontSize = 30

        let rect = new fabric.Rect({
            width: this.dimensions.width - margin * 2,
            height: boxHeight,
            stroke: '#25120c',
            strokeWidth: 2,
            fill: 'white',
            rx: 15,
            ry: 0,
            originX: 'center'

        })

        let loot = new fabric.IText(lootTitle, {
            fontSize: lootTitleFontSize,
            fill: '#25120c',
            align: 'mid',
            centeredScaling: true,
            originX: 'center',
        })

        let text = new fabric.Textbox(lootText, {
            left: (margin / 2) - rect.width / 2,
            top: loot.height,
            width: rect.width - (margin / 2),
            height: rect.height,
            fontSize: lootTextFontSize,
            fill: '#25120c',
        })

        let group = new fabric.Group([rect, loot, text], {
            top: boxTop,
            left: margin,
            selectable: false,
        })

        this.canvas.add(group)
    }

    createTextboxWithGlyphs = (text) => {
        let textbox = new fabric.Textbox(text, {
            styles: { 0: {} }
        })
        this.applyStyleOnGlyphs(textbox)
        return textbox
    }

    applyStyleOnGlyphs = (iText) => {
        let text = iText.text
        for (var index = 0; index < text.length; index++) {
            if (this.glyphs.includes(text[index])) {
                iText.styles["0"][index] =
                {
                    fontFamily: 'Font Awesome 5 Free',
                    fontWeight: 900,
                }
            }
        }
    }

    renderAll = () => {
        disableSelections(this.canvas)
        this.canvas.renderAll()

        function disableSelections(canvas) {
            canvas.selection = false
            canvas.forEachObject(function (o) {
                o.selectable = false
            })
        }
    }
}