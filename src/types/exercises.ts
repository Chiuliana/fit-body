export type Exercise = {
  id?: number;
  name: string;
  description: string;
  muscle_group: string;
  level: number;
};

export type WorkoutExercise = {
  exercise: Exercise;
  sets: number;
  reps: number;
  weight: number | null;
};

export type Workout = {
  id?: number;
  title: string;
  level: number;
  exercises: WorkoutExercise[];
};
