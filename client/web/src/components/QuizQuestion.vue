<template>
    <div class="text-center">
      <h2 class="text-3xl font-bold mb-2">Question</h2>
      <p class="text-xl">{{ question.content }}</p>
      <div class="mt-2 inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
        Points: {{ question.points }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    question: Question;
  }>();
  </script>