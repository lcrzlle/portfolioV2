import glsl from 'vite-plugin-glsl'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  modules: ['@nuxt/image'],
  css: ['~/assets/scss/main.scss'],
  imports: {
    dirs: [
      'composables/**'
    ]
  },
  vite: {
    plugins: [glsl()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/utils" as *;'
        }
      }
    }
  },
  app: {
    head: {
      title: 'Léo Crouzille - Photographe Indépendant BTP, Architecture, Corporate',
      htmlAttrs: {
        lang: 'fr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: "Portfolio de Léo Crouzille, photographe indépendant spécialisé dans les domaines du BTP et de l'architecture." },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Léo Crouzille' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:url', content: 'https://leocrouzille.com' },
        { property: 'og:title', content: 'Léo Crouzille - Photographe Indépendant BTP, Architecture, Corporate' },
        { property: 'og:description', content: "Portfolio de Léo Crouzille, photographe indépendant spécialisé dans les domaines du BTP et de l'architecture." },
        { property: 'og:image', content: 'https://leocrouzille.com/home/bnf.webp' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:domain', content: 'leocrouzille.com' },
        { name: 'twitter:url', content: 'https://leocrouzille.com' },
        { name: 'twitter:title', content: 'Léo Crouzille - Photographe Indépendant BTP, Architecture, Corporate' },
        { name: 'twitter:description', content: "Portfolio de Léo Crouzille, photographe indépendant spécialisé dans les domaines du BTP et de l'architecture." },
        { name: 'twitter:image', content: 'https://leocrouzille.com/home/bnf.webp' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            '@id': 'https://leocrouzille.com/#business',
            name: 'Léo Crouzille — Photographe & Vidéaste',
            url: 'https://leocrouzille.com',
            image: 'https://leocrouzille.com/home/bnf.webp',
            email: 'contact.leo.crouzille@gmail.com',
            description: "Photographe et vidéaste indépendant spécialisé dans le BTP, l'architecture et le corporate.",
            areaServed: 'France',
            founder: { '@type': 'Person', name: 'Léo Crouzille', jobTitle: 'Photographe indépendant' },
            sameAs: [
              'https://www.instagram.com/_.l.leo/',
              'https://www.linkedin.com/in/léo-crouzille/'
            ],
            knowsAbout: ['Photographie BTP', "Photographie d'architecture", 'Photographie corporate', 'Vidéo corporate']
          })
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png"
        },
        {
          rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"
        },
        {
          rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"
        },
        {
          rel: "manifest", href: "/site.webmanifest"
        },
        {
          href: '/fonts/Switzer-Variable.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  devServer: {
    port: 8000
  },
  build: {
		transpile: ['three', 'gsap'],
	},
  image: {
    domains: ['res.cloudinary.com']
  }
})