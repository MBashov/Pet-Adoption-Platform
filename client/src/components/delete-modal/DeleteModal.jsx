import PropTypes from 'prop-types';

import styles from './DeleteModal.module.css'

export default function DeleteModal({ petName, onClose, onDelete }) {

    return (
        <div className={styles["modal-overlay"]} onClick={onClose}>
            <div className={styles["modal-content"]}>
                <h2 className={styles["modal-title"]}>Confirm Deletion</h2>
                <p className={styles["modal-text"]}>
                    Are you sure you want to delete <strong>{petName}</strong>?
                </p>
                <div className={styles["modal-buttons"]}>
                    <button className={styles["cancel-btn"]} onClick={onClose}>Cancel</button>
                    <button className={styles["delete-btn"]} onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

DeleteModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    petName: PropTypes.string.isRequired,
};