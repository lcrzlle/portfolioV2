import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'settings',
    title: 'Paramètres du site',
    type: 'document',
    fields: [
        defineField({ name: 'email', title: 'Email de contact', type: 'string' }),
        defineField({ name: 'instagram_link', title: 'Lien Instagram', type: 'url' }),
        defineField({ name: 'linkedin_link', title: 'Lien LinkedIn', type: 'url' }),
        defineField({ name: 'youtube_link', title: 'Lien YouTube', type: 'url' }),
        defineField({
            name: 'contact_slider_image',
            title: 'Image fond page Contact',
            type: 'image',
            options: { hotspot: true },
            fields: [defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' })],
        }),
    ],
    preview: { prepare: () => ({ title: 'Paramètres du site' }) },
})
