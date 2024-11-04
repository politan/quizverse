import type { Answer } from "./answer";

export interface Question {
  id: number;
  content: string;
  answers: Answer[];
  difficulty: "easy" | "medium" | "hard";
  points: number;
  category: string;
}
