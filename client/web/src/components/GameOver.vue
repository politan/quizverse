<template>
    <div class="text-center mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
      <h2 class="text-4xl font-bold mb-4">Game Over!</h2>
      <p class="text-2xl mb-6">Final Score: {{ finalScore }}</p>
      <p class="text-xl mb-8">High Score: {{ highScore }}</p>
      <button
        class="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
        @click="$emit('restart')"
      >
        Play Again
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    finalScore: number;
    highScore: number;
  }>();
  
  defineEmits<{
    (e: 'restart'): void;
  }>();
  </script>