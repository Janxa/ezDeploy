import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Account from './components/Account'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/Error';
import VerifyEmail from './components/VerifyEmail'


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
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>,
)
