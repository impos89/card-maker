import { ItemCardTemplate } from './itemCardTemplate'

export { BossItemCardTemplate }

class BossItemCardTemplate extends ItemCardTemplate {
    id = 'bossItem01'
    type = 'boss item'
    backgroundColor = '#cd7f73'
    labelColor = '#b56e63'
    fontColor = '#25120c'
    borderProperties = {
        outerBorderColor: '#25120c',
        innerBorderColor: '#25120c'
    }
}