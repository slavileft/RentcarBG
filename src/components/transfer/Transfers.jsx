import styles from './Transfers.module.css';

export default function Transfers() {
    return (
        <main className="main-content">
            <section className={styles.transfersContainer}>

                <div className="section-title">
                    <h2>Трансфери и Междуградски Пътувания</h2>
                    <p>Комфортно и сигурно придвижване от летището до всяка точка в България и съседните страни</p>
                </div>

                {/* Сетка с ключови предимства */}
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <i className="fa-solid fa-plane-arrival"></i>
                        <h4>Airport Delivery</h4>
                        <p>Посрещане на терминала</p>
                    </div>
                    <div className={styles.featureCard}>
                        <i className="fa-solid fa-headset"></i>
                        <h4>24/7 Support</h4>
                        <p>Постоянно съдействие</p>
                    </div>
                    <div className={styles.featureCard}>
                        <i className="fa-solid fa-percent"></i>
                        <h4>No Hidden Taxes</h4>
                        <p>Прозрачни и крайни цени</p>
                    </div>
                    <div className={styles.featureCard}>
                        <i className="fa-solid fa-user-shield"></i>
                        <h4>Free Meet & Greet</h4>
                        <p>Помощ с личния багаж</p>
                    </div>
                </div>

                {/* Популярни дестинации */}
                <div className={styles.destinationsBox}>
                    <h3>Популярни Дестинации за Трансфер</h3>

                    <div className={styles.transferGrid}>
                        <article className={styles.transferCard}>
                            <div className={styles.iconWrapper}>
                                <i className="fa-solid fa-car-side"></i>
                            </div>
                            <h3>София — Слънчев Бряг</h3>
                            <p>Безпроблемно и комфортно семейно пътуване до морето с гарантирана безопасност.</p>
                            <span className={styles.priceBadge}>Фиксирана цена</span>
                            {/* TODO: да добавя логика зад този бутон */}
                            <button className={styles.btnSubmit}>Заяви Трансфер</button>
                        </article>

                        <article className={styles.transferCard}>
                            <div className={styles.iconWrapper}>
                                <i className="fa-solid fa-globe"></i>
                            </div>
                            <h3>София — Гърция / Солун</h3>
                            <p>Международни трансфери с професионални шофьори и нови, отлично поддържани автомобили.</p>
                            <span className={styles.priceBadge}>Фиксирана цена</span>
                            {/* TODO: да добавя логика зад този бутон */}
                            <button className={styles.btnSubmit}>Заяви Трансфер</button>
                        </article>
                    </div>

                </div>

            </section>
        </main>
    );
}