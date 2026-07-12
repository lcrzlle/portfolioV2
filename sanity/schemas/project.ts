import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Projet',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Titre', type: 'string' }),
        defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title' } }),
        defineField({ name: 'project_number', title: 'Numéro de projet', type: 'string' }),
        defineField({ name: 'localisation', title: 'Localisation', type: 'string' }),
        defineField({
            name: 'title_preview',
            title: 'Titre preview (2 lignes)',
            type: 'object',
            fields: [
                defineField({ name: 'line_1', title: 'Ligne 1', type: 'string' }),
                defineField({ name: 'line_2', title: 'Ligne 2', type: 'string' }),
            ],
        }),
        defineField({
            name: 'primary',
            title: 'Image principale',
            type: 'image',
            options: { hotspot: true },
            fields: [defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' })],
        }),
        defineField({
            name: 'slides',
            title: 'Galerie (mosaïque)',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'image', title: 'Image', type: 'image',
                        options: { hotspot: true },
                        fields: [{ name: 'alt', title: 'Texte alternatif', type: 'string' }],
                    },
                    {
                        name: 'format', title: 'Format', type: 'string',
                        options: { list: [
                            { title: 'Horizontal', value: 'horizontal' },
                            { title: 'Vertical', value: 'vertical' },
                        ]},
                    },
                ],
            }],
        }),
        defineField({ name: 'video_url', title: 'URL Vidéo (YouTube ou Vimeo)', type: 'url' }),
        defineField({ name: 'order', title: 'Ordre d\'affichage', type: 'number' }),
    ],
    orderings: [{ title: 'Ordre', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
    preview: {
        select: { title: 'title', subtitle: 'localisation', media: 'primary' },
    },
})
