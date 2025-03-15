import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContractGen from './Components/ContractGen'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ClientDash from './pages/Client/ClientDash';
import ClientAuth from './pages/Client/ClientAuth';
import FreelancerDash from './pages/Freelancer/FreelancerDash';
import FreelancerAuth from './pages/Freelancer/FreelancerAuth';
import ExplorePage from './pages/ExplorePage';
import About from './Components/FooterLinks/About';
import PrivacyPolicy from './Components/FooterLinks/PrivacyPolicy';
import Pricing from './Components/FooterLinks/Pricing';
import Contact from './Components/Contact';
import ForBusiness from './Components/FooterLinks/ForBusiness';
import ForCustomers from './Components/FooterLinks/For Customers';
import GetStarted from './Components/FooterLinks/GetStarted';
import NewProjectForm from './pages/Client/NewProjectForm';
import Logo from './Components/Logo';



// ----------------------------------------
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
        // ? ------------------------ Client ------------------------
        {
          path:'/client-dash',
          element:<ClientDash/>
        },{
          path:'/client-auth',
          element:<ClientAuth/>
        },
        // ? ------------------------ Freelancer ------------------------
        {
          path:'/freelancer-auth',
          element:<FreelancerAuth/>
        },
        {
          path:'/freelancer-dash',
          element:<FreelancerDash/>
        },
        {
          path:'/new-project',
          element:<NewProjectForm/>
        },

        // ? ------------------------ Common ------------------------
        {
          path:'/explore',
          element:<ExplorePage/>
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
        },
        {
          path:'/test',
          element:<Logo/>
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

