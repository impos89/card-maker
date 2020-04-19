'use strict'
import { fabric } from 'fabric'
import '@fortawesome/fontawesome-free/js/fontawesome'

import { BossCardTemplate } from './templates/bossCardTemplate'
import { BossItemCardTemplate } from './templates/bossItemCardTemplate'
import { ItemCardTemplate } from './templates/itemCardTemplate'
import { QuestCardTemplate } from './templates/questCardTemplate'
import { CCCardTemplate } from './templates/ccCardTemplate'
import { Card } from './model/card'
import { getCardPrinter } from './render/cardPrinterFactory'
import { CardTemplate } from './templates/cardTemplate'

//-----------demo card - Bheg------------------
let bossCard = new Card
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
let questCard = new Card({
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
let itemCard = new Card({
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
let bossItemCard = new Card({
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



//----Keep all cards in one list-----//
const cards = [bossCard, questCard, itemCard, bossItemCard]
let cardIndex = 3
let currentCard = cards[cardIndex]

//------------canvas setup---------------
export let canvas = new fabric.Canvas('c')
export const dimensions = new CardTemplate().dimensions
canvas.setWidth(dimensions.width)
canvas.setHeight(dimensions.height)

//-------------print card----------------
let printer = getCardPrinter(canvas, currentCard)
printer.print(cards[cardIndex])

//---- selection button handlers
var buttonPrevious = document.getElementById("button_previous")
buttonPrevious.addEventListener('click', (e) => {
    if (cardIndex == 0) {
        cardIndex = cards.length - 1
    } else {
        cardIndex -= 1
    }
    canvas.clear();
    currentCard = cards[cardIndex]
    getCardPrinter(canvas, currentCard)
        .print(currentCard)
})

var buttonNext = document.getElementById("button_next")
buttonNext.addEventListener('click', (e) => {
    if (cardIndex == cards.length - 1) {
        cardIndex = 0
    } else {
        cardIndex += 1
    }
    canvas.clear();
    currentCard = cards[cardIndex]
    getCardPrinter(canvas, currentCard)
        .print(currentCard)
})

// TODO remove not common part - images, text from template and use it later

/*
    A plan is following:
        1. User select from the list of existing templates
        2. depending on the template user should be able to provide text, effects, images and properties on editor
        3. user may choose card specific properties and mechanics - including special effects
        4. user may save a card as a draft or public to existing decks - (see label on the bottom)
*/
