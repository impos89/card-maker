import { CardTemplate } from './cardTemplate'

export { QuestCardTemplate }

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