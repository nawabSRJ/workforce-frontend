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
import FreelancerAuth from './pages/FreelancerAuth';
import About from './Components/About';
import PrivacyPolicy from './Components/PrivacyPolicy';
import Pricing from './Components/Pricing';
import Contact from './Components/contact';
import ForBusiness from './Components/ForBusiness';
import ForCustomers from './Components/ForCustomers';
import FreelancerDashboard from './pages/FreelancerDashboard';
import GetStarted from './Components/getstarted';

const root = ReactDOM.createRoot(document.getElementById('root'));
let allRoutes = createBrowserRouter(
    [
        {
            path:'/',
            element:<App/>
        },
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
        },
        {
          path:'/client-auth',
          element:<ClientAuth/>
        },
        {
          path:'/freelancer-auth',
          element:<FreelancerAuth/>
        },
        {
          path:'/freelancer-dash',
          element:<FreelancerDashboard/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/privacypolicy',
          element:<PrivacyPolicy/>
        },
        {
          path:'/pricing',
          element:<Pricing/>
        },
        {
          path:'/contact',
          element:<Contact/>
        },
        {
          path:'/business',
          element:<ForBusiness/>
        },
        {
          path:'/get-started',
          element:<GetStarted/>
        },
        {
          path:'/customer',
          element:<ForCustomers/>
        }
        

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

