<script lang="ts" setup>
import { gsap } from 'gsap'

interface Props {
  id?: string
}

defineProps<Props>()

const heroRef = ref<HTMLElement | null>(null)
const heroBgRef = ref<HTMLElement | null>(null)

const playHeroAnimation = () => {
  if (!heroRef.value || !heroBgRef.value) {
    return
  }

  gsap.killTweensOf([heroRef.value, heroBgRef.value])

  gsap.fromTo(
    heroRef.value,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power2.out'
    }
  )

  gsap.fromTo(
    heroBgRef.value,
    { opacity: 0, y: -100 },
    {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: 'power2.out'
    }
  )
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playHeroAnimation()
        }
      })
    },
    {
      threshold: 0.2
    }
  )

  if (heroRef.value) {
    observer.observe(heroRef.value)
  }

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})
</script>

<template>
  <div :id="id || 'home'" class="relative overflow-hidden h-screen">
    <AppHeader />
    <span class="absolute inset-x-0 left-0 right-0 bottom-0 top-0 bg-mist-100/70 dark:bg-black/70 w-screen h-screen z-10" />
    <div class="absolute left-0 right-0 w-full h-full">
      <div ref="heroBgRef" class="opacity-0 w-full h-full">
        <NuxtImg
        alt="hero"
        class="w-full h-full object-cover object-right lg:object-center"
        src="./assets/bg-hero.jpg"
      />
      </div>
    </div>
    <div
      ref="heroRef"
      class="relative z-20 opacity-0"
    >
      <UPageHero
        :ui="{ container: 'max-w-[80%] lg:max-w-[65%] mx-auto !p-0', description: 'lg:!text-2xl/10 flex items-center justify-center h-screen text-mist-700 dark:text-mist-300' }"
        description="Tech Lead and Senior Full-Stack Developer based in Indonesia. With a strong background in both software engineering and design, I specialize in bridging the gap between complex technical execution and digital visual strategy. Beyond the screen, my passions for running and video games help keep me focused and continuously sharpen my strategic and tactical thinking."
      />
    </div>
  </div>
</template>

<style scoped>

</style>
