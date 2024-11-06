import { ref, computed } from 'vue';
import type { Lifeline, UseLifelineOptions } from '@/types/lifeline';
import type { Answer } from '@/types/answer';

export function useLifeline() {
  const lifeline = ref<Lifeline>({
    type: '50-50',
    isAvailable: true,
    used: false,
  });

  const canUseLifeline = computed(() => lifeline.value.isAvailable && !lifeline.value.used);

  const useFiftyFifty = (options: UseLifelineOptions): Answer[] => {
    if (!canUseLifeline.value) {
      return options.answers;
    }

    const incorrectAnswers = options.answers.filter(
      answer => !answer.isCorrect && !answer.isHidden
    );
    
    // Randomly select two incorrect answers to hide
    const answersToHide = incorrectAnswers
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    // Mark selected answers as hidden
    const updatedAnswers = options.answers.map(answer => ({
      ...answer,
      isHidden: answersToHide.some(a => a.id === answer.id) || answer.isHidden,
    }));

    // Mark lifeline as used
    lifeline.value.used = true;

    return updatedAnswers;
  };

  const resetLifeline = () => {
    lifeline.value = {
      type: '50-50',
      isAvailable: true,
      used: false,
    };
  };

  return {
    lifeline,
    canUseLifeline,
    useFiftyFifty,
    resetLifeline,
  };
}