import { useNavigate } from 'react-router';
import styles from './Error.module.css'

export default function Error() {
    const navigate = useNavigate();
    const backToHome = () => navigate('/');


    return (
        <div className={styles["error-page"]}>
            <img src="/public/images/sad-dog.jpg" alt="Sad Dog" className={styles["error-image"]} />
            <h1>🐾 Oops! Something went wrong.</h1>
            <button onClick={backToHome}>Go Back To Home</button>
        </div>
    );
}

