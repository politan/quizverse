import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import QuizQuestion from '@components/QuizQuestion.vue'

describe('QuizQuestion', () => {
  const mockQuestion = {
    id: '1',
    content: 'Test question?',
    difficulty: 'easy',
    points: 100,
    answers: []
  }

  it('renders question content correctly', () => {
    const wrapper = mount(QuizQuestion, {
      props: {
        question: mockQuestion
      }
    })

    expect(wrapper.find('.text-xl').text()).toBe('Test question?')
    expect(wrapper.find('.text-sm').text()).toContain('100')
  })
})