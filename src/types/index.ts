export interface MaltItem {
  name: string;
  amount: number;
  unit: string;
  timing?: string;
}

export interface HopItem {
  name: string;
  amount: number;
  unit: string;
  timing: string;
}

export interface RecipeInput {
  name: string;
  malts: MaltItem[];
  hops: HopItem[];
  yeast: string;
  mashTemp: number;
  boilTemp: number;
  boilTime: number;
  targetOriginalGravity: number;
  targetFinalGravity: number;
  initialWaterAmount: number;
  notes?: string;
}

export interface BrewStep {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  substeps: Array<{
    id: number;
    text: string;
    completed: boolean;
    hasTimer?: boolean;
    timerDuration?: number;
  }>;
  category: "cleaning" | "brewing" | "fermentation";
  completed: boolean;
}

export type CategoryFilter = "all" | "cleaning" | "brewing" | "fermentation";

export interface ActiveTimer {
  stepId: number;
  substepId: number;
  timeLeft: number;
}