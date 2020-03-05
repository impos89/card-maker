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
    borderProperties = {
        outerBorderColor: '#25120c',
        innerBorderColor: '#c94a3b'
    }
}

class QuestCardTemplate extends CardTemplate {
    type = 'quest'
    backgroundColor = '#fec657'
    labelColor = '#fec657'
    fontColor = '#25120c'
    borderProperties = {
        outerBorderColor: '#25120c',
        innerBorderColor: '#25120c'
    }
}

class ItemCardTemplate extends CardTemplate {
    type = 'item'
    backgroundColor = '#fec657'
    labelColor = '#fec657'
    fontColor = '#25120c'
    borderProperties = {
        outerBorderColor: '#25120c',
        innerBorderColor: '#25120c'
    }
}

class BossItemCardTemplate extends ItemCardTemplate {
    type = 'boss item'
    backgroundColor = '#cd7f73'
    labelColor = '#b56e63'
    fontColor = '#25120c'
    borderProperties = {
        outerBorderColor: '#25120c',
        innerBorderColor: '#25120c'
    }
}

class Card {
    constructor(obj) {
        this.id = obj.id || 0
        this.title = obj.title || 'unnamed'
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
                this.data.stats.bonus = obj.data.stats.bonus || 'No bonus' // item only
                this.data.stats.strength = obj.data.stats.strength || 0 // item only
                this.data.stats.power = obj.data.stats.power || 0 // item only
                this.data.stats.shield = obj.data.stats.shield || 0 // item only
                this.data.stats.type = obj.data.stats.type || ['Zbroja', 'Duża'] // item only
                this.data.stats.value = obj.data.stats.value || 0 // item only
            } else {
                this.data.stats = {
                    playerNumbers: ['0', '0', '0', '0'],
                    dps: ['0', '0', '0', '0'],
                    hp: ['0', '0', '0', '0'],
                    miserableEnd: 'No effect',
                    effect1: 'No effect',
                    reward: 'No reward',
                    bonus: 'No bonus'
                }
            }
            if (obj.data.descriptions) {
                this.data.descriptions = obj.data.descriptions || { 0: '', 1: '', 2: '' }
            }
        }
    }
}

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
                    left: style.left,
                    top: style.top,
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

    drawBorder = (style) => {
        var outerBorder = (drawBorder(0, 0, this.dimensions.width, this.dimensions.height, 30))
        outerBorder.stroke = style.outerBorderColor

        var innerBorder = drawBorder(15, 15, this.dimensions.width - 30, this.dimensions.height - 30, 15)
        innerBorder.stroke = style.innerBorderColor

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
        canvas.add(textbox)
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
        this.drawBorder(card.template.borderProperties)
        this.drawLabel(card.template.type, 20, 50, 60, card.template.labelColor)
        this.drawCirclePortrait(card.data.portrait, { left: 45, top: 90 })
        this.drawLabel(card.template.deck, 965, 10, 30, card.template.labelColor)
        this.drawBossName(card.title)
        this.drawDamageBox(card.data.stats)
        this.drawLootBox(card.data.stats.reward)
        this.drawMiserableEnd(card.data.stats.miserableEnd)
        this.drawTextWithIcons(card.data.stats.effect1, {
            left: 340,
            top: 200,
            fontSize: 25,
            width: 280,
            height: 400
        })
        this.renderAll()
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

class QuestCardPrinter extends CardPrinter {
    print = (card) => {
        if (!card instanceof QuestCardTemplate) {
            console.error("Current card" + card + " is not an instance of BossCardTemplate")
        }
        this.drawBackground(card.template.backgroundColor)
        this.drawBorder(card.template.borderProperties)
        this.drawLabel(card.template.type, 30, 50, 60, card.template.labelColor)
        this.drawTextWithIcons(card.title, { left: 0, top: 150, fontSize: 25, width: card.template.dimensions.width, height: 400 })
        this.drawCirclePortrait(card.data.portrait, { left: card.template.dimensions.width / 2 - 125, top: 200 })
        this.drawLootBox(card.data.stats.reward)
        this.drawLabel(card.template.deck, 945, 10, 30, card.template.labelColor)
        this.renderAll()
    }
}

class ItemCardPrinter extends CardPrinter {
    print = (card) => {
        if (!card instanceof QuestCardTemplate) {
            console.error("Current card" + card + " is not an instance of BossCardTemplate")
        }
        this.drawBackground(card.template.backgroundColor)
        this.drawBorder(card.template.borderProperties)
        this.drawLabel(card.template.type, 30, 50, 60, card.template.labelColor)

        this.drawTextWithIcons(card.data.stats.bonus, { left: 0, top: 100, fontSize: 35, width: card.template.dimensions.width, height: 400, textAlign: "center" })
        this.drawTextWithIcons(card.title, { left: 0, top: 210, fontSize: 35, width: card.template.dimensions.width, height: 400, textAlign: "center" })
        this.drawCirclePortrait(card.data.portrait, { left: card.template.dimensions.width / 2 - 125, top: 250 })
        this.drawTextWithIcons(card.data.descriptions[0], { left: 0, top: 520, fontSize: 25, width: card.template.dimensions.width, height: 100, textAlign: "center" })
        this.drawStatsBox(card.data.stats)

        let types = card.data.stats.type
            .filter(function (word) {
                return word != null;
            })
            .join('\n')
        this.drawTextWithIcons(types, { left: 0, top: 850, fontSize: 35, width: 200, height: 100 })
        this.drawLabel(card.template.deck, 945, 10, 30, card.template.labelColor)
        this.drawTextWithIcons('' + card.data.stats.value + ' sztuk złota', { left: 150, top: 900, fontSize: 35, width: card.template.dimensions.width, height: 100, textAlign: 'right' })
        this.renderAll()
    }


    drawStatsBox = (stats) => {
        let margin = 40
        let boxTop = 600
        let boxHeight = 160

        let padding3Letters = (string) => {
            switch (string.toString(10).length) {
                case 0: return '   '
                case 1: return ' ' + string + ' '
                case 2: return ' ' + string
                default: return string
            }
        }

        let rectWidth = this.dimensions.width - margin * 2
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

        let armorIcon = new fabric.Textbox('\uf553\n' + padding3Letters(stats.strength), {
            fontFamily: 'Font Awesome 5 Free',
            top: 20,
            fontSize: 50,
            fontWeight: 920,
            left: margin,
            width: rectWidth,
            fill: '#25120c',
        })

        let dmgIcon = new fabric.Textbox('\uf6de\n' + padding3Letters(stats.power), {
            fontFamily: 'Font Awesome 5 Free',
            top: 20,
            fontSize: 50,
            fontWeight: 920,
            width: rectWidth,
            textAlign: 'center',
            fill: '#25120c',
        })

        let shieldIcon = new fabric.Textbox('\uf3ed\n' + padding3Letters(stats.shield), {
            fontFamily: 'Font Awesome 5 Free',
            top: 20,
            fontSize: 50,
            fontWeight: 920,
            width: rectWidth - margin,
            textAlign: 'right',
            fill: '#25120c',
        })


        var group = new fabric.Group([rect, shieldIcon, dmgIcon, armorIcon], {
            left: margin,
            top: boxTop,
            selectable: false
        })
        canvas.add(group)



    }
}

let getCardPrinter = (canvas, card) => {
    const bossCardPrinter = new BossCardPrinter(canvas, card.template.dimensions)
    const questCardPrinter = new QuestCardPrinter(canvas, card.template.dimensions)
    const itemCardPrinter = new ItemCardPrinter(canvas, card.template.dimensions)


    new QuestCardPrinter(canvas, card.template.dimensions)

    switch (card.template.type) {
        case 'boss': return bossCardPrinter
        case 'quest': return questCardPrinter
        case 'item': return itemCardPrinter
        case 'boss item': return itemCardPrinter
        default: console.error('Unhandled card type: ' + card.template.type)
    }
}
//-----------demo card - Bheg------------------
let bossCard = new Card
    ({
        id: 1,
        title: 'BHEG',
        template: new BossCardTemplate(),
        data: {
            portrait: '../public/assets/images/1.png',
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

//-----------demo card - Quest------------------
let questCard = new Card({
    id: 2,
    title: 'POMÓŻ INNEMU GRACZOWI',
    template: new QuestCardTemplate(),
    data: {
        portrait: '../public/assets/images/question_mark.png',
        stats: {
            reward: '+1 poziom'
        }
    }
})

//-----------demo card - Item------------------
let itemCard = new Card({
    id: 3,
    title: 'CIEPLUTKIE KALESONIKI',
    template: new ItemCardTemplate(),
    data: {
        portrait: '../public/assets/images/item_1.png',
        stats: {
            value: 600,
            type: ['Zbroja', 'Duża'],
            bonus: 'Bonus +1\n Nie dla Mage',
            strength: 2,
            power: 0,
            shield: 3
        },
        descriptions: {
            0: 'Zobacz jak na Tobie leżą!'
        }

    }
})

//-----------demo card - Boss Item------------------
let bossItemCard = new Card({
    id: 4,
    title: 'ZBROJA Z DYWANU',
    template: new BossItemCardTemplate(),
    data: {
        portrait: '../public/assets/images/item_2.png',
        stats: {
            value: 600,
            type: ['Zbroja'],
            bonus: 'Bonus +1',
            strength: 1,
            power: 1,
            shield: 2
        },
        descriptions: {
            0: 'Kiedy niesiesz ten przedmiot +2 \uf496!'
        }

    }
})

//----Keep all cards in one list-----//
const cards = [bossCard, questCard, itemCard, bossItemCard]
let cardIndex = 3
let currentCard = cards[cardIndex]

//------------canvas setup---------------
let canvas = new fabric.Canvas('c')
canvas.setWidth(currentCard.template.dimensions.width)
canvas.setHeight(currentCard.template.dimensions.height)

//-------------print card----------------
let printer = getCardPrinter(canvas, currentCard)
printer.print(cards[cardIndex])

//---- selection button handlers
var buttonPrevious = document.getElementById("button_previous")
buttonPrevious.addEventListener('click', (e) => {
    if (cardIndex == 0) {
        cardIndex = cards.length - 1
    } else {
        cardIndex -= 1
    }
    canvas.clear();
    currentCard = cards[cardIndex]
    getCardPrinter(canvas, currentCard)
        .print(currentCard)
})

var buttonNext = document.getElementById("button_next")
buttonNext.addEventListener('click', (e) => {
    if (cardIndex == cards.length - 1) {
        cardIndex = 0
    } else {
        cardIndex += 1
    }
    canvas.clear();
    currentCard = cards[cardIndex]
    getCardPrinter(canvas, currentCard)
        .print(currentCard)
})

// TODO remove not common part - images, text from template and use it later

/*
    A plan is following:
        1. User select from the list of existing templates
        2. depending on the template user should be able to provide text, effects, images and properties on editor
        3. user may choose card specific properties and mechanics - including special effects
        4. user may save a card as a draft or public to existing decks - (see label on the bottom)
*/
