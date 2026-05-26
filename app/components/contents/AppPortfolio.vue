<script lang="ts" setup>
import { gsap } from 'gsap'

interface Props {
  id?: string
}

defineProps<Props>()

const sectionRef = ref<HTMLElement | null>(null)
const descriptionRef = ref<HTMLElement | null>(null)
const isSectionVisible = ref(false)
const isDescriptionVisible = ref(false)

const playPortfolioAnimation = () => {
  if (!descriptionRef.value) {
    return
  }

  gsap.killTweensOf(descriptionRef.value)

  gsap.fromTo(
    descriptionRef.value,
    { opacity: 0, y: -100 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }
  )
}


onMounted(() => {
  // Find the main scroll container
  const scrollContainer = document.querySelector('.h-screen.overflow-y-auto') as HTMLElement | null

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isSectionVisible.value = entry.isIntersecting
        if (entry.isIntersecting) {
          isDescriptionVisible.value = true
          playPortfolioAnimation()
          return
        }
        isDescriptionVisible.value = false
      })
    },
    {
      threshold: 0.3
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})
</script>

<template>
  <div
    ref="sectionRef"
    :id="id || 'portfolio'"
    class="relative overflow-hidden h-screen transition-all duration-500 ease-in-out"
    :class="isSectionVisible ? 'bg-cyan-100 dark:bg-cyan-900' : 'bg-mist-100 dark:bg-mist-900'"
  >
    <div class="flex flex-col items-center justify-center h-full px-4 sm:px-6">
      <div 
          ref="descriptionRef"
          :class="isDescriptionVisible ? '' : '!opacity-0'" 
          class="space-y-6 mx-auto">
        <UPageSection
          title="My Portfolio"
          description="Here are some of my recent projects. Each project represents a unique challenge and an opportunity to apply my skills in creating effective and engaging web experiences."
          :ui="{ container: 'flex lg:items-start justify-center lg:!pb-10', description: 'mt-0 lg:mt-6' }"
        />
      </div>
    </div>
  </div>
</template>
