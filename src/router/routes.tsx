import type { RouteObject } from 'react-router';
import Landing from '../pages/Landing';
import Exercises from '../pages/Exercises';
import Workouts from '../pages/Workouts';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/exercises',
    element: <Exercises />,
  },
  {
    path: '/workouts',
    element: <Workouts />,
  },
];

export default routes;
