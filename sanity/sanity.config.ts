import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
    name: 'default',
    title: 'Portfolio',

    projectId: '30ojlbz1',
    dataset: 'production',

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Contenu')
                    .items([
                        S.listItem().title('Projets').schemaType('project').child(
                            S.documentTypeList('project').title('Projets')
                        ),
                        S.listItem().title('Projets Personnels').schemaType('projetPerso').child(
                            S.documentTypeList('projetPerso').title('Projets Personnels')
                        ),
                        S.divider(),
                        S.listItem().title('Paramètres du site').child(
                            S.document().schemaType('settings').documentId('settings')
                        ),
                        S.listItem().title('Page Accueil').child(
                            S.document().schemaType('homePage').documentId('homePage')
                        ),
                        S.listItem().title('Page À Propos').child(
                            S.document().schemaType('aboutPage').documentId('aboutPage')
                        ),
                        S.listItem().title('Page Crédits').child(
                            S.document().schemaType('creditsPage').documentId('creditsPage')
                        ),
                        S.listItem().title('Page Mentions Légales').child(
                            S.document().schemaType('mentionsPage').documentId('mentionsPage')
                        ),
                    ]),
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
})
