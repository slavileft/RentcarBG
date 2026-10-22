import { useParams, useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import styles from './CarDetails.module.css';
import request from '../../utils/request';
import AuthContext from '../../context/auth-context';

export default function CarDetails() {
    const { accessToken, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const routerLocation = useLocation();
    const routerState = routerLocation.state || {};

    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const [existingBookings, setExistingBookings] = useState([]); // Списък с резервации за тази кола

    const [pickupLocation, setPickupLocation] = useState(routerState.initialPickupLocation || '');
    const [pickupDate, setPickupDate] = useState(routerState.initialPickupDate || '');
    const [returnDate, setReturnDate] = useState(routerState.initialReturnDate || '');
    const [totalDays, setTotalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isPeriodTaken, setIsPeriodTaken] = useState(false); // Дали избраният период е зает

    const today = new Date().toISOString().split('T')[0];

    // 1. Заявка за зареждане на данните на колата и нейните резервации
    useEffect(() => {
        // Взимаме данните за автомобила
        request(import.meta.env.VITE_REST_URL, `/Cars?id=eq.${carId}`)
            .then(data => setCar(data[0]))
            .catch(error => alert(`Error fetching car data:, ${error.message}`));

        // Взимаме съществуващите резервации от Supabase за тази конкретна кола
        request(import.meta.env.VITE_REST_URL, `/Reservations?carId=eq.${carId}`)
            .then(data => setExistingBookings(data))
            .catch(error => alert(`Error fetching bookings:, ${error.message}`));
    }, [carId]);

    // 2. Логика за изчисляване на дни, цена и проверка за застъпване (Overlap)
    useEffect(() => {
        if (!car) return;

        if (pickupDate && returnDate) {
            const start = new Date(pickupDate);
            const end = new Date(returnDate);

            const differenceInTime = end.getTime() - start.getTime();
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;

            if (differenceInDays > 0) {
                setTotalDays(differenceInDays);

                // Проверка за офертна цена (promoPrice)
                const activePrice = (car.promoPrice !== null && car.promoPrice !== undefined)
                    ? car.promoPrice
                    : car.carPrice;

                setTotalPrice(differenceInDays * activePrice);

                // ПРОВЕРКА ЗА ЗАСТЪПВАНЕ НА ДАТИТЕ (Overlap проверка)
                let taken = false;
                for (let booking of existingBookings) {
                    const bookingStart = new Date(booking.startDate);
                    const bookingEnd = new Date(booking.endDate);

                    // Математическа формула за припокриване на периоди
                    if (start <= bookingEnd && end >= bookingStart) {
                        taken = true;
                        break;
                    }
                }
                setIsPeriodTaken(taken);

            } else {
                setTotalDays(0);
                setTotalPrice(0);
                setIsPeriodTaken(false);
            }
        }
    }, [pickupDate, returnDate, car, existingBookings]);

    const bookingSubmitHandler = async (e) => {
        e.preventDefault();
        if (totalDays <= 0) {
            alert("Моля, изберете валиден период от време!");
            return;
        }
        if (isPeriodTaken) {
            alert("За съжаление, автомобилът вече е резервиран за тези дати!");
            return;
        }

        const bookingData = {
            carId: carId,
            location: pickupLocation,
            startDate: pickupDate,
            endDate: returnDate,
            totalPrice: totalPrice,
            userId: user?.id
        };

        console.log("Изпращане на нова резервация към Supabase:", bookingData);
        try {
            await request(import.meta.env.VITE_REST_URL, "/Reservations", "POST", bookingData, accessToken);
            if (accessToken) {
                navigate("/reservations");
            }
        } catch (error) {
            alert(`Error submitting form:, ${error.message}`)
        }
    };

    if (!car) return <p className={styles.loading}>Зареждане на детайли...</p>;

    const hasPromo = car.promoPrice !== null && car.promoPrice !== undefined;

    return (
        <div className={styles.detailsContainer}>
            <div className={styles.detailsGrid}>

                {/* Лява страна: Характеристики */}
                <div className={styles.carInfoSide}>
                    <img src={car.imageURL} alt={`${car.carModel}`} />
                    <h2>{car.carModel}</h2>
                    <span className={styles.badge}>{car.carClass}</span>

                    {/* Визуализация на цената спрямо наличието на оферта */}
                    <div style={{ margin: '15px 0', display: 'flex', alignItems: 'baseline' }}>
                        {hasPromo ? (
                            <>
                                <span style={{ textDecoration: 'line-through', color: '#8d99ae', marginRight: '10px' }}>€{car.carPrice}</span>
                                <span className={styles.priceValue} style={{ color: '#d90429', fontWeight: '700', fontSize: '24px' }}>€{car.promoPrice}</span>
                            </>
                        ) : (
                            <span className={styles.priceValue} style={{ fontSize: '24px', fontWeight: '700' }}>€{car.carPrice}</span>
                        )}
                        <span style={{ color: '#8d99ae', marginLeft: '5px', fontSize: '14px' }}>/ ден</span>
                    </div>

                    <p>{car.description}</p>

                    <div className={styles.specsList}>
                        <span><i className="fa-solid fa-gears"></i> {car.carGear}</span>
                        <span><i className="fa-solid fa-gas-pump"></i> {car.carGas}</span>
                        <span><i className="fa-solid fa-users"></i> {car.carSeats}</span>
                    </div>
                </div>

                {/* Дясна страна: Динамична Контролирана Форма */}
                <div className={styles.bookingSide}>
                    <div className={styles.bookingBox}>
                        <h3>Резервация на автомобила</h3>

                        <form onSubmit={bookingSubmitHandler} className={styles.bookingForm}>

                            <div className={styles.formGroup}>
                                <label><i className="fa-solid fa-location-dot"></i> Място на наемане</label>
                                <select
                                    value={pickupLocation}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                    required
                                >
                                    <option value="">Изберете локация...</option>
                                    <option value="Летище София Т1">Летище София Т1</option>
                                    <option value="Летище София Т2">Летище София Т2</option>
                                    <option value="Офис - Александър Жендов №6">Офис - Александър Жендов №6</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label><i className="fa-solid fa-calendar-days"></i> Дата на вземане</label>
                                <input
                                    type="date"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                    min={today}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label><i className="fa-solid fa-calendar-days"></i> Дата на връщане</label>
                                <input
                                    type="date"
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    min={today}
                                    required
                                />
                            </div>

                            {totalDays > 0 && (
                                <div className={styles.priceSummary}>
                                    <p>Общ период: <strong>{totalDays} дни</strong></p>
                                    <p style={{ marginTop: '5px' }}>Крайна цена: <span className={styles.priceValue}>€{totalPrice}</span></p>
                                    {isPeriodTaken && <p style={{ color: '#d90429', fontSize: '13px', marginTop: '5px', fontWeight: '600' }}>⚠️ Избраният период се застъпва с друга резервация!</p>}
                                </div>
                            )}

                            {/* Динамично блокиране на бутона спрямо Overlap проверката */}
                            {!isPeriodTaken ? (
                                <button type="submit" className={styles.btnAccent}>
                                    Потвърди резервацията
                                </button>
                            ) : (
                                <button type="button" className={styles.btnDisabled} disabled>
                                    Периодът е зает
                                </button>
                            )}

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
