import { useState } from 'react';
import { Link } from 'react-router';
import styles from './Login.module.css';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            alert('Полето email е задължително!');
            return;
        }

        if (!password) {
            alert('Полето password е задължително!');
            return;
        }
        
        onLogin({email, password});
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authBox}>
                <h2>Вход в системата</h2>
                <p className={styles.subtitle}>Добре дошли отново! Моля, въведете вашите данни.</p>

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.formGroup}>
                        <label><i className="fa-solid fa-envelope"></i> Електронна поща</label>
                        <input
                            type="email"
                            placeholder="example@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label><i className="fa-solid fa-lock"></i> Парола</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.btnSubmit}>Вход</button>
                </form>

                <p className={styles.switchAuth}>
                    Нямате профил? <Link to="/register">Регистрирайте се тук</Link>
                </p>
            </div>
        </div>
    );
}
