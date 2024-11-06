<template>
  <div class="quiz-container p-4 sm:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="flex flex-col sm:flex-row justify-between items-center">
        <div class="text-2xl font-bold mb-4 sm:mb-0">Quizverse</div>
        <div class="flex gap-6">
          <div class="text-xl">Score: {{ score }}</div>
          <div class="text-xl">High Score: {{ highScore }}</div>
        </div>
      </header>

      <!-- Main Game Area -->
      <div v-if="!isGameOver" class="quiz-card mt-8">
        <!-- Question -->
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-2">Question</h2>
          <LifelineButton :can-use-lifeline="canUseLifeline" @use-lifeline="handleLifelineUse" />
          <p class="text-xl">{{ currentQuestion.content }}</p>
          <div class="mt-2 inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
            Points: {{ currentQuestion.points }}
          </div>
        </div>

        <div class="text-center">
          <div class="mt-2 inline-block px-3 py-1 bg-green-500 text-white rounded-full text-sm">
            Category: {{ currentQuestion.category }}
          </div>
        </div>

        <!-- Answers -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <button v-for="answer in visibleAnswers" :key="answer.id" class="quiz-button" :class="{
            'bg-green-500/50': hasAnswered && answer.isCorrect,
            'bg-red-500/50': hasAnswered && !answer.isCorrect && selectedAnswer?.id === answer.id,
            'hover:bg-gray-300': !hasAnswered
          }" :disabled="hasAnswered" @click="handleAnswer(answer)">
            <span class="answer-label">{{ answer.label }}</span>
            <span class="flex-1">{{ answer.content }}</span>
          </button>
        </div>
      </div>

      <!-- Game Over Modal -->
      <div v-if="isGameOver" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg text-center">
          <h2 class="text-4xl font-bold mb-4 text-black">Game Over!</h2>
          <p class="text-2xl mb-6 text-black">Final Score: {{ score }}</p>
          <p class="text-xl mb-8 text-black">High Score: {{ highScore }}</p>
          <button class="px-6 py-3 bg-blue-500 text-white rounded-xl transition-all duration-300" @click="restartGame">
            Play Again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Answer } from '@/types/answer';
import type { Question } from '@/types/question';
import LifelineButton from '@/components/LifelineButton.vue';
import { useLifeline } from '@/composables/uselifeline';
import { computed, ref } from 'vue';

const score = ref(0);
const highScore = ref(0);
const hasAnswered = ref(false);
const isGameOver = ref(false);
const selectedAnswer = ref<Answer | null>(null);
const alreadyAnsweredQuestions = ref<number[]>([]);

const { canUseLifeline, useFiftyFifty, resetLifeline } = useLifeline();

const questions = ref<Question[]>([
  {
    "id": 1,
    "content": "Która planeta w naszym układzie słonecznym ma najwięcej księżyców?",
    "difficulty": "medium",
    "points": 10,
    "category": "Nauka",
    "answers": [
      { "id": 1, "label": "A", "content": "Jowisz", "isCorrect": true },
      { "id": 2, "label": "B", "content": "Saturn", "isCorrect": false },
      { "id": 3, "label": "C", "content": "Uran", "isCorrect": false },
      { "id": 4, "label": "D", "content": "Neptun", "isCorrect": false }
    ]
  },
  {
    "id": 2,
    "content": "Kto napisał 'Pan Tadeusz'?",
    "difficulty": "easy",
    "points": 5,
    "category": "Literatura",
    "answers": [
      { "id": 5, "label": "A", "content": "Juliusz Słowacki", "isCorrect": false },
      { "id": 6, "label": "B", "content": "Adam Mickiewicz", "isCorrect": true },
      { "id": 7, "label": "C", "content": "Henryk Sienkiewicz", "isCorrect": false },
      { "id": 8, "label": "D", "content": "Cyprian Kamil Norwid", "isCorrect": false }
    ]
  },
  {
    "id": 3,
    "content": "Jaka jest najdłuższa rzeka w Polsce?",
    "difficulty": "easy",
    "points": 5,
    "category": "Geografia",
    "answers": [
      { "id": 9, "label": "A", "content": "Wisła", "isCorrect": true },
      { "id": 10, "label": "B", "content": "Odra", "isCorrect": false },
      { "id": 11, "label": "C", "content": "Bug", "isCorrect": false },
      { "id": 12, "label": "D", "content": "Warta", "isCorrect": false }
    ]
  },
  {
    "id": 4,
    "content": "Ile wynosi pierwiastek kwadratowy z 144?",
    "difficulty": "medium",
    "points": 10,
    "category": "Matematyka",
    "answers": [
      { "id": 13, "label": "A", "content": "10", "isCorrect": false },
      { "id": 14, "label": "B", "content": "11", "isCorrect": false },
      { "id": 15, "label": "C", "content": "12", "isCorrect": true },
      { "id": 16, "label": "D", "content": "13", "isCorrect": false }
    ]
  },
  {
    "id": 5,
    "content": "W którym roku Polska wstąpiła do Unii Europejskiej?",
    "difficulty": "medium",
    "points": 10,
    "category": "Historia",
    "answers": [
      { "id": 17, "label": "A", "content": "2002", "isCorrect": false },
      { "id": 18, "label": "B", "content": "2003", "isCorrect": false },
      { "id": 19, "label": "C", "content": "2004", "isCorrect": true },
      { "id": 20, "label": "D", "content": "2005", "isCorrect": false }
    ]
  },
  {
    "id": 6,
    "content": "Która witamina nazywana jest 'witaminą słońca'?",
    "difficulty": "medium",
    "points": 10,
    "category": "Zdrowie",
    "answers": [
      { "id": 21, "label": "A", "content": "Witamina A", "isCorrect": false },
      { "id": 22, "label": "B", "content": "Witamina C", "isCorrect": false },
      { "id": 23, "label": "C", "content": "Witamina D", "isCorrect": true },
      { "id": 24, "label": "D", "content": "Witamina E", "isCorrect": false }
    ]
  },
  {
    "id": 7,
    "content": "Kto jest autorem obrazu 'Słoneczniki'?",
    "difficulty": "hard",
    "points": 15,
    "category": "Sztuka",
    "answers": [
      { "id": 25, "label": "A", "content": "Pablo Picasso", "isCorrect": false },
      { "id": 26, "label": "B", "content": "Vincent van Gogh", "isCorrect": true },
      { "id": 27, "label": "C", "content": "Claude Monet", "isCorrect": false },
      { "id": 28, "label": "D", "content": "Leonardo da Vinci", "isCorrect": false }
    ]
  },
  {
    "id": 8,
    "content": "Jakie jest największe jezioro w Polsce pod względem powierzchni?",
    "difficulty": "medium",
    "points": 10,
    "category": "Geografia",
    "answers": [
      { "id": 29, "label": "A", "content": "Śniardwy", "isCorrect": true },
      { "id": 30, "label": "B", "content": "Mamry", "isCorrect": false },
      { "id": 31, "label": "C", "content": "Jeziorak", "isCorrect": false },
      { "id": 32, "label": "D", "content": "Niegocin", "isCorrect": false }
    ]
  },
  {
    "id": 9,
    "content": "Który pierwiastek chemiczny ma symbol 'Au'?",
    "difficulty": "medium",
    "points": 10,
    "category": "Chemia",
    "answers": [
      { "id": 33, "label": "A", "content": "Srebro", "isCorrect": false },
      { "id": 34, "label": "B", "content": "Miedź", "isCorrect": false },
      { "id": 35, "label": "C", "content": "Złoto", "isCorrect": true },
      { "id": 36, "label": "D", "content": "Platyna", "isCorrect": false }
    ]
  },
  {
    "id": 10,
    "content": "Kto wynalazł żarówkę?",
    "difficulty": "easy",
    "points": 5,
    "category": "Nauka",
    "answers": [
      { "id": 37, "label": "A", "content": "Nikola Tesla", "isCorrect": false },
      { "id": 38, "label": "B", "content": "Thomas Edison", "isCorrect": true },
      { "id": 39, "label": "C", "content": "Albert Einstein", "isCorrect": false },
      { "id": 40, "label": "D", "content": "Alexander Graham Bell", "isCorrect": false }
    ]
  }
]);

const visibleAnswers = computed(() =>
  currentQuestion.value.answers.filter(answer => !answer.isHidden)
);

const handleLifelineUse = () => {
  const correctAnswer = currentQuestion.value.answers.find(a => a.isCorrect);
  if (!correctAnswer) return;

  currentQuestion.value.answers = useFiftyFifty({
    answers: currentQuestion.value.answers,
    correctAnswerId: correctAnswer.id,
  });
};

const currentQuestion = ref<Question>(questions.value[Math.floor(Math.random() * questions.value.length)]);

const getNextQuestion = () => {
  const remainingQuestions = questions.value.filter(
    (question) => !alreadyAnsweredQuestions.value.includes(question.id)
  );
  if (remainingQuestions.length === 0) {
    isGameOver.value = true;
    return null;
  }
  return remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
};

const handleAnswer = (answer: Answer) => {
  selectedAnswer.value = answer;
  hasAnswered.value = true;

  if (answer.isCorrect) {
    score.value += currentQuestion.value.points;
    setTimeout(() => {
      alreadyAnsweredQuestions.value.push(currentQuestion.value.id);
      hasAnswered.value = false;
      selectedAnswer.value = null;
      // Load next question logic here

      const nextQuestion = getNextQuestion();
      if (nextQuestion) {
        currentQuestion.value = nextQuestion;
      }

    }, 1500);
  } else {
    if (score.value > highScore.value) {
      highScore.value = score.value;
    }
    setTimeout(() => {
      isGameOver.value = true;
      alreadyAnsweredQuestions.value = [];
    }, 1500);
  }
};

const restartGame = () => {
  score.value = 0;
  isGameOver.value = false;
  hasAnswered.value = false;
  selectedAnswer.value = null;
  alreadyAnsweredQuestions.value = [];
  resetLifeline();
  // Reset question logic here
  const nextQuestion = getNextQuestion();

  if (nextQuestion) {
    currentQuestion.value = nextQuestion;
  }
};
</script>

<style scoped>
.quiz-button {
  transition: background-color 0.3s;
}

.quiz-button:hover {
  background-color: rgba(209, 213, 219, 0.5);
}

.quiz-button.bg-green-500\/50 {
  background-color: rgba(34, 197, 94, 0.5) !important;
}

.quiz-button.bg-red-500\/50 {
  background-color: rgba(239, 68, 68, 0.5) !important;
}
</style>