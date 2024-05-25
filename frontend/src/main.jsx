import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'

//Import for BrowserRouter, renaming it to Router
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import Admin from './pages/Admin.jsx'
import Options from './pages/Options.jsx'
import Creatures from './pages/Creatures.jsx'
import Login from './pages/Login.jsx'
import Spells from './pages/Spells.jsx'

//routing for url links to different pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/options',
        element: <Options />
      },
      {
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/creatures',
        element: <Creatures />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/spells',
        element: <Spells />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
