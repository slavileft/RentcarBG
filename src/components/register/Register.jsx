import { useContext, useState } from 'react';
import { Link } from 'react-router';
import styles from '../login/Login.module.css';
import AuthContext from '../../context/auth-context';

export default function Register() {
    const { register } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Паролите не съвпадат!");
            return;
        }

        setIsSubmitting(true);
        try {
            await register({ email, password });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authBox}>
                <h2>Регистрация</h2>
                <p className={styles.subtitle}>Създайте безплатен профил, за да наемате автомобили.</p>

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
                            placeholder="Минимум 6 символа"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={6}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label><i className="fa-solid fa-shield-halved"></i> Повтори паролата</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}
                    <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Регистрация...' : 'Регистрация'}
                    </button>
                </form>

                <p className={styles.switchAuth}>
                    Вече имате профил? <Link to="/login">Влезте оттук</Link>
                </p>
            </div>
        </div>
    );
}
