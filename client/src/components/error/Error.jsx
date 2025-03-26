import PropTypes from "prop-types"
import { useNavigate } from 'react-router';
import styles from './Error.module.css'

export default function Error({ message }) {
    const navigate = useNavigate();
    const backToHome = () => navigate('/');


    return (
        <div className={styles["error-page"]}>
            <img src="/public/images/sad-dog.jpg" alt="Sad Dog" className={styles["error-image"]} />
            <h1>🐾 Oops! Something went wrong.</h1>
            <p>{message}</p>
            <button onClick={backToHome}>Go Back To Home</button>
        </div>
    );
}

Error.propTypes = {
    message:  PropTypes.string.isRequired,
};