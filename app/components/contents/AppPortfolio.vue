<script lang="ts" setup>
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

interface Props {
  id?: string
}

defineProps<Props>()

interface Project {
  image: string
  title: string
  techStack: string[]
  description: string
  link: string
}

const sectionRef = ref<HTMLElement | null>(null)
const descriptionRef = ref<HTMLElement | null>(null)
const isSectionVisible = ref(false)
const isDescriptionVisible = ref(false)
const activeProject = ref<Project | null>(null)
const isModalOpen = ref(false)

const projects = [
  {
    image: './assets/portfolios/corralegal.png',
    title: 'Corralegal',
    techStack: ['Livewire', 'Laravel', 'Tailwind CSS'],
    description: 'Corra Legal is a law firm known for its strategic counsel in high-stakes, high-value matters.',
    link: 'https://corralegal.com'
  },
  {
    image: './assets/portfolios/lfl.png',
    title: 'Landscaper Finance Lab',
    techStack: ['NextJS', 'Tailwind CSS'],
    description: 'We bridge the gap between conservation practitioners and investors, supporting the design, structuring and financing of sustainable landscape programmes that deliver impacts on the Global Sustainable Development Goals.',
    link: 'https://landscapefinancelab.org'
  },
  {
    image: './assets/portfolios/mermaid.png',
    title: 'Data Mermaid',
    techStack: ['Laravel', 'Antlers'],
    description: 'A world where information quickly and cleanly moves from the hands of scientists to communities and governments, enabling rapid action to protect coral reefs.',
    link: 'https://datamermaid.org'
  },
  {
    image: './assets/portfolios/pg.png',
    title: 'Pantaugambut',
    techStack: ['Laravel', 'Blade', 'Bootstrap'],
    description: 'Pantau Gambut is a non-govermental organization that networks in nine povinces which focuses on research and advocacy, and campaigns for the peatland protection and sustainability in Indonesia.',
    link: 'https://pg.example.com'
  },
  {
    image: './assets/portfolios/rc.png',
    title: 'Rimba Collective',
    techStack: ['Laravel', 'Antlers'],
    description: 'The Rimba Collective is an innovative, long-term collaboration between Consumer Goods Manufacturers (CGMs), processors, traders and growers in the agricultural commodities industry.',
    link: 'https://rimbacollective.com'
  },
  {
    image: './assets/portfolios/rgc.png',
    title: 'Riverside Golf Club',
    techStack: ['Next.js', 'TypeScript', 'Laravel'],
    description: 'Riverside Golf Club is the most stunning and dramatic golf Indonesia with 18-hole par 72 championship course set along the Cikeas River within the beautiful province of Bogor, Indonesia.',
    link: 'https://www.riverside-golf.com'
  },
  {
    image: './assets/portfolios/runid.png',
    title: 'RunID Race Management',
    techStack: ['PHP', 'Bootstrap'],
    description: 'RunID Race Management established based on that simple reasons, to make running a healthy lifestyle with fun & happy faces in every race we’ve made.',
    link: 'https://run.id'
  },
  {
    image: './assets/portfolios/wwf.png',
    title: 'WWF - Rivers of Food',
    techStack: ['Laravel', 'Antlers', 'Tailwind CSS'],
    description: 'One third of the world`s food production is dependent on rivers. But they are under increasing pressure, threatening global food security now and in the future.',
    link: 'https://rivers-of-food.panda.org'
  }
]

const openProject = (project: Project) => {
  activeProject.value = project
  isModalOpen.value = true
}

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
    :id="id || 'portfolio'"
    ref="sectionRef"
    :class="isSectionVisible ? 'bg-cyan-100 dark:bg-cyan-900' : 'bg-mist-100 dark:bg-mist-900'"
    class="relative overflow-hidden min-h-screen transition-all duration-500 ease-in-out"
  >
    <div class="flex flex-col lg:flex-row items-center justify-center h-screen px-4 sm:px-6 py-14 sm:py-16">
      <div
        ref="descriptionRef"
        :class="isDescriptionVisible ? '' : '!opacity-0'"
        class="space-y-6 mx-auto text-left max-w-lg"
      >
        <UPageSection
          :ui="{ container: 'flex lg:items-start justify-start !pr-0', title: '!text-left', description: '!text-left mt-0 lg:mt-6 text-mist-800 dark:text-mist-100' }"
          description="A curated collection of projects that blends visual storytelling, responsive interaction, and practical development craft. Click any card to explore the project details."
          title="My Portfolio"
        />
      </div>

      <div class="lg:mt-10 w-full overflow-hidden">
        <ClientOnly>
          <Swiper
            :breakpoints="{
              640: { slidesPerView: 1.7, spaceBetween: 24 },
              1024: { slidesPerView: 2.6, spaceBetween: 28 },
              1280: { slidesPerView: 3.2, spaceBetween: 32 }
            }"
            :centered-slides="false"
            :coverflow-effect="{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 1.2,
              slideShadows: false
            }"
            :grab-cursor="true"
            :modules="[EffectCoverflow]"
            :slides-per-view="2"
            :space-between="32"
            class="portfolio-swiper !overflow-visible"
            effect="coverflow"
          >
            <SwiperSlide
              v-for="(project, index) in projects"
              :key="project.title"
              class="portfolio-slide"
            >
              <button
                class="group w-full text-left"
                type="button"
                @click="openProject(project)"
              >
                <div
                  class="relative aspect-[4/5] overflow-hidden rounded-sm bg-mist-100 dark:bg-mist-800 shadow-[0_24px_70px_-28px_rgba(15,23,42,0.42)] transition-all duration-300 group-hover:-tranmist-y-1"
                >
                  <NuxtImg
                    :alt="project.title"
                    :src="project.image"
                    class="h-full w-full object-cover object-top-left transition-transform duration-500 group-hover:scale-105"
                  />

                  <div
                    class="absolute inset-0 bg-gradient-to-t from-mist-950/70 via-mist-950/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div
                    class="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100"
                  >
                    <span class="rounded-full w-20 h-20 bg-primary/50 text-white text-center items-center gap-2 flex">
                      <UIcon
                        class="mx-auto w-10 h-10 font-light"
                        name="i-lucide-plus"
                      />
                    </span>
                    <span class="text-sm font-medium text-white/90">
                      {{ index + 1 }}/{{ projects.length }}
                    </span>
                  </div>
                </div>

                <div class="p-6">
                  <h3 class="text-xl font-semibold text-mist-900 dark:text-white">
                    {{ project.title }}
                  </h3>
                  <p class="mt-2 text-mist-600 dark:text-mist-300 hidden lg:block">
                    {{ project.description.slice(0, 100) }}{{ project.description.length > 100 ? '...' : '' }}
                  </p>
                  <p class="mt-3 text-primary">
                    {{ project.techStack.join(' · ') }}
                  </p>
                </div>
              </button>
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>
    </div>

    <UModal
      v-model:open="isModalOpen"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full'
      }"
      :ui="{
        content: 'max-w-[50%]',
        body: 'p-0',
        header: 'border-b border-default',
        title: 'text-xl font-semibold'
      }"
      fullscreen
    >
      <template
        v-if="activeProject"
        #body
      >
        <div class="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="p-4 sm:p-6">
            <div class="overflow-hidden bg-mist-100 dark:bg-mist-800">
              <NuxtImg
                :alt="activeProject.title"
                :src="activeProject.image"
                class="h-full w-full object-cover"
              />
            </div>
          </div>

          <div class="flex flex-col justify-between p-4 sm:p-6 sm:border-l border-default">
            <div class="space-y-5">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Project title
                </p>
                <p class="mt-2 text-base font-semibold text-mist-900 dark:text-white">
                  {{ activeProject.title }}
                </p>
              </div>

              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Project Tech Stack
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    v-for="tech in activeProject.techStack"
                    :key="tech"
                    class="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Description
                </p>
                <p class="mt-2 text-sm leading-6 text-mist-600 dark:text-mist-300">
                  {{ activeProject.description }}
                </p>
              </div>

              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Project Link
                </p>
                <p class="mt-2 break-all text-sm text-mist-700 dark:text-mist-200">
                  {{ activeProject.link }}
                </p>
              </div>
            </div>

            <div class="mt-6">
              <UButton
                :to="activeProject.link"
                class="p-0"
                color="primary"
                icon="i-lucide-external-link"
                label="Open Project"
                target="_blank"
                variant="link"
              />
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
.portfolio-swiper {
  padding: 0.5rem 0 2.5rem;
}

.portfolio-swiper :deep(.swiper-wrapper) {
  align-items: stretch;
}

.portfolio-slide {
  height: auto;
}
</style>
