import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import QuizAnswer from '@/components/QuizAnswer.vue'

describe('QuizAnswer', () => {
  const mockAnswer = {
    id: '1',
    label: 'A',
    content: 'Test answer',
    isCorrect: true
  }

  it('renders answer content correctly', () => {
    const wrapper = mount(QuizAnswer, {
      props: {
        answer: mockAnswer,
        isDisabled: false,
        isRevealed: false
      }
    })

    expect(wrapper.find('span').text()).toBe('A')
    expect(wrapper.text()).toContain('Test answer')
  })

  it('emits select event when clicked', async () => {
    const wrapper = mount(QuizAnswer, {
      props: {
        answer: mockAnswer,
        isDisabled: false,
        isRevealed: false
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')[0]).toEqual([mockAnswer])
  })
})