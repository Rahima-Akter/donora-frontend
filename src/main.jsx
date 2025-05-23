import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import Context from './contexts/AuthProvider/Context'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './contexts/ThemeProvider/ThemeProvider'
import { HelmetProvider } from 'react-helmet-async'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className='dark:bg-black'>
            <Context>
              <RouterProvider router={router} />
              <Toaster position='top-right' reverseOrder={false} />
            </Context>
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </ThemeProvider>

  </StrictMode>,
)
