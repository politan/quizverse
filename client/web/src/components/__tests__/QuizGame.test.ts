import { mount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import QuizGame from '@/components/QuizGame.vue'
import { mockQuestions } from "./__mocks__/questions.mock";

// Mock the question service
vi.mock("@/services/questionService", () => ({
  getRandomQuestion: vi.fn(() => mockQuestions[0]),
  getNextQuestion: vi.fn(() => mockQuestions[1]),
}));

describe("QuizGame", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    wrapper = mount(QuizGame);
    wrapper.vm.questions = mockQuestions;
    wrapper.vm.currentQuestion = mockQuestions[0];
  });

  it("renders initial game state with first mock question", () => {
    expect(wrapper.find("h2").text()).toBe("Question");
    expect(wrapper.find(".text-xl").text()).toBe("Score: 0");

    expect(wrapper.findAll("button").length).toBe(5);
  });

  it("displays all answer options correctly", () => {
    const answers = wrapper.findAll(".quiz-button");
    expect(answers).toHaveLength(4);
    expect(answers[0].text()).toContain("4");
    expect(answers[1].text()).toContain("3");
    expect(answers[2].text()).toContain("5");
    expect(answers[3].text()).toContain("6");
  });

  it("updates score when correct answer is selected", async () => {
    // Find the button with the correct answer
    const correctAnswer = wrapper
      .findAll(".quiz-button")
      .find((button) => button.text().includes("4"));

    await correctAnswer.trigger("click");

    expect(wrapper.vm.score).toBe(100);
    expect(wrapper.vm.hasAnswered).toBe(true);

    // Wait for next question timeout
    await new Promise((r) => setTimeout(r, 2000));
    expect(wrapper.vm.currentQuestion).toEqual(mockQuestions[1]);
  });

  it("ends game when incorrect answer is selected", async () => {
    // Find a button with an incorrect answer
    const incorrectAnswer = wrapper
      .findAll(".quiz-button")
      .find((button) => button.text().includes("3"));

    await incorrectAnswer.trigger("click");

    expect(wrapper.vm.hasAnswered).toBe(true);

    // Wait for game over timeout
    await new Promise((r) => setTimeout(r, 1600));
    expect(wrapper.vm.isGameOver).toBe(true);
    expect(wrapper.find("h2").text()).toBe("Game Over!");
  });

  it("applies correct styling to answers after selection", async () => {
    const answers = wrapper.findAll(".quiz-button");
    await answers[1].trigger("click"); // Click incorrect answer

    await wrapper.vm.$nextTick();

    // Check that correct answer is highlighted in green
    expect(answers[0].classes()).toContain("bg-green-500/50");
    // Check that selected incorrect answer is highlighted in red
    expect(answers[1].classes()).toContain("bg-red-500/50");
  });

  it("updates high score when current score is higher", async () => {
    wrapper.vm.score = 300;
    const incorrectAnswer = wrapper.findAll(".quiz-button")[1];
    await incorrectAnswer.trigger("click");

    await new Promise((r) => setTimeout(r, 1600));

    expect(wrapper.vm.highScore).toBe(300);
  });

  it("maintains high score when current score is lower", async () => {
    wrapper.vm.highScore = 500;
    wrapper.vm.score = 300;
    const incorrectAnswer = wrapper.findAll(".quiz-button")[1];
    await incorrectAnswer.trigger("click");

    await new Promise((r) => setTimeout(r, 1600));

    expect(wrapper.vm.highScore).toBe(500);
  });

  it("restarts game with fresh state when play again is clicked", async () => {
    wrapper.vm.isGameOver = true;
    wrapper.vm.score = 300;
    await wrapper.vm.$nextTick();

    const playAgainButton = wrapper.find("button");
    await playAgainButton.trigger("click");

    expect(wrapper.vm.score).toBe(0);
    expect(wrapper.vm.isGameOver).toBe(false);
    expect(wrapper.vm.hasAnswered).toBe(false);
    expect(wrapper.vm.currentQuestion).not.toBeNull();
  });

  // Test question difficulty scoring
  it("awards correct points based on question difficulty", async () => {
    // First question (easy - 100 points)
    const correctAnswer = wrapper
      .findAll(".quiz-button")
      .find((button) => button.text().includes("4"));
    await correctAnswer.trigger("click");
    expect(wrapper.vm.score).toBe(100);

    // Wait for next question (medium - 200 points)
    await new Promise((r) => setTimeout(r, 2000));
    const secondCorrectAnswer = wrapper
      .findAll(".quiz-button")
      .find((button) => button.text().includes("Tokyo"));
    await secondCorrectAnswer.trigger("click");
    expect(wrapper.vm.score).toBe(300);
  });

  // Test loading states
  it("disables answers while loading next question", async () => {
    const correctAnswer = wrapper
      .findAll(".quiz-button")
      .find((button) => button.text().includes("4"));
    await correctAnswer.trigger("click");

    const allButtons = wrapper.findAll(".quiz-button");
    allButtons.forEach((button) => {
      expect(button.attributes("disabled")).toBeDefined();
    });
  });
});

// Przykład implementacji serwisu pytań
// src/services/questionService.ts
import { ref } from "vue";
import type { Question } from "@/types/question";

export const questionBank = ref<Question[]>([]);

export const getRandomQuestion = (): Question => {
  const randomIndex = Math.floor(Math.random() * questionBank.value.length);
  return questionBank.value[randomIndex];
};

export const getNextQuestion = (previousQuestion: Question): Question => {
  const filteredQuestions = questionBank.value.filter(
    (q) => q.id !== previousQuestion.id
  );
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
};
