import { CardTemplate } from './cardTemplate'

export { BossCardTemplate }

class BossCardTemplate extends CardTemplate {
    id = 'boss01'
    type = 'boss'
    backgroundColor = '#e6daa6'
    labelColor = '#c94a3b'
    fontColor = '#25120c'
    borderProperties = {
        outerBorderColor: '#25120c',
        innerBorderColor: '#c94a3b'
    }
}