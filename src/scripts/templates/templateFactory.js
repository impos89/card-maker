import { BossCardTemplate } from './bossCardTemplate'
import { BossItemCardTemplate } from './bossItemCardTemplate'
import { ItemCardTemplate } from './itemCardTemplate'
import { QuestCardTemplate } from './questCardTemplate'
import { CCCardTemplate } from './ccCardTemplate'

const templates = [
    new BossCardTemplate(),
    new BossItemCardTemplate(),
    new ItemCardTemplate(),
    new QuestCardTemplate(),
    new CCCardTemplate()
]

export const getTemplateById = (templateId) => {
    console.debug('Geting template for id=[%s]', templateId)
    const templatesFound = templates.filter((template) => template.id === templateId)
    if (templatesFound.length == 0) {
        console.error('Template with id=[%s] does not exists', templateId)
        return null
    }

    if (templatesFound.length != 1) {
        console.error('Expected to return one template but found more:' + templatesFound)
        throw "Internal error"
    }
    return templatesFound[0]
}