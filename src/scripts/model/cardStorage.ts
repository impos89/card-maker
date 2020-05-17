import { Card } from './card';

export function downloadCardsAsJson(card : Card[]) {
    let json : string = JSON.stringify(card)
    let oMyBlob = new Blob([json], {type : 'application/json'});
    window.open(URL.createObjectURL(oMyBlob));
}

export function uploadCardsFromFile() {

}