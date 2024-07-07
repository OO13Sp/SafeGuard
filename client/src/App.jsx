import React from "react";
 import './app.scss'
 import Dashboard from './components/Dashboard/Dashboard'
 import Login from './components/Login/Login'
 import Register from './components/Register/Register'
 import Dashboard2 from "./components/Dashboard/Dashboard2";

 import{
  createBrowserRouter,
  RouterProvider
 }
 from 'react-router-dom'
const router = createBrowserRouter([
  
{

  path:  '/',
  element: <div>
<Login />
</div>

}, 
{

  path:  '/dashboard',
  element: <div>
  <Dashboard />
</div>

},
{

  path:  '/register',
  element: <div>
  <Register />
</div>

},
{

  path:  '/dashboard2',
  element: <div>
  <Dashboard2 />
</div>

},

])
function App() {


  

  return (
   <div>

    <RouterProvider router={router}>
    </RouterProvider>
   

    

  
     </div>
     
  
  )
}

export default App;


