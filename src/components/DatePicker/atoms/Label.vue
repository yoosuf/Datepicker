<template>
  <label
    :for="forId"
    class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
  >
    {{ text }}
  </label>
</template>

<script setup lang="ts">
defineProps<{
  forId: string;
  text: string;
}>();
</script>
