import type { Answer } from "./answer";

export type Cue = {
    type: string,
    isAvailable: boolean,
    used: boolean
}

export interface UseLifelineOptions {
    answers: Answer[];
    correctAnswerId: number;
  }

export type Lifeline = Cue