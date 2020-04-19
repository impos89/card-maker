import { BossCardPrinter } from './bossCardPrinter'
import { QuestCardPrinter } from './questCardPrinter'
import { ItemCardPrinter } from './itemCardPrinter'
import { CCCardPrinter } from './ccCardPrinter'
import { getTemplateById } from '../templates/templateFactory'

export { getCardPrinter }

const getCardPrinter = (canvas, card) => {
    const bossCardPrinter = new BossCardPrinter(canvas)
    const questCardPrinter = new QuestCardPrinter(canvas)
    const itemCardPrinter = new ItemCardPrinter(canvas)
    const ccCardPrinter = new CCCardPrinter(canvas)

    const type = getTemplateById(card.template).type
    console.debug('Getting printer for template of type=[%s]', type)
    switch (type) {
        case 'boss': return bossCardPrinter
        case 'quest': return questCardPrinter
        case 'item': return itemCardPrinter
        case 'boss item': return itemCardPrinter
        case 'cc': return ccCardPrinter
        default: console.error('Unhandled unknown card template type.')
    }
}