import styles from './Terms.module.css';

export default function Terms() {
    return (
        <section className={`${styles.termsSection} container`}>
            <div className={styles.header}>
                <h2>Общи условия</h2>
                <p>Правила, изисквания и застрахователна политика при наемане на автомобил</p>
            </div>

            <div className={styles.contentGrid}>
                {/* Секция 1: Какво включва цената и плащане */}
                <article className={styles.termsCard}>
                    <h3><i className="fa-solid fa-hand-holding-dollar"></i> Ценообразуване и плащане</h3>
                    <p>Пълна информация за цените, включените застраховки, винетки и условията за плащане на място.</p>
                </article>

                {/* Секция 2: Период на наемане и анулиране */}
                <article className={styles.termsCard}>
                    <h3><i className="fa-solid fa-clock-rotate-left"></i> Период на наема и анулиране</h3>
                    <p>Правила относно минималния период на наемане, закъсненията и условията при анулиране на резервация.</p>
                </article>

                {/* Секция 3: Изисквания към наемателя */}
                <article className={styles.termsCard}>
                    <h3><i className="fa-solid fa-id-card"></i> Условия към наемателя</h3>
                    <p>Изисквания за минимална възраст, шофьорски стаж, необходими документи и депозит.</p>
                </article>

                {/* Секция 4: Стриктни забрани */}
                <article className={`${styles.termsCard} styles.dangerCard`}>
                    <h3 style={{ color: '#d90429' }}><i className="fa-solid fa-circle-xmark"></i> Наемателят няма право:</h3>
                    <p>Общи забрани за ползване на автомобила (употреба на алкохол, състезания, тютюнопушене).</p>
                </article>

                {/* Секция 5: Доставки и Работно време */}
                <article className={styles.termsCard}>
                    <h3><i className="fa-solid fa-truck-ramp-box"></i> Работно време и Доставки</h3>
                    <p>Информация за работното време, доставки извън работно време и летищни такси.</p>
                </article>

                {/* Секция 6: Застраховки и Инциденти */}
                <article className={styles.termsCard}>
                    <h3><i className="fa-solid fa-shield-halved"></i> Застраховка и Отговорност</h3>
                    <p>Покритие на застраховките, изключения и задължителни протоколи от КАТ при инцидент.</p>
                </article>
            </div>
        </section>
    );
}
