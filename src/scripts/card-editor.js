'use strict'
import { fabric } from 'fabric'
import '@fortawesome/fontawesome-free/js/fontawesome'

class CardTemplate {
    type = 'none'
    deck = 'draft'
    dimensions = {
        width: 650,
        height: 1016
    }
}

class BossCardTemplate extends CardTemplate {
    type = 'boss'
    backgroundColor = '#e6daa6'
    labelColor = '#c94a3b'
    fontColor = '#25120c'
}

class Card {
    constructor(obj) {
        this.id = obj.id || 0
        this.name = obj.name || 'unnamed'
        this.template = obj.template || new CardTemplate()
        this.data = {
            portrait: '../public/assets/images/no_image.png',
            stats: {
                playerNumbers: ['0', '0', '0', '0'],
                dps: ['0', '0', '0', '0'],
                hp: ['0', '0', '0', '0'],
                miserableEnd: 'No effect',
                effect1: 'No effect',
                reward: 'No reward'
            }
        }

        if (obj.data) {
            this.data.portrait = obj.data.portrait || '../public/assets/images/no_image.png' // TODO 'No Image'
            if (obj.data.stats) {
                this.data.stats.playerNumbers = obj.data.stats.playerNumbers || ['3', '4', '5-6', '7-8']
                this.data.stats.dps = obj.data.stats.dps || ['0', '0', '0', '0']
                this.data.stats.hp = obj.data.stats.hp || ['0', '0', '0', '0']
                this.data.stats.miserableEnd = obj.data.stats.miserableEnd || 'No effect'
                this.data.stats.effect1 = obj.data.stats.effect1 || 'No effect'
                this.data.stats.reward = obj.data.stats.reward || 'No reward'
            } else {
                this.data.stats = {
                    playerNumbers: ['0', '0', '0', '0'],
                    dps: ['0', '0', '0', '0'],
                    hp: ['0', '0', '0', '0'],
                    miserableEnd: 'No effect',
                    effect1: 'No effect',
                    reward: 'No reward'
                }
            }
        }
    }
}

class CardPrinter {

    glyphs = [
        '\uf6de', /*players*/
        '\uf21e', /*hp*/
        '\uf500', /*damage*/
    ]

    constructor(canvas, dimensions) {
        this.canvas = canvas
        this.dimensions = dimensions
    }

    print = (card) => { console.log("Abstract card printer - print called does nothing") }

    drawCirclePortrait = (url) => {
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
                canvas.add(stroke)
                canvas.add(oImg)

                var group = new fabric.Group([stroke, oImg], {
                    left: 45,
                    top: 90,
                    selectable: false
                })
                canvas.add(group)
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

        canvas.add(group)
        group.centerH()
        return group
    }

    drawBackground = (color) => {
        let margin = 15
        let marginLeft = margin
        let marginTop = margin
        let width = this.dimensions.width - marginLeft - margin
        let height = this.dimensions.height - marginTop - margin

        canvas.add(
            new fabric.Rect({
                left: marginLeft,
                top: marginTop,
                width: width,
                height: height,
                fill: color,
            }))
    }

    drawBorder = () => {
        var outerBorder = (drawBorder(0, 0, this.dimensions.width, this.dimensions.height, 30))
        outerBorder.stroke = '#25120c'

        var innerBorder = drawBorder(15, 15, this.dimensions.width - 30, this.dimensions.height - 30, 15)
        innerBorder.stroke = '#c94a3b'

        canvas.add(outerBorder)
        canvas.add(innerBorder)

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

        canvas.add(new fabric.Textbox(titleText, {
            left: margin,
            top: 850,
            width: this.dimensions.width - margin * 2,

            fontSize: fontSize,
            fill: '#25120c',
            styles: boldTitle
        }))
    }

    drawTextWithIcons = (text, initialPosition) => {

        let textbox = this.createTextboxWithGlyphs(text);
        textbox.set('left', 340)
        textbox.set('top', 200)
        textbox.set('fontSize', 25)
        textbox.set('width', 280)
        textbox.set('height', 400)
        textbox.set('fill', '#25120c')
        canvas.add(textbox)
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
        disableSelections()
        canvas.renderAll()

        function disableSelections() {
            canvas.selection = false
            canvas.forEachObject(function (o) {
                o.selectable = false
            })
        }
    }
}

class BossCardPrinter extends CardPrinter {
    print = (card) => {
        if (!card instanceof BossCardTemplate) {
            console.error("Current card" + card + " is not an instance of BossCardTemplate")
        }
        this.drawBackground(card.template.backgroundColor)
        this.drawBorder()
        this.drawLabel("BOSS", 20, 50, 60, card.template.labelColor)
        this.drawCirclePortrait(card.data.portrait)
        this.drawLabel(card.template.deck, 965, 10, 30, card.template.labelColor)
        this.drawBossName(card.name)
        this.drawDamageBox(card.data.stats)
        this.drawLootBox(card.data.stats.reward)
        this.drawMiserableEnd(card.data.stats.miserableEnd)
        this.drawTextWithIcons(card.data.stats.effect1)
        this.renderAll()
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

        canvas.add(group)
    }

    drawDamageBox = (stats) => {
        let margin = 40
        let boxTop = 400
        let boxHeight = 240

        var rect = new fabric.Rect({
            width: this.dimensions.width - margin * 2,
            height: boxHeight,
            stroke: '#25120c',
            strokeWidth: 2,
            fill: 'white',
            rx: 15,
            ry: 0
        })
        canvas.add(rect)

        var group = new fabric.Group([rect], {
            left: margin,
            top: boxTop,
            selectable: false
        })

        var centerPoint = group.getCenterPoint()
        let imgHp = new fabric.Textbox('\uf21e', {
            left: 50,
            top: centerPoint.y + 40,
            fontFamily: 'Font Awesome 5 Free',
            fontSize: 50,
            fontWeight: 920,
            width: 280,
            height: 400,
            fill: '#25120c',
        })
        let imgPlayers = new fabric.Textbox('\uf6de', {
            left: 60,
            top: centerPoint.y - 30,
            fontFamily: 'Font Awesome 5 Free',
            fontSize: 50,
            fontWeight: 920,
            width: 280,
            height: 400,
            fill: '#25120c',
        })
        let imgDamage = new fabric.Textbox('\uf500', {
            left: 50,
            top: centerPoint.y - 100,
            fontFamily: 'Font Awesome 5 Free',
            fontSize: 50,
            fontWeight: 920,
            width: 280,
            height: 400,
            fill: '#25120c',
        })

        group.addWithUpdate(imgHp)
        group.addWithUpdate(imgPlayers)
        group.addWithUpdate(imgDamage)

        const pixelsAboveBox = 70
        for (var i = 0; i < stats.playerNumbers.length; i++) {
            var playerNumber = new fabric.Text(stats.playerNumbers[i],
                {
                    left: 150 + 130 * i,
                    fontWeight: 'bold',
                    top: centerPoint.y - pixelsAboveBox,
                    fill: '#25120c',
                    originX: 'center',
                    originY: 'center'
                })
            canvas.add(playerNumber)
            group.addWithUpdate(playerNumber)
            var dpsNumber = new fabric.Text(stats.dps[i],
                {
                    left: 150 + 130 * i,
                    top: centerPoint.y,
                    fill: '#25120c',
                    originX: 'center',
                    originY: 'center'
                })
            canvas.add(dpsNumber)
            group.addWithUpdate(dpsNumber)
            var hpNumber = new fabric.Text(stats.hp[i],
                {
                    left: 150 + 130 * i,
                    top: centerPoint.y + 70,
                    fill: '#25120c',
                    originX: 'center',
                    originY: 'center'
                })
            canvas.add(hpNumber)
            group.addWithUpdate(hpNumber)
        }
        canvas.add(group)
    }

    drawBossName = (name) => {
        var bossName = new fabric.Text(name,
            {
                left: 380,
                top: 100,
                fontSize: 60,
                fill: '#25120c',
            })
        canvas.add(bossName)
    }
}

let getCardPrinter = (canvas, card) => {
    switch (card.template.type) {
        case 'boss': return new BossCardPrinter(canvas, card.template.dimensions)
        default: console.error('Unhandled card type')
    }
}
//-----------demo card------------------
let card = new Card({
    id: 1,
    name: 'BHEG',
    template: new BossCardTemplate(),
    data: {
        portrait : '../public/assets/images/1.png',
        stats: {
        playerNumbers: ['3', '4', '5-6', '7-8'],
        dps: ['35', '50', '75', '100'],
        hp: ['45', '60', '90', '120'],
        miserableEnd: 'Dodatkowe 8 Ran, Wszyscy tracą 2 poziomy',
        effect1: '+2 \uf6de za każdy przedmiot na +0, walczących graczy',
        reward: 'Boss Item, TradePack, kryształ, czar, 2 skarby dla gracza od drzwi. Poziom +2/+1'
        }
    }
})





//-----------demo card------------------

//------------canvas setup---------------
let canvas = new fabric.Canvas('c')
canvas.setWidth(card.template.dimensions.width)
canvas.setHeight(card.template.dimensions.height)
//------------canvas setup---------------


//-------------print card----------------
let printer = getCardPrinter(canvas, card)
printer.print(card)
//-------------print card----------------


// TODO remove not common part - images, text from template and use it later

/*
    A plan is following:
        1. User select from the list of existing templates
        2. depending on the template user should be able to provide text, effects, images and properties on editor
        3. user may choose card specific properties and mechanics - including special effects
        4. user may save a card as a draft or public to existing decks - (see label on the bottom)
*/
