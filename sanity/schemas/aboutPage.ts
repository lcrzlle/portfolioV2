import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'aboutPage',
    title: 'Page À Propos',
    type: 'document',
    fields: [
        defineField({ name: 'page_title', title: 'Titre principal', type: 'string' }),
        defineField({ name: 'page_subtitle_1', title: 'Sous-titre 1', type: 'string' }),
        defineField({ name: 'page_subtitle_2', title: 'Sous-titre 2', type: 'string' }),
        defineField({ name: 'page_subtitle_3', title: 'Sous-titre 3', type: 'string' }),
        defineField({
            name: 'page_headline',
            title: 'Accroche (3 lignes)',
            type: 'object',
            fields: [
                defineField({ name: 'line_1', title: 'Ligne 1', type: 'string' }),
                defineField({ name: 'line_2', title: 'Ligne 2', type: 'string' }),
                defineField({ name: 'line_3', title: 'Ligne 3', type: 'string' }),
            ],
        }),
        defineField({ name: 'page_paragraph_1', title: 'Paragraphe 1', type: 'text' }),
        defineField({ name: 'page_paragraph_2', title: 'Paragraphe 2', type: 'text' }),
        defineField({
            name: 'about_slider',
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
    preview: { prepare: () => ({ title: 'Page À Propos' }) },
})
