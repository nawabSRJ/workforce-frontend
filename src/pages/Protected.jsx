import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export default function Protected() {
    const navigate = useNavigate();

    useEffect(() => {
        let login = localStorage.getItem('logged');

        if (!login) {
            navigate('/'); // Redirect to home if not logged in
        } else {
            let parsedLogin = JSON.parse(login); // Parse stored object
            
            if (parsedLogin.role === 'client') {
                navigate('/client-dash'); // Redirect to client dashboard
            } else if (parsedLogin.role === 'freelancer') {
                navigate('/freelancer-dash'); // Redirect to freelancer dashboard
            }
        }
    }, [navigate]); // Dependency added for `useNavigate`
    
    return <Outlet />; // If no redirection, render child components
}
