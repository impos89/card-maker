import { Card } from './card'

//-----------demo card - Bheg------------------
const bossCard = new Card
    ({
        id: 1,
        title: 'BHEG',
        template: 'boss01',
        data: {
            portrait: '../public/assets/images/1.png',
            stats: {
                playerNumbers: ['3', '4', '5-6', '7-8'],
                dps: ['35', '50', '75', '100'],
                hp: ['45', '60', '90', '120'],
                miserableEnd: 'Dodatkowe 8 Ran, Wszyscy tracą 2 poziomy',
                effect1: '+2 \uf6de za każdy przedmiot na +0, walczących graczy',
                reward: 'Boss Item, TradePack, kryształ, czar, 2 skarby dla gracza od drzwi. Poziom +2/+1'
            }
        }
    })

//-----------demo card - Quest------------------
const questCard = new Card({
    id: 2,
    title: 'POMÓŻ INNEMU GRACZOWI',
    template: 'quest01',
    data: {
        portrait: '../public/assets/images/question_mark.png',
        stats: {
            reward: '+1 poziom'
        }
    }
})

//-----------demo card - Item------------------
const itemCard = new Card({
    id: 3,
    title: 'CIEPLUTKIE KALESONIKI',
    template: 'item01',
    data: {
        portrait: '../public/assets/images/item_1.png',
        stats: {
            value: 600,
            type: ['Zbroja', 'Duża'],
            bonus: 'Bonus +1\n Nie dla Mage',
            strength: 2,
            power: 0,
            shield: 3
        },
        descriptions: {
            0: 'Zobacz jak na Tobie leżą!'
        }

    }
})

//-----------demo card - Boss Item------------------
const bossItemCard = new Card({
    id: 4,
    title: 'ZBROJA Z DYWANU',
    template: 'bossItem01',
    data: {
        portrait: '../public/assets/images/item_2.png',
        stats: {
            value: 600,
            type: ['Zbroja'],
            bonus: 'Bonus +1',
            strength: 1,
            power: 1,
            shield: 2
        },
        descriptions: {
            0: 'Kiedy niesiesz ten przedmiot +2 \uf496!'
        }

    }
})

export const cards: Card[] = [bossCard, questCard, itemCard, bossItemCard];

