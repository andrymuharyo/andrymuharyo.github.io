<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import AppAbout from '~/components/contents/AppAbout.vue'
import AppHero from '~/components/contents/AppHero.vue'
import AppSkill from '~/components/contents/AppSkill.vue'
import AppPortfolio from '~/components/contents/AppPortfolio.vue'
import AppContact from '~/components/contents/AppContact.vue'
  
gsap.registerPlugin(ScrollToPlugin)

const mainRef = ref<HTMLElement | null>(null)
const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skill', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' }
]

let currentSectionIndex = 0
let isScrolling = false
let scrollTimeout: ReturnType<typeof setTimeout> | null = null

const scrollToSectionByIndex = (index: number) => {
  if (isScrolling || !mainRef.value) return

  currentSectionIndex = Math.max(0, Math.min(index, sections.length - 1))
  const section = sections[currentSectionIndex]
  if (!section) return

  const target = document.getElementById(section.id)

  if (!target) return

  isScrolling = true

  gsap.to(mainRef.value, {
    scrollTo: {
      y: target,
      offsetY: 0
    },
    duration: 0.8,
    ease: 'power3.inOut',
    onComplete: () => {
      isScrolling = false
    }
  })
}

const handleWheel = (event: WheelEvent) => {
  if (isScrolling) {
    event.preventDefault()
    return
  }

  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }

  event.preventDefault()

  if (event.deltaY > 0) {
    scrollToSectionByIndex(currentSectionIndex + 1)
  } else {
    scrollToSectionByIndex(currentSectionIndex - 1)
  }

  scrollTimeout = setTimeout(() => {
    scrollTimeout = null
  }, 1000)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (isScrolling) return

  if (event.key === 'ArrowDown' || event.key === ' ') {
    event.preventDefault()
    scrollToSectionByIndex(currentSectionIndex + 1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    scrollToSectionByIndex(currentSectionIndex - 1)
  }
}

const observeSections = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id
        const index = sections.findIndex(s => s.id === sectionId)

        if (entry.isIntersecting && index !== -1) {
          currentSectionIndex = index
        }
      })
    },
    {
      threshold: 0.3,
      root: mainRef.value
    }
  )

  sections.forEach((section) => {
    const element = document.getElementById(section.id)
    if (element) {
      observer.observe(element)
    }
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })
}

onMounted(() => {
  if (!mainRef.value) return

  observeSections()

  mainRef.value.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('keydown', handleKeydown)

  onBeforeUnmount(() => {
    if (mainRef.value) {
      mainRef.value.removeEventListener('wheel', handleWheel)
    }
    window.removeEventListener('keydown', handleKeydown)
  })
})

provide('currentSectionIndex', computed(() => currentSectionIndex))
provide('sections', sections)
</script>

<template>
  <div ref="mainRef" class="h-screen overflow-y-auto select-none">
    <AppHero id="home" />
    <AppAbout id="about" />
    <AppSkill id="skill" />
    <AppPortfolio id="portfolio" />
    <AppContact id="contact" />
  </div>
</template>
