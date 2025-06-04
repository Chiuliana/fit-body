import { useCallback, useEffect, useState } from 'react';
import Page from '../components/Page';
import type { Workout } from '../types/exercises';
import workouts from '../utils/workouts';
import Search from '../components/Search';
import LevelSelect from '../components/LevelSelect';
import NavBar from '../components/NavBar';
import { FaPersonRunning } from 'react-icons/fa6';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';
import { FiPlus } from 'react-icons/fi';

const Workouts: React.FC = () => {
  const [list, setList] = useState<Workout[]>([]);
  const [params, setParams] = useState({
    search: '',
    level: '',
  });
  const [form, setForm] = useState<boolean>(false);

  const getList = () => {
    const list = workouts.getAll(
      params.search,
      params.level ? parseInt(params.level) : undefined,
    );
    setList(list);
  };

  const getListClb = useCallback(getList, [params]);

  useEffect(() => {
    getListClb();
  }, [params, getListClb]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search.length > 2 || search.length === 0) {
      setParams((prev) => ({ ...prev, search }));
    }
  };

  const handleLevelChange = (level: string) => {
    setParams((prev) => ({ ...prev, level }));
  };

  const handleFormButtonClick = () => {
    setForm((prev) => !prev);
  };

  const handleDelete = (id: number) => {
    workouts.delete(id);
    getList();
  };

  const handleFormSubmit = (data: Workout) => {
    const workout = workouts.add(data);
    if (workout && data.exercises && data.exercises.length > 0) {
      workouts.addExercises(workout.id, data.exercises);
    }
    setForm(false);
    getList();
  };

  return (
    <Page>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center gap-3'>
          <Search
            placeholder='Search exercises by name or muscle group...'
            onChange={handleSearchChange}
            className='w-full'
          />
          <LevelSelect onSelect={handleLevelChange} wrapperClassName='w-60' />
        </div>
        <NavBar />
        <div className='h-full p-6 rounded-lg shadow-[0px_0px_25px_-5px_rgba(0,0,0,0.1)] dark:bg-neutral-700'>
          <div className='flex items-center gap-4'>
            <FaPersonRunning className='w-8 h-8 text-violet-500 dark:text-lime-400' />
            <h1 className='text-[32px]'>Workout Library</h1>
            <button
              className={`cursor-pointer flex items-center justify-center gap-3 px-6 py-3 ml-auto font-medium rounded-full transition-colors duration-300 ${
                form
                  ? 'bg-red-500 text-white hover:bg-red-400 '
                  : 'bg-violet-500 text-white hover:bg-violet-400 dark:bg-lime-400 dark:hover:bg-lime-300 dark:text-black'
              }`}
              onClick={handleFormButtonClick}
            >
              {form ? (
                <>
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <FiPlus className='w-5 h-5' />
                  <span>Add Workout</span>
                </>
              )}
            </button>
          </div>
          {form && <WorkoutForm onSubmit={handleFormSubmit} />}
          <div className='grid grid-cols-3 gap-3 mt-6'>
            {list.map((workout) => (
              <WorkoutCard
                {...workout}
                onDelete={handleDelete}
                key={workout.id}
              />
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Workouts;
