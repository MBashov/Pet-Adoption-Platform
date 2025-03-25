import { BarLoader } from 'react-spinners'

import styles from './Spinner.module.css'

export default function Spinner() {
    return (
        <div className={styles["spinner-container"]}>
            <BarLoader size={50} color="#3498db" />
        </div>
    );
}