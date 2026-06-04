import { defineType, defineField } from 'sanity'

const creditField = (name: string, title: string, hasTwo = false) => defineField({
    name,
    title,
    type: 'object',
    fields: hasTwo ? [
        defineField({ name: 'title', title: 'Titre', type: 'string' }),
        defineField({ name: 'text_1', title: 'Texte 1', type: 'string' }),
        defineField({ name: 'url_1', title: 'Lien 1', type: 'url' }),
        defineField({ name: 'text_2', title: 'Texte 2', type: 'string' }),
        defineField({ name: 'url_2', title: 'Lien 2', type: 'url' }),
    ] : [
        defineField({ name: 'title', title: 'Titre', type: 'string' }),
        defineField({ name: 'text', title: 'Texte', type: 'string' }),
        defineField({ name: 'url', title: 'Lien', type: 'url' }),
    ],
})

export default defineType({
    name: 'creditsPage',
    title: 'Page Crédits',
    type: 'document',
    fields: [
        defineField({ name: 'page_title', title: 'Titre principal', type: 'string' }),
        defineField({ name: 'page_subtitle_1', title: 'Sous-titre 1', type: 'string' }),
        defineField({ name: 'page_subtitle_2', title: 'Sous-titre 2', type: 'string' }),
        defineField({ name: 'page_subtitle_3', title: 'Sous-titre 3', type: 'string' }),
        creditField('page_credit_1', 'Crédit 1'),
        creditField('page_credit_2', 'Crédit 2'),
        creditField('page_credit_3', 'Crédit 3 (double lien)', true),
        defineField({
            name: 'credits_slider',
            title: 'Images du slider',
            type: 'array',
            of: [{
                type: 'object',
                fields: [{
                    name: 'image', title: 'Image', type: 'image',
                    options: { hotspot: true },
                    fields: [{ name: 'alt', title: 'Texte alternatif', type: 'string' }],
                }],
            }],
        }),
    ],
    preview: { prepare: () => ({ title: 'Page Crédits' }) },
})
