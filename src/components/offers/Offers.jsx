import useFetch from "../../hooks/useFetch";

import CarCard from "../car-card/CarCard";
import styles from './Offers.module.css';

export default function Offers() {
    const { data: cars, isLoading, error } = useFetch('/Cars', []);

    const promoCars = cars.filter(car => car.promoPrice !== null && car.promoPrice !== undefined);

    return (
        <section className={styles.offersContainer}>
            <div className={styles.titleSection}>
                <h2>Специални Оферти & Промоции</h2>
                <p>Възползвайте се от нашите топ предложения на преференциални цени</p>
            </div>

            {isLoading && <p className={styles.noOffers}>Зареждане на офертите...</p>}

            {error && <p className="form-error">Грешка при зареждане: {error}</p>}

            {!isLoading && !error && (
                promoCars.length > 0 ? (
                    <div className="cars-grid">
                        {promoCars.map((car) => (
                            <CarCard key={car.id} {...car} />
                        ))}
                    </div>
                ) : (
                    <p className={styles.noOffers}>
                        В момента няма активни промоции. Моля, проверете отново по-късно!
                    </p>
                )
            )}
        </section>
    );
}
