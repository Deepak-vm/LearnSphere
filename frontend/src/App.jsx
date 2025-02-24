import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


function App() {
 const myRouter = createBrowserRouter([
  {path:'' , Component:Signup},
  {path:'login' , Component:Login} ,
  // {path:'dashboard' , Component : Dashboard} , 
  {path:'Signup' , Component :Signup}
 ])

  return (
    <>
      <RouterProvider router={myRouter}/>
    </>
  )
}
export default App
