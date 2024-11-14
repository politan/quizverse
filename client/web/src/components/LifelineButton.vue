<!-- components/LifelineButton.vue -->
<template>
  <button class="lifeline-button" :class="{ 'lifeline-button--disabled': !canUseLifeline }"
    :disabled="!canUseLifeline" @click="$emit('use-lifeline')">
    <div class="lifeline-button__content">
      <div class="lifeline-button__icon">50:50</div>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  canUseLifeline: boolean;
}>();

defineEmits<{
  (e: 'use-lifeline'): void;
}>();
</script>

<style scoped>
.lifeline-button {
  @apply px-4 py-2 rounded-lg bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400;
}

.lifeline-button--disabled {
  @apply bg-gray-400 cursor-not-allowed hover:bg-gray-400;
}

.lifeline-button__content {
  @apply flex items-center gap-2;
}

.lifeline-button__icon {
  @apply font-bold text-lg;
}

.lifeline-button__label {
  @apply text-sm;
}
</style>