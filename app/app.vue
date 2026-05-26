<script setup>
import AppHeader from '@/components/partials/AppHeader.vue'
import AppFooter from '@/components/partials/AppFooter.vue'
import CursorFx from '@/components/CursorFx.vue'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.svg' }],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Andry Muharyo | Web Dev Lead | Tech Leadership, Tech Management | Half Runner'
const description
  = 'Andry Muharyo is an Indonesian Tech Lead Developer with a robust foundation as a senior full-stack web developer and software engineer.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp class="w-full overflow-hidden">
    <AppHeader />
    <UMain class="h-screen">
      <NuxtPage />
    </UMain>
    <AppFooter />
    <CursorFx />
  </UApp>
</template>
