import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Account from './components/Account/Account'
import './index.css'
import { CookiesProvider } from 'react-cookie';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/Error';
import VerifyEmail from './components/VerifyEmail'
import Dashboard from './components/Dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage />,
    children: [
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "verify",
        element: <VerifyEmail />,
        children:[
          {
            path: ':verificationCode',
            element: <VerifyEmail />,
          },
        ]
      },
      {
        path:"dashboard/*",
        element:
        <ProtectedRoute element={<Dashboard />} />
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
)
