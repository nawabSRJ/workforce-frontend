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
        },{
          path:'/client-auth',
          element:<ClientAuth/>
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

