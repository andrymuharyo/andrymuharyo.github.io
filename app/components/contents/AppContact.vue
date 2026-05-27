<script lang="ts" setup>
import { gsap } from 'gsap'

interface Props {
  id?: string
}

defineProps<Props>()

const sectionRef = ref<HTMLElement | null>(null)
const descriptionRef = ref<HTMLElement | null>(null)
const contactItemRefs = ref<(HTMLDivElement | null)[]>([])
const isSectionVisible = ref(false)
const isDescriptionVisible = ref(false)

const setContactItemRef = (el: HTMLDivElement | null, index: number) => {
  contactItemRefs.value[index] = el
}

const playContactAnimation = () => {
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

const playContactLinksAnimation = () => {
  const visibleItems = contactItemRefs.value.filter((item): item is HTMLDivElement => Boolean(item))

  if (!visibleItems.length) {
    return
  }

  gsap.killTweensOf(visibleItems)

  gsap.fromTo(
    visibleItems,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12
    }
  )
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isSectionVisible.value = entry.isIntersecting
        if (entry.isIntersecting) {
          isDescriptionVisible.value = true
          playContactAnimation()
          playContactLinksAnimation()
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
    :id="id || 'contact'"
    ref="sectionRef"
    :class="isSectionVisible ? 'bg-mist-100 dark:bg-mist-900' : 'bg-cyan-100 dark:bg-cyan-900'"
    class="relative overflow-hidden h-screen transition-all duration-500 ease-in-out"
  >
    <div class="absolute left-0 right-0 w-full h-full">
      <div
        class="opacity-0 w-full h-full"
      >
        <NuxtImg
          alt="skill"
          class="w-full h-full object-cover object-right lg:object-center opacity-7 dark:opacity-2"
          src="./assets/bg-contact.jpg"
        />
      </div>
    </div>
    <div class="flex flex-col items-center justify-center h-full px-4 sm:px-6">
      <div
        ref="descriptionRef"
        :class="isDescriptionVisible ? '' : '!opacity-0'"
        class="space-y-6 mx-auto"
      >
        <UPageSection
          :ui="{ container: 'flex lg:items-start justify-center lg:!pb-10', description: 'mt-3 lg:mt-6 text-xl ' }"
          description="I'm currently available for freelance work and open to new opportunities. If you have a project in mind or would like to discuss potential collaborations, feel free to reach out!"
          title="Get In Touch"
        />
      </div>
      <div class="flex items-center gap-14">
        <div :ref="(el) => setContactItemRef(el as HTMLDivElement | null, 0)">
          <ULink
            class="text-red-500"
            href="mailto:andrymuharyo@gmail.com"
            target="_blank"
          >
            <UIcon
              class="w-8 h-8"
              name="i-lucide-mail"
            />
          </ULink>
        </div>
        <div :ref="(el) => setContactItemRef(el as HTMLDivElement | null, 1)">
          <ULink
            class="text-blue-500"
            href="https://www.linkedin.com/in/andrymuharyo/"
            target="_blank"
          >
            <UIcon
              class="w-8 h-8"
              name="i-lucide-linkedin"
            />
          </ULink>
        </div>
        <div :ref="(el) => setContactItemRef(el as HTMLDivElement | null, 2)">
          <ULink
            class="text-green-500"
            href="https://wa.me/6281319820707"
            target="_blank"
          >
            <UIcon
              class="w-8 h-8"
              name="i-lucide-message-circle-check"
            />
          </ULink>
        </div>
      </div>
    </div>
  </div>
</template>
