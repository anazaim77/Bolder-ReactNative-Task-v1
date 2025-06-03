export namespace StateTypes {
  // exercises state
  export type ExerciseDifficulty = "beginner" | "intermediate" | "advanced";
  export interface ExerciseCategory {
    id: string;
    name: string;
    description?: string;
  }
  export interface ExerciseItem {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    difficulty: ExerciseDifficulty;
    equipment?: string[];
  }
  export interface ExercisesState {
    exercises: ExerciseItem[];
    categories: ExerciseCategory[];
  }

  // workouts state
  export interface WorkoutSession {
    id: string;
    date: string;
    duration: number;
    exercises: ExerciseItem[];
    notes?: string;
  }
  export interface UserStats {
    totalSessions: number;
    totalDuration: number;
    lastSessionDate?: string;
  }
  export interface WorkoutsState {
    sessions: WorkoutSession[];
    stats: UserStats;
  }

  // offline state
  export interface OutboxItem {
    id: string;
    action: any;
    timestamp: number;
    retries?: number;
  }

  export interface OfflineState {
    isOnline: boolean;
    outbox: OutboxItem[];
  }
}
