export namespace StoreTypes {
  // Shared Sync Status Type
  export type SyncStatus = "pending" | "synced" | "error" | "success";

  // Exercises State
  export interface Exercise {
    id: string;
    name: string;
    category: string; // Simplified for now, can be expanded to ExerciseCategory later
    description?: string;
    // equipment?: string[];
    // difficulty?: ExerciseDifficulty;
    syncStatus?: SyncStatus; // Optional as not all exercises might be user-created or synced
  }

  export interface ExercisesState {
    exercises: Exercise[];
    // categories: ExerciseCategory[]; // Categories can be managed if needed
  }

  // Workouts State
  export interface WorkoutPlanExercise extends Exercise {
    sets: number; // Required for workout plan exercises
    reps: number; // Required for workout plan exercises
    duration?: number; // in seconds, for timed exercises
    rest?: number; // in seconds, rest after this exercise
  }

  export interface WorkoutPlan {
    id: string;
    name: string;
    description?: string;
    exercises: WorkoutPlanExercise[];
    syncStatus: SyncStatus;
  }

  export interface WorkoutsState {
    workoutPlans: WorkoutPlan[];
    selectedWorkoutPlanId: string | null;
  }

  // History State
  export interface CompletedWorkout {
    id: string;
    planId: string; // Reference to the workout plan
    name: string; // Copied from plan for easy display
    dateCompleted: string; // ISO string
    duration: number; // in seconds
    exercises: WorkoutPlanExercise[]; // Actual exercises performed, could differ from plan
    notes?: string;
    syncStatus: SyncStatus;
  }

  export interface HistoryState {
    completedWorkouts: CompletedWorkout[];
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

  // auth state
  export interface User {
    id: string;
    email: string;
    name?: string;
  }

  export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isLoggedIn: boolean;
  }
}
