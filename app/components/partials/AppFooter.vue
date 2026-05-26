<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const menuRef = ref<HTMLElement | null>(null)
const colorModeRef = ref<HTMLElement | null>(null)
const activeSection = ref('home')

const menuItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skill' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Contact', id: 'contact' }
]

const scrollToSection = (id: string) => {
  const mainScroller = document.querySelector('.h-screen.overflow-y-auto') as HTMLElement
  if (!mainScroller) return

  const target = document.getElementById(id)
  if (!target) return

  activeSection.value = id
  window.history.replaceState(null, '', `#${id}`)

  gsap.to(mainScroller, {
    scrollTo: {
      y: target,
      offsetY: 0
    },
    duration: 1.3,
    ease: 'power4.inOut'
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (visibleEntry?.target.id) {
        activeSection.value = visibleEntry.target.id
      }
    },
    {
      rootMargin: '-25% 0px -55% 0px',
      threshold: 0.5
    }
  )

  menuItems.forEach((item) => {
    const target = document.getElementById(item.id)
    if (target) {
      observer.observe(target)
    }
  })

  if (menuRef.value) {
    gsap.fromTo(
      menuRef.value,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
  }

  if (colorModeRef.value) {
    gsap.fromTo(
      colorModeRef.value,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
  }
})
</script>

<template>
  <div class="fixed bottom-0 z-50 w-full">
    <UHeader :ui="{ root: 'border-0 border-t border-primary bg-mist-100/50 dark:bg-mist-900/75', container: 'lg:max-w-[90%] max-w-full' }">
      <template #title>
        <div
          ref="menuRef"
          class="w-full opacity-0"
        >
          <nav class="flex items-center gap-8">
            <button
              v-for="item in menuItems"
              :key="item.id"
              type="button"
              class="transition-all duration-500 ease-in-out font-bold lowercase cursor-pointer hover:text-primary text-lg"
              :class="activeSection === item.id ? 'text-primary' : 'text-mist-700 dark:text-muted'"
              @click="scrollToSection(item.id)"
            >
              {{ item.label }}
            </button>
          </nav>
        </div>
      </template>

      <template #right>
        <div
          ref="colorModeRef"
          class="opacity-0"
        >
          <UColorModeButton />
        </div>
      </template>
    </UHeader>
  </div>
</template>
app/components/contents/AppPortfolio.vue
