import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import Context from './contexts/AuthProvider/Context'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className=''>
        <Context>
          <RouterProvider router={router} />
          <Toaster position='top-right' reverseOrder={false} />
        </Context>
      </div>
    </QueryClientProvider>

  </StrictMode>,
)
