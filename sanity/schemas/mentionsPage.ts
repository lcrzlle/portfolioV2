import { defineType, defineField } from 'sanity'

const mentionField = (name: string, title: string) => defineField({
    name,
    title,
    type: 'object',
    fields: [
        defineField({ name: 'title', title: 'Titre', type: 'string' }),
        defineField({ name: 'text_line_1', title: 'Ligne 1', type: 'string' }),
        defineField({ name: 'text_line_2', title: 'Ligne 2', type: 'string' }),
        defineField({ name: 'text_line_3', title: 'Ligne 3', type: 'string' }),
        defineField({ name: 'text_line_4', title: 'Ligne 4', type: 'string' }),
        defineField({ name: 'text_line_5', title: 'Ligne 5', type: 'string' }),
    ],
})

export default defineType({
    name: 'mentionsPage',
    title: 'Page Mentions Légales',
    type: 'document',
    fields: [
        defineField({ name: 'page_title', title: 'Titre principal', type: 'string' }),
        defineField({ name: 'page_subtitle_1', title: 'Sous-titre 1', type: 'string' }),
        defineField({ name: 'page_subtitle_2', title: 'Sous-titre 2', type: 'string' }),
        defineField({ name: 'page_subtitle_3', title: 'Sous-titre 3', type: 'string' }),
        mentionField('page_mention_1', 'Mention 1'),
        mentionField('page_mention_2', 'Mention 2'),
        defineField({
            name: 'mentions_slider',
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
    preview: { prepare: () => ({ title: 'Page Mentions Légales' }) },
})
