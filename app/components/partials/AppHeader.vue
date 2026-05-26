<script lang="ts" setup>
import { gsap } from 'gsap'
const logoRef = ref<HTMLElement | null>(null)


const playLogoAnimation = () => {
  if (!logoRef.value) {
    return
  }

  gsap.fromTo(
    logoRef.value,
    { opacity: 0, y: -50 },
    {
      opacity: 1,
      y: 0,
      duration: 5,
      ease: 'power3.out'
    }
  )
}


onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playLogoAnimation()
        }
      })
    },
    {
      threshold: 0.2
    }
  )

  if (logoRef.value) {
    observer.observe(logoRef.value)
  }

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})
</script>

<template>
  <div  ref="logoRef" 
    class="absolute top-8 left-8 lg:left-auto lg:right-8 z-50 lg:text-right opacity-0"
  >
      <NuxtLink to="/">
        <h1 class="font-bold capitalize text-4xl leading-[0.75] text-mist-600 dark:text-mist-100">
          Andry<br/>Muharyo
        </h1>
      </NuxtLink>
  </div>
</template>
