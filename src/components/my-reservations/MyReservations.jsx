import { useEffect, useState, useContext } from 'react';

import styles from './MyReservations.module.css';
import request from '../../utils/request.js';
import AuthContext from '../../context/auth-context';

export default function MyReservations({ userId }) {
    const {accessToken, user} = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user.id) {
            setIsLoading(false);
            return;
        }

        async function fetchUserReservations() {
            try {
                setIsLoading(true);
                // 1. Вземаме резервациите само за текущия потребител
                const bookingsData = await request(
                    import.meta.env.VITE_REST_URL, 
                    `/Reservations?userId=eq.${user.id}`,
                    "GET",
                    null,
                    accessToken
                );

                if (bookingsData.length === 0) {
                    setReservations([]);
                    setIsLoading(false);
                    return;
                }

                // 2. Вземаме пълния каталог с коли, за да "закачим" данните за модела и снимката
                const carsData = await request(import.meta.env.VITE_REST_URL, '/Cars');

                // 3. Комбинираме резервациите с информацията за съответната кола
                const combinedData = bookingsData.map(booking => {
                    const carInfo = carsData.find(car => car.id === booking.carId);
                    return {
                        ...booking,
                        car: carInfo || {
                            carModel: 'Неизвестен модел',
                            imageURL: '',
                            carClass: 'N/A',
                            carGear: 'N/A',
                            carGas: 'N/A'
                        }
                    };
                });

                // Сортираме резервациите по начална дата (от най-новите към по-старите)
                combinedData.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                
                setReservations(combinedData);
            } catch (error) {
                alert(`Error fetching reservations:, ${error.message}`);
                setError('Възникна грешка при зареждането на вашите резервации.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserReservations();
    }, [user.id]);

    if (isLoading) {
        return (
            <div className={styles.centerContainer}>
                <p className={styles.loadingText}>Зареждане на вашите резервации...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.centerContainer}>
                <p className={styles.errorText}>⚠️ {error}</p>
            </div>
        );
    }

    return (
        <section className={`${styles.reservationsSection} container`}>
            <div className={styles.header}>
                <h2>Моите Резервации</h2>
                <p>История и статус на вашите наети автомобили</p>
            </div>

            {reservations.length > 0 ? (
                <div className={styles.reservationsList}>
                    {reservations.map((booking) => (
                        <article key={booking.id} className={styles.reservationCard}>
                            <div className={styles.imageWrapper}>
                                {booking.car.imageURL ? (
                                    <img src={booking.car.imageURL} alt={booking.car.carModel} />
                                ) : (
                                    <div className={styles.noImage}>Няма снимка</div>
                                )}
                            </div>

                            <div className={styles.detailsContent}>
                                <div className={styles.mainInfo}>
                                    <h3>{booking.car.carModel}</h3>
                                    <span className={styles.badge}>{booking.car.carClass}</span>
                                </div>

                                <div className={styles.specs}>
                                    <span><i className="fa-solid fa-gears"></i> {booking.car.carGear}</span>
                                    <span><i className="fa-solid fa-gas-pump"></i> {booking.car.carGas}</span>
                                </div>

                                <div className={styles.periodBox}>
                                    <div className={styles.dateGroup}>
                                        <span className={styles.dateLabel}>Вземане:</span>
                                        <strong className={styles.dateValue}>
                                            <i className="fa-solid fa-calendar-days"></i> {booking.startDate}
                                        </strong>
                                    </div>
                                    <div className={styles.dateGroup}>
                                        <span className={styles.dateLabel}>Връщане:</span>
                                        <strong className={styles.dateValue}>
                                            <i className="fa-solid fa-calendar-days"></i> {booking.endDate}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.priceSide}>
                                <span className={styles.priceLabel}>Обща сума</span>
                                <span className={styles.priceValue}>€{booking.totalPrice}</span>
                                <span className={styles.statusBadge}>Потвърдена</span>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <i className="fa-solid fa-car-tunnel" style={{ fontSize: '48px', color: '#8d99ae', marginBottom: '15px' }}></i>
                    <p>Все още нямате направени резервации.</p>
                </div>
            )}
        </section>
    );
}
