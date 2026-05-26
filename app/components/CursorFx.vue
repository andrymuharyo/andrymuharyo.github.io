<template>
  <ClientOnly>
    <div
      class="fx-cursor-dot"
      :style="{ left: `${clientX}px`, top: `${clientY}px` }"
    />
    <div
      class="fx-cursor-circle"
      :class="{ 'is-hovered': isHovered }"
      :style="{ left: `${trailX}px`, top: `${trailY}px` }"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const clientX = ref(-100)
const clientY = ref(-100)
const trailX = ref(-100)
const trailY = ref(-100)
const isHovered = ref(false)

// Linear interpolation (lerp) creates the smooth "trailing delay" effect
const lerp = (start: number, end: number, amount: number) => (1 - amount) * start + amount * end

let animationFrameId: number

const updatePosition = () => {
  trailX.value = lerp(trailX.value, clientX.value, 0.15) // Adjust 0.15 to change lag smoothness
  trailY.value = lerp(trailY.value, clientY.value, 0.15)
  animationFrameId = requestAnimationFrame(updatePosition)
}

const onMouseMove = (e: MouseEvent) => {
  clientX.value = e.clientX
  clientY.value = e.clientY

  // Detect if hovering over a link, button, or any element with our custom data attribute
  const target = e.target as HTMLElement | null
  if (target) {
    isHovered.value = !!(
      target.closest('a')
      || target.closest('button')
      || target.closest('[data-cursor-hover]')
    )
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  // Center the cursor initially so it doesn't snap from top-left
  trailX.value = window.innerWidth / 2
  trailY.value = window.innerHeight / 2
  updatePosition()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>
</style>
