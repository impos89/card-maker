import { CardTemplate } from './cardTemplate'

export { ItemCardTemplate }

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