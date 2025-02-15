import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContractGen from './Components/ContractGen'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/ClientDashboard';
import ClientDash from './pages/ClientDash';
import DashSideBar from './Components/DashSideBar';
import ClientAuth from './pages/ClientAuth';
<<<<<<< HEAD

=======
import FreelancerAuth from './pages/FreelancerAuth';
import AdminAuth from './pages/AdminAuth';
import AdminDashboard from './pages/AdminDashboard';
import FreelancerDash from './pages/FreelancerDashboard';
>>>>>>> 09f38a7 (Initial commit: Added Workforce-Frontend project)

const root = ReactDOM.createRoot(document.getElementById('root'));
let allRoutes = createBrowserRouter(
    [
<<<<<<< HEAD
        {
            path:'/',
            element:<App/>
        },
=======
      {
        path:'/',
        element:<App/>
      },
>>>>>>> 09f38a7 (Initial commit: Added Workforce-Frontend project)
        {
            path:'/contract',
            element:<ContractGen/>
        },
        {
          path:'/dash',
          element:<Dashboard/>
        },
        {
          path:'/dashTest',
          element:<DashSideBar/>
        },
        {
          path:'/client-dash',
          element:<ClientDash/>
        },{
          path:'/client-auth',
          element:<ClientAuth/>
<<<<<<< HEAD
        }
=======
        },
        {
          path:'/freelancer-auth',
          element:<FreelancerAuth/>
        },
        {
          path:'/admin-auth',
          element:<AdminAuth/>
        },
        {
          path:'/admin-dashboard',
          element:<AdminDashboard/>
        },
        {
          path:'/freelancer-dash',
          element:<FreelancerDash/>
        }
        
        
        
>>>>>>> 09f38a7 (Initial commit: Added Workforce-Frontend project)
    ]
)

root.render(
    <React.StrictMode>
      <RouterProvider router={allRoutes} />
    </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

