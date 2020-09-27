'use strict'
import { fabric } from 'fabric'
import '@fortawesome/fontawesome-free/js/fontawesome'
import { getCardPrinter } from './render/cardPrinterFactory'
import { CardTemplate } from './templates/cardTemplate'
import { downloadCardsAsJson } from './model/cardStorage'
import { $, jQuery } from 'jquery';
import "../styles/card-editor.scss"

window.$ = $;
window.jQuery = jQuery;

export let canvas = new fabric.Canvas('c')
export const dimensions = new CardTemplate().dimensions

let currentCard = null
let currentCardIndex = 0
let cards = []

function run() {

    //------------canvas setup---------------
    canvas.setWidth(dimensions.width)
    canvas.setHeight(dimensions.height)


    function loadCard(cardIndex) {
        let currentCard = cards[cardIndex]
        //-------------print card----------------
        let printer = getCardPrinter(canvas, currentCard)
        printer.print(currentCard)
    }

    //---- selection button handlers
    const buttonPrevious = document.getElementById("button_previous")
    buttonPrevious.addEventListener('click', (e) => {
        if (currentCardIndex == 0) {
            currentCardIndex = cards.length - 1
        } else {
            currentCardIndex -= 1
        }
        canvas.clear();
        currentCard = cards[currentCardIndex]
        getCardPrinter(canvas, currentCard)
            .print(currentCard)
    })

    const buttonNext = document.getElementById("button_next")
    buttonNext.addEventListener('click', (e) => {
        if (currentCardIndex == cards.length - 1) {
            currentCardIndex = 0
        } else {
            currentCardIndex += 1
        }
        canvas.clear();
        currentCard = cards[currentCardIndex]
        getCardPrinter(canvas, currentCard)
            .print(currentCard)
    })

    var reader = new FileReader();
    reader.onload = function (evt) {
        cards = JSON.parse(evt.target.result);
        loadCard(0)
    }

    const uploadInputElement = document.getElementById("uploadInput")
    uploadInputElement.addEventListener("change", (evt) => {
        let files = evt.currentTarget.files[0]
        console.log("in load file " + cards)
        reader.readAsText(files, 'UTF-8')
    }, false);

    const download_cards = document.getElementById("download_cards")
    download_cards.addEventListener('click', () => {
        downloadCardsAsJson(cards)
    }, false);
    
    // $(".loader-wrapper").fadeOut("slow");
    // $(window).on("load", () => {
        
    // });
}

run()



/*
    A plan is following:
        1. User select from the list of existing templates
        2. depending on the template user should be able to provide text, effects, images and properties on editor
        3. user may choose card specific properties and mechanics - including special effects
        4. user may save a card as a draft or public to existing decks - (see label on the bottom)
*/


//TODO:
// 1. For now all css files are included to html body (included by using import in js file). Find a way to separate them because we want to have separate styles on separate pages.
// 2. Add application loader ? before showing cards to wait until fonts (and other components) are loaded and ready to use.
// 3. Replace urls of portraits from: '../public/assets/images/item_2.png', to encoded URLs - prepare them to be accessible from server.
// 4. TODO remove not common part - images, text from template and use it later
// 5. recode application to use typescript only