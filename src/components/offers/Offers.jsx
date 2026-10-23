import { useState, useEffect } from "react"

import CarCard from "../car-card/CarCard";
import styles from './Offers.module.css';
import request from "../../utils/request";
import { toast } from "sonner";

export default function Offers() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        request(import.meta.env.VITE_REST_URL, "/Cars")
            .then(data => setCars(data))
            .catch(error => toast.error('Error fetching car data:', error));
    }, []);

    const promoCars = cars.filter(car => car.promoPrice !== null && car.promoPrice !== undefined);

    return (
        <section className={styles.offersContainer}>
            <div className={styles.titleSection}>
                <h2>Специални Оферти & Промоции</h2>
                <p>Възползвайте се от нашите топ предложения на преференциални цени</p>
            </div>

            {promoCars.length > 0 ? (
                <div className="cars-grid">
                    {promoCars.map((car) => (
                        <CarCard key={car.id} {...car} />
                    ))}
                </div>
            ) : (
                <p className={styles.noOffers}>
                    В момента няма активни промоции. Моля, проверете отново по-късно!
                </p>
            )}
        </section>
    );
}
