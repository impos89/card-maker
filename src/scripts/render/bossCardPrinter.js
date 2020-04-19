import { CardPrinter } from './cardPrinter'
import { BossCardTemplate } from '../templates/bossCardTemplate'

export { BossCardPrinter }

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
        this.canvas.add(rect)

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
            this.canvas.add(playerNumber)
            group.addWithUpdate(playerNumber)
            var dpsNumber = new fabric.Text(stats.dps[i],
                {
                    left: 150 + 130 * i,
                    top: centerPoint.y,
                    fill: '#25120c',
                    originX: 'center',
                    originY: 'center'
                })
            this.canvas.add(dpsNumber)
            group.addWithUpdate(dpsNumber)
            var hpNumber = new fabric.Text(stats.hp[i],
                {
                    left: 150 + 130 * i,
                    top: centerPoint.y + 70,
                    fill: '#25120c',
                    originX: 'center',
                    originY: 'center'
                })
            this.canvas.add(hpNumber)
            group.addWithUpdate(hpNumber)
        }
        this.canvas.add(group)
    }

    drawBossName = (name) => {
        var bossName = new fabric.Text(name,
            {
                left: 380,
                top: 100,
                fontSize: 60,
                fill: '#25120c',
            })
        this.canvas.add(bossName)
    }
}