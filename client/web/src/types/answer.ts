export interface Answer {
  id: number;
  label: "A" | "B" | "C" | "D";
  content: string;
  isCorrect: boolean;
  isHidden?: boolean ;
}
