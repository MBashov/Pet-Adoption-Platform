import { useNavigate } from 'react-router';

export default function Logout() {

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('userData');
        navigate('/login');
    }
    
    logout()
   
}