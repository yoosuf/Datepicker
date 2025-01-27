<template>
  <div
    @click="handleClick"
    @keydown="handleKeyDown"
    class="calendar-navigation-button p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
    :aria-label="label"
    role="button"
    tabindex="0"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  event.stopPropagation()
  emit('click', event)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleClick(event as unknown as MouseEvent)
  }
}
</script>

