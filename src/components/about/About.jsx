import styles from './About.module.css';

export default function AboutUs() {
  return (
    <main className="main-content">
      <section className={styles.aboutContainer}>
        
        <div className="section-title">
          <h2>За Нас</h2>
          <p>Професионализъм, сигурност и персонално отношение към всеки клиент</p>
        </div>

        {/* Текстово представяне */}
        <div className={styles.presentationBox}>
          <h3>Кои сме ние?</h3>
          <p><strong>RENTCAR.bg</strong> е съвременна компания за отдаване на автомобили под наем. Ние вярваме, че успешният и устойчив бизнес се изгражда чрез абсолютно коректно отношение, гъвкавост и пълна прозрачност без скрити такси.</p>
          <p>Нашият автопарк разполага с нови, отлично поддържани, дезинфекцирани и напълно застраховани автомобили от всякакви класове – от икономични градски модели до луксозни семейни кросоувъри. Основната ни мисия е да гарантираме вашата безопасност и комфортно придвижване в страната и чужбина.</p>
        </div>

        {/* Отзиви от клиенти */}
        <h3 className={styles.reviewsTitle}>Какво казват клиентите за нас</h3>
        
        <div className={styles.reviewsGrid}>
          <div className={styles.reviewCard}>
            <div>
              <div className={styles.stars}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className={styles.comment}>"Професионално обслужване, без скрити такси. Много са коректни, със сигурност пак бих използвал услугите им!"</p>
            </div>
            <h5 className={styles.author}>— Фадли Фадлиев</h5>
          </div>

          <div className={styles.reviewCard}>
            <div>
              <div className={styles.stars}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className={styles.comment}>"Колата беше в отлично състояние и отговаряше на описанието на сайта. Отношението към клиентите е на високо ниво, хората са гъвкави и отзивчиви."</p>
            </div>
            <h5 className={styles.author}>— Силвия Петрова</h5>
          </div>
        </div>

      </section>
    </main>
  );
}
