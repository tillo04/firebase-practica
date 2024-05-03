import Login from "./components/auth/Login";
import Registro from "./components/auth/Registro";
import Home from "./components/pages/Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Editars from "./components/pages/Editars";
let router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/registro',
    element: <Registro />
  },
  {
    path: '/editar/:id',
    element: <Editars />
  },
])
function App() {
  return (
    <RouterProvider router={router} />
  );
}
export default App;