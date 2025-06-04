import exercisesData from '../data/exercises.json';
import type { Exercise } from '../types/exercises';

const exercises = {
  getAll: (search?: string, level?: number) => {
    const storedExercises = JSON.parse(
      localStorage.getItem('exercises') || '[]',
    );
    const exercisesList = [...exercisesData, ...storedExercises];

    if (search) {
      return exercisesList.filter(
        (exercise: Exercise) =>
          exercise.name.toLowerCase().includes(search.toLowerCase()) ||
          exercise.muscle_group.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (level !== undefined) {
      return exercisesList.filter(
        (exercise: Exercise) => exercise.level === level,
      );
    }

    return exercisesList;
  },
  delete: (id: number) => {
    const storedExercises = localStorage.getItem('exercises');
    if (storedExercises) {
      const exercisesList = JSON.parse(storedExercises);
      const updatedExercises = exercisesList.filter(
        (exercise: { id: number }) => exercise.id !== id,
      );
      localStorage.setItem('exercises', JSON.stringify(updatedExercises));
    }
  },
  add: (exercise: Exercise) => {
    const storedExercises = JSON.parse(
      localStorage.getItem('exercises') || '[]',
    );
    const newId = Math.floor(Math.random() * 100000000);
    const exerciseWithId = { ...exercise, id: newId };
    localStorage.setItem(
      'exercises',
      JSON.stringify([...storedExercises, exerciseWithId]),
    );
  },
};

export default exercises;
