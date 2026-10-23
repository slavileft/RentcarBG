import { useContext, useState } from 'react';
import { Link } from 'react-router';
import styles from './Login.module.css';
import AuthContext from '../../context/auth-context';

export default function Login() {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        setIsSubmitting(true);
        try {
            await login({ email, password });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
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

                    {error && <p className="form-error">{error}</p>}
                    <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Влизане...' : 'Вход'}
                    </button>
                </form>

                <p className={styles.switchAuth}>
                    Нямате профил? <Link to="/register">Регистрирайте се тук</Link>
                </p>
            </div>
        </div>
    );
}
