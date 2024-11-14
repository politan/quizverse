import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import QuizGame from "@/components/QuizGame.vue";
import LifelineButton from "@/components/LifelineButton.vue";

describe("QuizGame.vue", () => {
  it("should use lifeline and hide two incorrect answers", async () => {
    const wrapper = mount(QuizGame);
    const initialAnswers = wrapper.vm.currentQuestion.answers;

    // Ensure there are at least two incorrect answers
    const incorrectAnswers = initialAnswers.filter(
      (answer) => !answer.isCorrect
    );
    expect(incorrectAnswers.length).toBeGreaterThanOrEqual(2);

    // Use lifeline
    await wrapper.findComponent(LifelineButton).vm.$emit("use-lifeline");

    // Check that exactly two answers are hidden
    const hiddenAnswers = wrapper.vm.currentQuestion.answers.filter(
      (answer) => answer.isHidden
    );
    expect(hiddenAnswers.length).toBe(2);

    // Check that the correct answer is not hidden
    const correctAnswer = wrapper.vm.currentQuestion.answers.find(
      (answer) => answer.isCorrect
    );
    expect(correctAnswer.isHidden).toBe(false);
  });

  it("should not allow using lifeline if canUseLifeline is false", async () => {
    const wrapper = mount(QuizGame);
    wrapper.vm.lifeline.isAvailable = false;
    expect(wrapper.vm.canUseLifeline).toBe(false);

    // Try to use lifeline
    await wrapper.findComponent(LifelineButton).vm.$emit("use-lifeline");

    // Check that no answers are hidden
    const hiddenAnswers = wrapper.vm.currentQuestion.answers.filter(
      (answer) => answer.isHidden
    );
    expect(hiddenAnswers.length).toBe(0);
  });

  it("should reset lifeline state when restarting the game", async () => {
    const wrapper = mount(QuizGame);

    // Use lifeline
    await wrapper.findComponent(LifelineButton).vm.$emit("use-lifeline");

    // Restart the game
    await wrapper.vm.restartGame();

    // Check that no answers are hidden
    const hiddenAnswers = wrapper.vm.currentQuestion.answers.filter(
      (answer) => answer.isHidden === false
    );
    expect(hiddenAnswers.length).toBe(4);

    // Check that canUseLifeline is reset
    expect(wrapper.vm.canUseLifeline).toBe(true);
  });
});
