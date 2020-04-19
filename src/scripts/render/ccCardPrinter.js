import { CCCardTemplate } from '../templates/ccCardTemplate';
import { CardPrinter } from './cardPrinter';
import { getTemplateById } from '../templates/templateFactory'

export class CCCardPrinter extends CardPrinter {
    print = (card) => {
        if (!card instanceof CCCardTemplate) {
            console.error("Current card" + card + " is not an instance of CCCardTemplate");
        }

        const template = getTemplateById(card.template)
        this.drawBackground(template.backgroundColor);
        this.drawBorder(template.borderProperties);
        this.drawLabel(template.type, 30, 50, 60, template.labelColor);
        this.drawTextWithIcons(card.title, { left: 0, top: 150, fontSize: 25, width: template.dimensions.width, height: 400 });
        this.drawCirclePortrait(card.data.portrait, { left: template.dimensions.width / 2 - 125, top: 200 });
        this.drawLootBox(card.data.stats.reward);
        this.drawLabel(template.deck, 945, 10, 30, template.labelColor);
        this.renderAll();
    };
}
