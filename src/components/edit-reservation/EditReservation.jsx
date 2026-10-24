import { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import styles from './EditReservation.module.css';
import AuthContext from '../../context/auth-context';
import useFetch from '../../hooks/useFetch';
import request from '../../utils/request';
import { hasOverlappingBooking } from '../../utils/reservations';

export default function EditReservation() {
    const { reservationId } = useParams();
    const { user, accessToken } = useContext(AuthContext);

    // Only a reservation that belongs to the logged-in user can be found
    const { data: reservations, isLoading: reservationLoading, error: reservationError } =
        useFetch(`/Reservations?id=eq.${reservationId}&userId=eq.${user.id}`, [], accessToken);

    const { data: cars, isLoading: carsLoading, error: carsError } = useFetch('/Cars', []);

    if (reservationLoading || carsLoading) {
        return <p className={styles.message}>Зареждане на резервацията...</p>;
    }

    if (reservationError || carsError) {
        return <p className={`${styles.message} form-error`}>{reservationError || carsError}</p>;
    }

    const reservation = reservations[0];
    const car = cars.find(c => c.id === reservation?.carId);

    if (!reservation || !car) {
        return (
            <p className={`${styles.message} form-error`}>
                Резервацията не е намерена. <Link to="/reservations">Към моите резервации</Link>
            </p>
        );
    }

    return <EditReservationForm reservation={reservation} car={car} />;
}

function EditReservationForm({ reservation, car }) {
    const { accessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(reservation.startDate);
    const [endDate, setEndDate] = useState(reservation.endDate);
    const [isSaving, setIsSaving] = useState(false);

    // Calculated on every render, no extra state needed
    const days = startDate && endDate
        ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24)) + 1
        : 0;
    const totalPrice = days > 0 ? days * (car.promoPrice ?? car.carPrice) : 0;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (days <= 0) {
            toast.error('Датата на връщане не може да е преди датата на вземане.');
            return;
        }

        setIsSaving(true);

        try {
            const isTaken = await hasOverlappingBooking(
                reservation.carId,
                startDate,
                endDate,
                reservation.id,
                accessToken
            );

            if (isTaken) {
                toast.error('Автомобилът вече е резервиран за избраните дати.');
                return;
            }

            await request(
                import.meta.env.VITE_REST_URL,
                `/Reservations?id=eq.${reservation.id}`,
                'PATCH',
                { startDate, endDate, totalPrice },
                accessToken
            );

            toast.success('Резервацията е обновена.');
            navigate('/reservations');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.carInfo}>
                    {car.imageURL && <img src={car.imageURL} alt={car.carModel} />}
                    <div>
                        <h2>{car.carModel}</h2>
                        <p className={styles.location}>
                            <i className="fa-solid fa-location-dot"></i> {reservation.location}
                        </p>
                    </div>
                </div>

                <form className={styles.form} onSubmit={submitHandler}>
                    <div className={styles.field}>
                        <label htmlFor="startDate">Дата на вземане</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="endDate">Дата на връщане</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            min={startDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.summary}>
                        <span>Брой дни: <strong>{days > 0 ? days : '-'}</strong></span>
                        <span>Обща цена: <strong>{days > 0 ? `${totalPrice} €` : '-'}</strong></span>
                    </div>

                    <div className={styles.actions}>
                        <button type="submit" className={styles.btnSave} disabled={isSaving}>
                            {isSaving ? 'Запазване...' : 'Запази промените'}
                        </button>
                        <Link to="/reservations" className={styles.btnCancel}>Отказ</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}