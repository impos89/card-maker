import { CardPrinter } from './cardPrinter'
import { QuestCardTemplate } from '../templates/questCardTemplate'

export { QuestCardPrinter }

class QuestCardPrinter extends CardPrinter {
    print = (card) => {
        if (!card instanceof QuestCardTemplate) {
            console.error("Current card" + card + " is not an instance of QuestCardTemplate")
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