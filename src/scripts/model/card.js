export { Card }

class Card {
    constructor(obj) {
        this.id = obj.id || 0
        this.title = obj.title || 'unnamed'
        this.template = obj.template || new CardTemplate()
        this.data = {
            portrait: '../public/assets/images/no_image.png',
            stats: {
                playerNumbers: ['0', '0', '0', '0'],
                dps: ['0', '0', '0', '0'],
                hp: ['0', '0', '0', '0'],
                miserableEnd: 'No effect',
                effect1: 'No effect',
                reward: 'No reward'
            }
        }

        if (obj.data) {
            this.data.portrait = obj.data.portrait || '../public/assets/images/no_image.png' // TODO 'No Image'
            if (obj.data.stats) {
                this.data.stats.playerNumbers = obj.data.stats.playerNumbers || ['3', '4', '5-6', '7-8']
                this.data.stats.dps = obj.data.stats.dps || ['0', '0', '0', '0']
                this.data.stats.hp = obj.data.stats.hp || ['0', '0', '0', '0']
                this.data.stats.miserableEnd = obj.data.stats.miserableEnd || 'No effect'
                this.data.stats.effect1 = obj.data.stats.effect1 || 'No effect'
                this.data.stats.reward = obj.data.stats.reward || 'No reward'
                this.data.stats.bonus = obj.data.stats.bonus || 'No bonus' // item only
                this.data.stats.strength = obj.data.stats.strength || 0 // item only
                this.data.stats.power = obj.data.stats.power || 0 // item only
                this.data.stats.shield = obj.data.stats.shield || 0 // item only
                this.data.stats.type = obj.data.stats.type || ['Zbroja', 'Duża'] // item only
                this.data.stats.value = obj.data.stats.value || 0 // item only
            } else {
                this.data.stats = {
                    playerNumbers: ['0', '0', '0', '0'],
                    dps: ['0', '0', '0', '0'],
                    hp: ['0', '0', '0', '0'],
                    miserableEnd: 'No effect',
                    effect1: 'No effect',
                    reward: 'No reward',
                    bonus: 'No bonus'
                }
            }
            if (obj.data.descriptions) {
                this.data.descriptions = obj.data.descriptions || { 0: '', 1: '', 2: '' }
            }
        }
    }
}