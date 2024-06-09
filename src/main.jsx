import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Provider/AuthProvider.jsx'
import router from './Routes/MainRoutes.jsx'
import './index.css'

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>    
    <React.StrictMode>
      <AuthProvider>        
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>        
      </AuthProvider>
    </React.StrictMode>
  </HelmetProvider>

)
