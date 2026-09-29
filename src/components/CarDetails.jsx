import { useParams } from 'react-router';
import styles from './CarDetails.module.css';
import { useEffect, useState } from 'react';

export default function CarDetails(id) {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const totalDays = 0;

    useEffect(() => {
        fetch(`https://mbqmgwqphsyquffalqrm.supabase.co/rest/v1/Cars?id=eq.${carId}`, {
            method: 'GET',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1icW1nd3FwaHN5cXVmZmFscXJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM2NzUzNywiZXhwIjoyMTAxOTQzNTM3fQ.gIfaBzC4RqSkoIA6dXHKw-UDDV7jNCvQFJu8zG_XdSw',
            }
        })
            .then(response => response.json())
            .then(data => setCar(data[0]))
            .catch(error => console.error('Error fetching car data:', error));

    }, [carId]);

    if (!car) return <p>Зареждане...</p>;

    return (
        <>
            <div className={styles.detailsContainer}>
                <div className={styles.detailsGrid}>

                    {/* Лява страна */}
                    <div className={styles.carInfoSide}>
                        <img src={car.imageURL} alt={`${car.carModel}`} />
                        <h2>{car.carModel}</h2>
                        <span className={styles.badge}>{car.carClass}</span>
                        <p>{car.description}</p>

                        <div className={styles.specsList}>
                            <span><i className="fa-solid fa-gears"></i> {car.carGear}</span>
                            <span><i className="fa-solid fa-gas-pump"></i> {car.carGas}</span>
                            <span><i className="fa-solid fa-users"></i> {car.carSeats}</span>
                        </div>
                    </div>

                    {/* Дясна страна */}
                    <div className={styles.bookingSide}>
                        <div className={styles.bookingBox}>
                            <h3>Резервация на автомобила</h3>

                            <form className={styles.bookingForm}>

                                <div className={styles.formGroup}>
                                    <label><i className="fa-solid fa-calendar-days"></i> Дата на вземане</label>
                                    <input
                                        type="date"
                                        // value={pickupDate}
                                        // onChange={(e) => setPickupDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label><i className="fa-solid fa-calendar-days"></i> Дата на връщане</label>
                                    <input
                                        type="date"
                                        // value={returnDate}
                                        // onChange={(e) => setReturnDate(e.target.value)}
                                        required
                                    />
                                </div>

                                {totalDays > 0 && (
                                    <div className={styles.priceSummary}>
                                        <p>Общ период: <strong>{5} дни</strong></p>
                                        <p style={{ marginTop: '5px' }}>Крайна цена: <span className={styles.priceValue}>€{145}</span></p>
                                    </div>
                                )}

                                {car.isAvailable ? (
                                    <button type="submit" className={styles.btnAccent}>
                                        Потвърди резервацията
                                    </button>
                                ) : (
                                    <button type="button" className={styles.btnDisabled} disabled>
                                        Автомобилът е зает
                                    </button>
                                )}

                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};