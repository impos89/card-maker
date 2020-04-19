import { BossCardPrinter } from './bossCardPrinter'
import { QuestCardPrinter } from './questCardPrinter'
import { ItemCardPrinter } from './itemCardPrinter'

export { getCardPrinter }

const getCardPrinter = (canvas, card) => {
    const bossCardPrinter = new BossCardPrinter(canvas, card.template.dimensions)
    const questCardPrinter = new QuestCardPrinter(canvas, card.template.dimensions)
    const itemCardPrinter = new ItemCardPrinter(canvas, card.template.dimensions)

    switch (card.template.type) {
        case 'boss': return bossCardPrinter
        case 'quest': return questCardPrinter
        case 'item': return itemCardPrinter
        case 'boss item': return itemCardPrinter
        default: console.error('Unhandled card type: ' + card.template.type)
    }
}