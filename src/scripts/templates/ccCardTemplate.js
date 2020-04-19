import { CardTemplate } from './cardTemplate'

export { CCCardTemplate }

class CCCardTemplate extends CardTemplate {
    type = 'cc'
    backgroundColor = '#fec657'
    labelColor = '#fec657'
    fontColor = '#25120c'
    borderProperties = {
        outerBorderColor: '#25120c',
        innerBorderColor: '#25120c'
    }
}