import PropTypes from "prop-types"
import styles from './Error.module.css'

export default function Error({ message, retry }) {
    
    return (
        <div className={styles["error-page"]}>
            <img src="/public/images/sad-dog.jpg" alt="Sad Dog" className={styles["error-image"]} />
            <h1>🐾 Oops! Something went wrong.</h1>
            <p>{message}</p>
            <button onClick={retry}>Try Again</button>
        </div>
    );
}

Error.propTypes = {
    message:  PropTypes.string.isRequired,
    retry: PropTypes.func.isRequired,
};