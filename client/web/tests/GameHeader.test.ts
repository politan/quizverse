import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import GameHeader from '@components/GameHeader.vue'

describe('GameHeader', () => {
  it('displays correct score and high score', () => {
    const wrapper = mount(GameHeader, {
      props: {
        score: 100,
        highScore: 200
      }
    })

    expect(wrapper.text()).toContain('Score: 100')
    expect(wrapper.text()).toContain('High Score: 200')
  })
})