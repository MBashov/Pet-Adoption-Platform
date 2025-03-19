import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Logout() {

    const navigate = useNavigate();

    function logout() {
        useEffect(() => {
            localStorage.removeItem('userData');
            navigate('/');
        }, []);
    }
    
    logout()
   
}