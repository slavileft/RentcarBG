import styles from './About.module.css';
import useFetch from '../../hooks/useFetch';

export default function AboutUs() {
  const { data: reviews } = useFetch('/Reviews?order=created_at.desc&limit=3', []);

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
        {reviews.length > 0 && (
          <>
            <h3 className={styles.reviewsTitle}>Какво казват клиентите за нас</h3>

            <div className={styles.reviewsGrid}>
              {reviews.map(review => (
                <div key={review.id} className={styles.reviewCard}>
                  <div>
                    <div className={styles.stars}>
                      {Array.from({ length: review.rating }, (_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                    <p className={styles.comment}>"{review.comment}"</p>
                  </div>
                  <h5 className={styles.author}>- {review.userName}</h5>
                </div>
              ))}
            </div>
          </>
        )}

      </section>
    </main>
  );
}
