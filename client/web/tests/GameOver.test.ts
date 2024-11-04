import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import GameOver from '@components/GameOver.vue'

describe('GameOver', () => {
  it('displays final score and high score', () => {
    const wrapper = mount(GameOver, {
      props: {
        finalScore: 300,
        highScore: 500
      }
    })

    expect(wrapper.text()).toContain('Final Score: 300')
    expect(wrapper.text()).toContain('High Score: 500')
  })

  it('emits restart event when play again button is clicked', async () => {
    const wrapper = mount(GameOver, {
      props: {
        finalScore: 300,
        highScore: 500
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('restart')).toBeTruthy()
  })
})