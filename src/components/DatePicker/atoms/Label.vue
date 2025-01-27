<template>
  <label :for="forId" class="block text-sm font-medium text-gray-700 mb-1">
    {{ text }}
  </label>
</template>

<script setup lang="ts">
defineProps<{
  forId: string;
  text: string;
}>();
</script>

