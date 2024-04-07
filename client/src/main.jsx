import React from 'react'
import ReactDOM from 'react-dom/client'
import Portal from './Portal.jsx'
import './index.css'

import { inject } from '@vercel/analytics';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Launch from './components/Launch.jsx'
// import { searchAction } from './components/Launch.jsx'
import NotFound from './components/NotFound.jsx'
import Discussion from './components/Discussion.jsx'

inject();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Launch />,
    errorElement: <NotFound />,
    // action: searchAction
  },
  {
    path: '/search',
    element: <Portal />,
  },
  {
    path: '/org',
    element: <Discussion />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
