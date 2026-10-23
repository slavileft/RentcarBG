import { useEffect, useState, useContext } from 'react';

import styles from './MyReservations.module.css';
import request from '../../utils/request.js';
import AuthContext from '../../context/auth-context';
import { toast } from 'sonner';

export default function MyReservations() {
    const { accessToken, user } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingBookingId, setEditingBookingId] = useState(null);
    const [editPickupDate, setEditPickupDate] = useState('');
    const [editReturnDate, setEditReturnDate] = useState('');

    useEffect(() => {

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
                console.error(`Error fetching reservations:, ${error.message}`);
                setError('Възникна грешка при зареждането на вашите резервации.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserReservations();
    }, [user.id, accessToken]);

    // Функция за изтриване на резервация
    const deleteBookingHandler = async (bookingId) => {
        const isConfirmed = window.confirm("Сигурни ли сте, че искате да анулирате тази резервация?");
        if (!isConfirmed) return;

        try {
            // Изпращаме DELETE заявка с нужните хедъри за аутентификация
            await request(
                import.meta.env.VITE_REST_URL,
                `/Reservations?id=eq.${bookingId}`,
                "DELETE",
                null,
                accessToken
            );

            // Обновяваме UI състоянието филтрирайки изтрития запис
            setReservations(prev => prev.filter(b => b.id !== bookingId));
        } catch (err) {
            console.error('Error deleting booking:', err);
            setError('Неуспешно анулиране. Моля, опитайте отново.');
        }
    };

    if (isLoading) {
        return (
            <div className={styles.centerContainer}>
                <p className={styles.loadingText}>Зареждане на вашите резервации...</p>
            </div>
        );
    }

    // 1. Влизане в режим на редактиране и попълване на текущите дати
    const startEditHandler = (booking) => {
        setEditingBookingId(booking.id);
        setEditPickupDate(booking.startDate);
        setEditReturnDate(booking.endDate);
    };

    // 2. Отказ от редактиране
    const cancelEditHandler = () => {
        setEditingBookingId(null);
    };

    // 3. Запазване на промените (PATCH заявка)
    const saveEditHandler = async (booking) => {
        if (new Date(editPickupDate) > new Date(editReturnDate)) {
            toast.error("Датата на връщане не може да бъде преди давата на вземане!");
            return;
        }

        const start = new Date(editPickupDate);
        const end = new Date(editReturnDate);
        const differenceInTime = end.getTime() - start.getTime();
        const totalDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;

        if (totalDays <= 0) {
            toast.info("Минималният период за наем е 1 ден.");
            return;
        }

        // Преизчисляваме общата цена спрямо новия период
        const activePrice = (booking.car.promoPrice !== null && booking.car.promoPrice !== undefined)
            ? booking.car.promoPrice
            : booking.car.carPrice;
        const newTotalPrice = totalDays * activePrice;

        try {
            await request(import.meta.env.VITE_REST_URL, `/Reservations?id=eq.${booking.id}`, "PATCH", { startDate: editPickupDate, endDate: editReturnDate, totalPrice: newTotalPrice }, accessToken);

            // Актуализираме UI състоянието на колата локално
            setReservations(prev => prev.map(b => b.id === booking.id
                ? { ...b, startDate: editPickupDate, endDate: editReturnDate, totalPrice: newTotalPrice }
                : b
            ));
            setEditingBookingId(null);
        } catch (err) {
            console.error('Error updating booking:', err);
            setError('Неуспешна промяна. Моля, опитайте отново.');
        }
    };


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
                    {reservations.map((booking) => {
                        const isEditing = editingBookingId === booking.id;
                        return (
                            <article key={booking.id} className={styles.reservationCard}>

                                {/* КОЛОНА 1: Снимка */}
                                <div className={styles.imageWrapper}>
                                    {booking.car.imageURL ? (
                                        <img src={booking.car.imageURL} alt={booking.car.carModel} />
                                    ) : (
                                        <div className={styles.noImage}>Няма снимка</div>
                                    )}
                                </div>

                                {/* КОЛОНА 2: Основна информация и Дати */}
                                <div className={styles.detailsContent}>
                                    <div>
                                        <div className={styles.mainInfo}>
                                            <h3>{booking.car.carModel}</h3>
                                            <span className={styles.badge}>{booking.car.carClass}</span>
                                        </div>

                                        <div className={styles.specs}>
                                            <span><i className="fa-solid fa-gears"></i> {booking.car.carGear}</span>
                                            <span><i className="fa-solid fa-gas-pump"></i> {booking.car.carGas}</span>
                                        </div>
                                    </div>

                                    {/* Превключване между преглед и редактиране на датите */}
                                    {!isEditing ? (
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
                                    ) : (
                                        <div className={styles.editPeriodBox}>
                                            <div className={styles.inputGroup}>
                                                <label>Нова дата на вземане:</label>
                                                <input
                                                    type="date"
                                                    value={editPickupDate}
                                                    onChange={(e) => setEditPickupDate(e.target.value)}
                                                />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label>Нова дата на връщане:</label>
                                                <input
                                                    type="date"
                                                    value={editReturnDate}
                                                    onChange={(e) => setEditReturnDate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* КОЛОНА 3: Страничен блок за Цена и Бутони */}
                                <div className={styles.priceSide}>
                                    <div className={styles.priceContainer}>
                                        <span className={styles.priceLabel}>Обща сума:</span>
                                        <span className={styles.priceValue}>{booking.totalPrice} €</span>
                                    </div>

                                    {!isEditing ? (
                                        <div className={styles.actionButtons}>
                                            <button
                                                onClick={() => startEditHandler(booking)}
                                                className={styles.btnEdit}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i> Промени
                                            </button>
                                            <button
                                                onClick={() => deleteBookingHandler(booking.id)}
                                                className={styles.btnDelete}
                                            >
                                                <i className="fa-solid fa-trash-can"></i> Анулирай
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={styles.actionButtons}>
                                            <button
                                                onClick={() => saveEditHandler(booking)}
                                                className={styles.btnSave}
                                            >
                                                <i className="fa-solid fa-floppy-disk"></i> Запази
                                            </button>
                                            <button
                                                onClick={cancelEditHandler}
                                                className={styles.btnCancel}
                                            >
                                                Отказ
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </article>
                        )
                    })}
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

