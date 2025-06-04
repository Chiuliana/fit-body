import workoutsData from '../data/workouts.json';
import type { Workout, WorkoutExercise } from '../types/exercises';

const workouts = {
  getAll: (search?: string, level?: number) => {
    const workoutsList = workoutsData;
    const storedWorkouts = localStorage.getItem('workouts');
    if (storedWorkouts) {
      workoutsList.push(...JSON.parse(storedWorkouts));
    }

    if (search) {
      return workoutsList.filter(
        (workout: Workout) =>
          workout.title.toLowerCase().includes(search.toLowerCase()) ||
          workout.exercises.some((exercise) =>
            exercise.exercise.name.toLowerCase().includes(search.toLowerCase()),
          ),
      );
    }

    if (level !== undefined) {
      return workoutsList.filter((workout: Workout) => workout.level === level);
    }

    return workoutsList;
  },
  delete: (id: number) => {
    const storedWorkouts = localStorage.getItem('workouts');
    if (storedWorkouts) {
      const workoutsList = JSON.parse(storedWorkouts);
      const updatedWorkouts = workoutsList.filter(
        (workout: { id: number }) => workout.id !== id,
      );
      localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    }
  },
  add: (workout: Workout) => {
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    const newId = Math.random().toString().substring(2, 9); // Generate a random ID
    const workoutWithId = { ...workout, exercises: [], id: newId };
    localStorage.setItem(
      'workouts',
      JSON.stringify([...storedWorkouts, workoutWithId]),
    );
  },
  addExercises: (id: number, exercises: WorkoutExercise[]) => {
    const storedWorkouts = localStorage.getItem('workouts');
    if (storedWorkouts) {
      const workoutsList = JSON.parse(storedWorkouts);
      const workoutIndex = workoutsList.findIndex(
        (workout: { id: number }) => workout.id === id,
      );

      if (workoutIndex !== -1) {
        workoutsList[workoutIndex].exercises.push(...exercises);
        localStorage.setItem('workouts', JSON.stringify(workoutsList));
      }
    }
  },
};

export default workouts;
