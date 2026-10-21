import { useContext, useState } from 'react';
import { Link } from 'react-router';
import styles from '../login/Login.module.css';
import AuthContext from '../../context/auth-context';

export default function Register() {
    const {onRegister} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password.length < 6){
            alert("Паролата трябва да е повече от 6 символа!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Паролите не съвпадат!");
            return;
        }

        if (!email || !password || !confirmPassword) {
            alert("Всички полета трябва да са попълнени!");
            return;
        }

        onRegister({ email, password });
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

                    <button type="submit" className={styles.btnSubmit}>Регистрация</button>
                </form>

                <p className={styles.switchAuth}>
                    Вече имате профил? <Link to="/login">Влезте оттук</Link>
                </p>
            </div>
        </div>
    );
}
