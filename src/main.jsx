import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import Context from './contexts/AuthProvider/Context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className=''>
      <Context>
        <RouterProvider router={router} />
      </Context>
    </div>
  </StrictMode>,
)
