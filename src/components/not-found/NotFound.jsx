import { useNavigate } from 'react-router';
import styles from './NotFound.module.css';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className={styles.notFoundContainer}>
            <div className={styles.errorContent}>
                <h1 className={styles.errorCode}>404</h1>
                <div className={styles.carIconWrapper}>
                    <i className="fa-solid fa-car-burst"></i>
                </div>
                <h2>Страницата не е намерена</h2>
                <p>
                    Изглежда, че автомобилът, който търсите, е завил в грешна посока или адресът вече не съществува.
                </p>
                <button 
                    onClick={() => navigate('/')} 
                    className="btn-accent"
                >
                    <i className="fa-solid fa-house"></i> Обратно към началната страница
                </button>
            </div>
        </div>
    );
}
