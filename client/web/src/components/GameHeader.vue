<template>
    <header class="flex justify-between items-center">
      <div class="text-2xl font-bold">Quizverse</div>
      <div class="flex gap-6">
        <div class="text-xl">
          Score: {{ score }}
        </div>
        <div class="text-xl">
          High Score: {{ highScore }}
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    score: number;
    highScore: number;
  }>();
  </script>
  