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
        { name: 'viewport', content: 'minimum-scale=1.0, width=device-width, initial-scale=1,  maximum-scale=1.0, user-scalable=no' },
        { hid: 'description', name: 'description', content: "Portfolio de Léo Crouzille, photographe indépendant spécialisé dans les domaines du BTP et de l'architecture." },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://leocrouzille.com' },
        { property: 'og:title', content: 'Léo Crouzille - Photographe Indépendant BTP, Architecture, Corporate' },
        { property: 'og:description', content: "Portfolio de Léo Crouzille, photographe indépendant spécialisé dans les domaines du BTP et de l'architecture." },
        { property: 'og:image', content: 'http://backoffice.leocrouzille.com/wp-content/uploads/2024/02/Architecture_Envol_Velizy_1.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:domain', content: 'leocrouzille.com' },
        { name: 'twitter:url', content: 'https://leocrouzille.com' },
        { name: 'twitter:title', content: 'Léo Crouzille - Photographe Indépendant BTP, Architecture, Corporate' },
        { name: 'twitter:description', content: "Portfolio de Léo Crouzille, photographe indépendant spécialisé dans les domaines du BTP et de l'architecture." },
        { name: 'twitter:image', content: 'http://backoffice.leocrouzille.com/wp-content/uploads/2024/02/Architecture_Envol_Velizy_1.jpg' }
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