import { createBrowserRouter, RouterProvider } from 'react-router';
import { SnackbarProvider } from 'notistack';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/';
import TaskManager from './pages/TaskManager';
import NotesManager from './pages/NotesManager';
import MyAssistant from './pages/MyAssistant';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Dashboard,
    loader: undefined, // TODO : Add a loader for all routes
  },
  {
    path: '/signup',
    Component: Signup,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/todo',
    Component: TaskManager,
  },
  {
    path: '/notes',
    Component: NotesManager,
  },
  {
    path: '/my-assistant',
    Component: MyAssistant,
  },
]);
function App() {
  return (
    <>
      <SnackbarProvider />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
