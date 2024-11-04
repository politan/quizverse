<template>
  <button
    :class="[
      'w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center',
      'hover:bg-white/20 disabled:cursor-not-allowed',
      isRevealed && answer.isCorrect && 'bg-green-500/50',
      isRevealed && !answer.isCorrect && 'bg-red-500/50',
      !isRevealed && 'bg-white/10'
    ]"
    :disabled="isDisabled"
    @click="$emit('select', answer)"
  >
    <span class="answer-label w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4">
      {{ answer.label }}
    </span>
    <span class="flex-1">{{ answer.content }}</span>
  </button>
</template>

<script setup lang="ts">
import type { Answer } from '@/types/answer';

defineProps<{
  answer: Answer;
  isDisabled: boolean;
  isRevealed: boolean;
}>();

defineEmits<{
  (e: 'select', answer: Answer): void;
}>();
</script>