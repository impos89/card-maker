import { ItemCardTemplate } from '../templates/itemCardTemplate';
import { CardPrinter } from './cardPrinter'

export { ItemCardPrinter }
class ItemCardPrinter extends CardPrinter {
    print = (card) => {
        if (!card instanceof ItemCardTemplate) {
            console.error("Current card" + card + " is not an instance of ItemCardTemplate")
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
        this.canvas.add(rect)

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
        this.canvas.add(group)
    }
}