
import './index.css'
import {Button} from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import Onboarding from './pages/Onboarding'
import JobListing from './pages/job-listing'
import JobPage from './pages/job'
import PostJob from './pages/post-job'
import SavedJobs from './pages/saved-job'
import MyJobs from './pages/my-jobs'
import { ThemeProvider } from './components/theme-provide'
import ProtectedRoute from './components/protected-route'


const Router=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/onboarding',
        element:(
          <ProtectedRoute>
            <Onboarding/>
          </ProtectedRoute>
        )
      },
      {
        path:'/jobs',
        element:(
        <ProtectedRoute requiredRole="candidate">
          <JobListing/>
        </ProtectedRoute>
        )
      },
      {
        path:'/job/:id',
        element:(
        <ProtectedRoute>
          <JobPage/>
        </ProtectedRoute>
        )
      },
      {
        path:'/post-job',
        element:(
        <ProtectedRoute requiredRole="recruiter">
          <PostJob/>
        </ProtectedRoute>
        )
      },
      {
        path:'/saved-jobs',
        element:(
        <ProtectedRoute>
          <SavedJobs/>
        </ProtectedRoute>
        )
      },
      {
        path:'/my-jobs',
        element:(
        <ProtectedRoute>
          <MyJobs/>
        </ProtectedRoute>
        )
      },

      ]
    }
  ])
  
function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={Router} />
    </ThemeProvider>
 
  )
}

export default App
