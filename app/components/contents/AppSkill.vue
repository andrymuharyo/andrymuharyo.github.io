<script lang="ts" setup>
import { gsap } from 'gsap'

interface Props {
  id?: string
}

defineProps<Props>()

const sectionRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const descriptionRef = ref<HTMLElement | null>(null)
const circleRefs = ref<(SVGCircleElement | null)[]>([])
const percentRefs = ref<(HTMLSpanElement | null)[]>([])
const contactItemRefs = ref<(HTMLDivElement | null)[]>([])
const isSectionVisible = ref(false)
const isCardVisible = ref(false)
const isDescriptionVisible = ref(false)

const getCircleOffset = (percent: number) => 314 - (314 * percent / 100)

const setCircleRef = (el: SVGCircleElement | null, index: number) => {
  circleRefs.value[index] = el
}

const setPercentRef = (el: HTMLSpanElement | null, index: number) => {
  percentRefs.value[index] = el
}

const setSkillItemRef = (el: HTMLDivElement | null, index: number) => {
  contactItemRefs.value[index] = el
}

const playSkillAnimation = () => {
  if (!descriptionRef.value && !cardRef.value) {
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
  gsap.fromTo(
    cardRef.value,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    }
  )
}

const playSkillLinksAnimation = () => {
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

const playSkillCircleAnimation = () => {
  const visibleCircles = circleRefs.value.filter((circle): circle is SVGCircleElement => Boolean(circle))

  if (!visibleCircles.length) {
    return
  }

  gsap.killTweensOf(visibleCircles)
  gsap.killTweensOf(percentRefs.value)

  visibleCircles.forEach((circle, index) => {
    const skill = skillFacts[index]
    const percentEl = percentRefs.value[index]

    if (!skill || !percentEl) {
      return
    }

    circle.style.strokeDashoffset = '314'
    percentEl.textContent = '0%'

    gsap.fromTo(
      circle,
      { strokeDashoffset: 314 },
      {
        strokeDashoffset: getCircleOffset(skill.percent),
        duration: 1,
        ease: 'power3.out'
      }
    )

    const percentValue = { value: 0 }

    gsap.to(percentValue, {
      value: skill.percent,
      duration: 2.5,
      ease: 'power3.out',
      onUpdate() {
        percentEl.textContent = `${Math.round(percentValue.value)}%`
      }
    })
  })
}

onMounted(() => {
  // Find the main scroll container
  const scrollContainer = document.querySelector('.h-screen.overflow-y-auto') as HTMLElement | null

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isSectionVisible.value = entry.isIntersecting
        if (entry.isIntersecting) {
          isCardVisible.value = true
          isDescriptionVisible.value = true
          playSkillAnimation()
          playSkillCircleAnimation()
          playSkillLinksAnimation()
          return
        }
        isCardVisible.value = false
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

const skillFacts = [
  {
    percent: 90,
    icon : './assets/icons/laravel.svg',
    label: 'Laravel',
    description: 'PHP web framework used for building web applications following the Model-View-Controller (MVC) architectural pattern',
    color: '#FF2D20',
  },
  {
    percent: 85,
    icon : './assets/icons/livewire.svg',
    label: 'Livewire',
    description: 'Full-stack framework for Laravel that makes building dynamic, reactive user interfaces simple, without leaving the comfort of PHP. Using AlpineJs for frontend interactivity.', 
    color: '#FC8DBA',
  },
  {
    percent: 85,
    icon : './assets/icons/nextjs.svg',
    label: 'NextJS',
    description: 'React framework created by Vercel that allows developers to build fast, production-ready web applications with optimized performance and SEO right out of the box.', 
    color: '#999999',
  },
  {
    percent: 80,
    icon : './assets/icons/nuxtjs.svg',
    label: 'NuxtJS',
    description: 'Framework built on top of Vue.js that makes building production-ready, full-stack web applications simple and highly optimized.', 
    color: '#00DC82',
  },
  {
    percent: 90,
    icon : './assets/icons/mysql.svg',
    label: 'MySQL',
    description: 'Relational Database Management System (RDBMS). It is used to store, organize, and manage data efficiently, relying on SQL to interact data.', 
    color: '#F29111', 
  },
  {
    percent: 75,
    icon : './assets/icons/mongodb.svg',
    label: 'MongoDB',
    description: 'NoSQL database designed to store massive amounts of data using a flexible, document-oriented format rather than traditional tables, rows, and columns.', 
    color: '#46A037',
  },
];
</script>

<template>
  <div
    ref="sectionRef"
    :id="id || 'skill'"
    class="relative overflow-hidden h-screen transition-all duration-500 ease-in-out"
    :class="isSectionVisible ? 'bg-mist-100 dark:bg-mist-900' : 'bg-indigo-200 dark:bg-indigo-900'"
  >
    <div class="flex flex-col items-center justify-center h-full px-4 sm:px-6">
      <div 
          ref="descriptionRef"
          :class="isDescriptionVisible ? '' : '!opacity-0'" 
          class="space-y-6 mx-auto">
        <UPageSection
          title="My Tech Skills"
          description="With a strong foundation in web development, I specialize in creating dynamic and responsive websites using modern technologies. My expertise includes HTML, CSS, JavaScript, and popular frameworks like Laravel, Next.js and Nuxt.js. I am passionate about crafting seamless user experiences and delivering high-quality code that meets both client needs and industry standards."
          :ui="{ container: 'flex lg:items-start justify-center lg:!pb-10', description: 'mt-0 lg:mt-6' }"
        />
      </div>
      <div class="my-12 px-4 sm:px-6 lg:px-8 lg:container mx-auto">
        <div class="grid grid-cols-3 lg:flex lg:flex-wrap justify-center gap-20 w-full" ref="cardRef" :class="isCardVisible ? '' : '!opacity-0'">
          <div v-for="(item, idx) in skillFacts" :key="idx" class="flex flex-col items-center" :ref="(el) => setSkillItemRef(el as HTMLDivElement | null, idx)">
            <div class="relative w-24 h-24 flex items-center justify-center group/item">
              <div class="absolute top-0 left-0 transition-opacity duration-300 ease-in-out">
                <svg width="100" height="100" viewBox="0 0 112 112">
                <circle cx="56" cy="56" r="50" fill="none" class="stroke-gray-300 dark:stroke-gray-600" stroke-width="10" />
                <circle
                  :ref="(el) => setCircleRef(el as SVGCircleElement | null, idx)"
                  :stroke="item.color"
                  cx="56" cy="56" r="50" fill="none" stroke-width="10"
                  stroke-dasharray="314"
                  stroke-dashoffset="314"
                  stroke-linecap="round"
                />
              </svg>
              </div>
              <span
                :ref="(el) => setPercentRef(el as HTMLSpanElement | null, idx)"
                class="absolute -top-10 text-2xl font-bold"
              >0</span>
              <NuxtImg :src="item.icon" alt="icon" class="w-10 h-10 transition-opacity duration-300 ease-in-out" />
            </div>
            <div class="space-y-2">
              <h5 class="mt-3 text-center text-base font-medium text-xl">{{ item.label }}</h5>
              <!-- <div class="text-center text-sm text-mist-600 dark:text-mist-400 max-w-[10rem] hidden lg:block">
                {{ item.description }}
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
