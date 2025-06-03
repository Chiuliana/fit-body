import type { RouteObject } from 'react-router';
import Landing from '../pages/Landing';
import Exercises from '../pages/Exercises';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/:exercises',
    element: <Exercises />,
  },
];

export default routes;
