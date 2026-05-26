<script lang="ts" setup>
import { gsap } from 'gsap'

interface Props {
  id?: string
}

defineProps<Props>()

const sectionRef = ref<HTMLElement | null>(null)
const descriptionRef = ref<HTMLElement | null>(null)
const isSectionVisible = ref(false)
const isImageVisible = ref(false)
const isDescriptionVisible = ref(false)

const playAboutAnimation = () => {
  if (!sectionRef.value || !descriptionRef.value) {
    return
  }

  gsap.killTweensOf([sectionRef.value, descriptionRef.value])

  gsap.fromTo(
    sectionRef.value,
    { opacity: 0, x: -100 },
    {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: 'power3.out'
    }
  )

  gsap.fromTo(
    descriptionRef.value,
    { opacity: 0, x: 100 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out'
    }
  )
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isSectionVisible.value = true
          isImageVisible.value = true
          isDescriptionVisible.value = true
          playAboutAnimation()
          return
        }
        isSectionVisible.value = false
        isImageVisible.value = false
        isDescriptionVisible.value = false
      })
    },
    {
      threshold: 0.5
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
  <section
    :id="id || 'about'"
    class="relative overflow-hidden h-screen transition-all duration-500 ease-in-out"
    :class="isSectionVisible ? 'bg-indigo-200 dark:bg-indigo-900' : 'bg-mist-100 dark:bg-mist-900'"
  >
    <UPageSection
      :reverse="true"
      orientation="horizontal"
      title="Everything you need to know about me"
      :ui="{ container: 'flex items-center justify-center content-center h-screen', description: 'mt-0 lg:mt-6' }"
    >
      <template #description>
        <div
          ref="descriptionRef"
          :class="isDescriptionVisible ? '' : '!opacity-0'"
          class="space-y-4 text-xl text-mist-700 dark:text-mist-300 overflow-y-auto max-h-[60vh] lg:overflow-y-visible"
        >
          <p>I am a Senior Full-Stack Web Developer and Designer with +15 years of experience leveraging design to build impactful digital solutions. A 2006 Product Design graduate from Trisakti University, I specialize in combining creative design principles with robust web technologies to build dynamic, content-driven websites.</p>
          <p>Driven by a passion for innovation, I developed a proprietary project methodology that spans <b>conceptualization, planning, modeling, detailing, and final execution</b>.</p>
          <p>In addition to my development work, I share my expertise as an Ex-Associate Lecturer at LSPR Communication &amp; Business Institute (formerly STIKOM Jakarta), teaching Desktop Publishing with a focus on the creation and strategic planning of print and digital media.</p>
        </div>
      </template>
      <div
        ref="sectionRef"
        :class="isImageVisible ? '' : '!opacity-0'"
      >
          <NuxtImg
            src="./assets/bg-about.jpg"
            width="400"
            height="400"
            alt="Illustration"
            class="rounded-lg h-20 w-20 lg:h-full lg:w-full"
            loading="lazy"
          />
      </div>
    </UPageSection>
  </section>
</template>
