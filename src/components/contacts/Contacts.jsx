import { useState } from 'react';

import styles from './Contacts.module.css';

export default function Contacts() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Изпратено съобщение от:", name, email);
        console.log("Текст:", message);
        // TODO: да се добави интеграция с бекенд

        // Изчистване на формата след успешно изпращане
        setName('');
        setEmail('');
        setMessage('');
        alert("Благодарим ви! Вашето съобщение беше изпратено успешно.");
    };

    return (
        <main className="main-content">
            <section className={styles.contactsContainer}>

                <div className="section-title">
                    <h2>Контакти</h2>
                    <p>Свържете се с екипа на RENTCAR.bg по всяко време</p>
                </div>

                <div className={styles.contactsGrid}>

                    {/* Лява страна: Информация и Работно време */}
                    <div className={styles.contactInfoSide}>

                        <div className={styles.infoBox}>
                            <h3>Нашия адрес</h3>
                            <p><i className="fa-solid fa-location-dot"></i> София, бул. Брюксел 1 (Алфа кетъринг)</p>
                            <p><i className="fa-solid fa-phone"></i> +359 877 744 363 / +359 877 709 710</p>
                            <p><i className="fa-solid fa-envelope"></i> office@rentcar.bg</p>
                        </div>

                        <div className={styles.infoBox}>
                            <h3>Работно Време</h3>
                            <ul className={styles.workTimeList}>
                                <li><strong>Понеделник - Петък:</strong> 9:00 am - 7:00 pm</li>
                                <li><strong>Събота:</strong> 10:00 am - 2:00 pm</li>
                                <li><strong>Неделя:</strong> 10:00 am - 3:00 pm</li>
                                <li>
                                    <span className={styles.deliveryBadge}>
                                        <i className="fa-solid fa-clock"></i> Доставка извън работно време 24/7 (25.00 €)
                                    </span>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* Дясна страна: Форма за обратна връзка (Controlled Form) */}
                    <div className={styles.contactFormSide}>
                        <div className={styles.formBox}>
                            <h3>Изпратете ни съобщение</h3>

                            <form onSubmit={handleSubmit} className={styles.contactForm}>
                                <div className={styles.formGroup}>
                                    <label>Вашето Име</label>
                                    <input
                                        type="text"
                                        placeholder="Име и фамилия"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Електронна Поща</label>
                                    <input
                                        type="email"
                                        placeholder="example@domain.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Съобщение</label>
                                    <textarea
                                        placeholder="Напишете вашето запитване тук..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-accent">Изпрати запитване</button>
                            </form>

                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
