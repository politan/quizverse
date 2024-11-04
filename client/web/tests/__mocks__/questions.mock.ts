export const mockQuestions = [
    {
      id: '1',
      content: 'What is 2 + 2?',
      difficulty: 'easy' as const,
      points: 100,
      answers: [
        { id: 1, label: 'A' as const, content: '4', isCorrect: true },
        { id: 2, label: 'B' as const, content: '3', isCorrect: false },
        { id: 3, label: 'C' as const, content: '5', isCorrect: false },
        { id: 4, label: 'D' as const, content: '6', isCorrect: false }
      ]
    },
    {
      id: '2',
      content: 'What is the capital of Japan?',
      difficulty: 'medium' as const,
      points: 200,
      answers: [
        { id: 5, label: 'A' as const, content: 'Seoul', isCorrect: false },
        { id: 6, label: 'B' as const, content: 'Tokyo', isCorrect: true },
        { id: 7, label: 'C' as const, content: 'Beijing', isCorrect: false },
        { id: 8, label: 'D' as const, content: 'Bangkok', isCorrect: false }
      ]
    }
  ];