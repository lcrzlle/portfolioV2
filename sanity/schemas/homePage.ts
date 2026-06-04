import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'homePage',
    title: 'Page Accueil',
    type: 'document',
    fields: [
        defineField({ name: 'page_title', title: 'Titre principal', type: 'string' }),
        defineField({ name: 'page_subtitle_1', title: 'Sous-titre 1', type: 'string' }),
        defineField({ name: 'page_subtitle_2', title: 'Sous-titre 2', type: 'string' }),
        defineField({ name: 'page_subtitle_3', title: 'Sous-titre 3', type: 'string' }),
        defineField({ name: 'page_paragraph', title: 'Paragraphe', type: 'text' }),
        defineField({
            name: 'home_slider',
            title: 'Images du slider home',
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
    preview: { prepare: () => ({ title: 'Page Accueil' }) },
})
