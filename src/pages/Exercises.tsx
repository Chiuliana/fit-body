import { useCallback, useEffect, useState } from 'react';
import LevelSelect from '../components/LevelSelect';
import Page from '../components/Page';
import Search from '../components/Search';
import exercises from '../utils/exercises';
import type { Exercise } from '../types/exercises';
import NavBar from '../components/NavBar';
import ExerciseCard from '../components/ExerciseCard';
import { LuDumbbell } from 'react-icons/lu';
import ExerciseForm from '../components/ExerciseFrom';
import { FiPlus } from 'react-icons/fi';

const Exercises: React.FC = () => {
  const [list, setList] = useState<Exercise[]>([]);
  const [params, setParams] = useState({
    search: '',
    level: '',
  });
  const [form, setForm] = useState<boolean>(false);

  const getList = () => {
    const list = exercises.getAll(
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
    exercises.delete(id);
    getList();
  };

  const handleFormSubmit = (data: Exercise) => {
    exercises.add(data);
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
            <LuDumbbell className='w-8 h-8 text-violet-500 dark:text-lime-400' />
            <h1 className='text-[32px]'>Exercise Library</h1>
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
                  <span>Add Exercise</span>
                </>
              )}
            </button>
          </div>
          {form && <ExerciseForm onSubmit={handleFormSubmit} />}
          <div className='grid grid-cols-2 gap-3 mt-6'>
            {list.map((exercise) => (
              <ExerciseCard
                {...exercise}
                onDelete={handleDelete}
                key={exercise.id}
              />
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Exercises;
