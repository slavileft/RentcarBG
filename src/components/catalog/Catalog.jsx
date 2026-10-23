import { useState, useContext } from "react"

import useFetch from "../../hooks/useFetch";

import SearchFilter from "../search-filter/SearchFilter";
import CarCard from "./../car-card/CarCard";
import AuthContext from "../../context/auth-context";

export default function Catalog({ allBookings, pickupLocation, searchPickupDate, searchReturnDate }) {
    const { accessToken } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedGear, setSelectedGear] = useState('');
    const { data: cars, isLoading, error } = useFetch('/Cars', [], accessToken);

    const filteredCars = cars.filter(car => {
        const matchesClass = selectedClass === '' || car.carClass === selectedClass;
        const matchesGear = selectedGear === '' || car.carGear === selectedGear;

        let isAvailableInPeriod = true;
        if (searchPickupDate && searchReturnDate) {
            const userStart = new Date(searchPickupDate);
            const userEnd = new Date(searchReturnDate);

            const carBookings = allBookings.filter(b => b.carId === car.id);
            for (let booking of carBookings) {
                const bookingStart = new Date(booking.startDate);
                const bookingEnd = new Date(booking.endDate);

                if (userStart <= bookingEnd && userEnd >= bookingStart) {
                    isAvailableInPeriod = false;
                    break;
                }
            }
        }

        return matchesClass && matchesGear && isAvailableInPeriod;
    });

    return (
        <section className="catalog-section container">
            {searchPickupDate ? (
                <div className="section-title">
                    <h2>Всички намерени автомобили</h2>
                    <p>за периода от {searchPickupDate} до {searchReturnDate}</p>
                </div>
            ) : (
                <div className="section-title">
                    <h2>Нашият Автопарк</h2>
                    <p>Изберете перфектния автомобил за вашето пътуване</p>
                </div>
            )}

            <SearchFilter
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                selectedGear={selectedGear}
                setSelectedGear={setSelectedGear}
            />

            {isLoading && (
                <p style={{ textAlign: 'center', color: '#8d99ae', padding: '40px 0' }}>
                    Зареждане на автомобилите...
                </p>
            )}

            {error && <p className="form-error">Грешка при зареждане: {error}</p>}

            {!isLoading && !error && (
                filteredCars.length > 0 ? (
                    <div className="cars-grid">
                        {filteredCars.map((car) => (
                            <CarCard
                                key={car.id}
                                {...car}
                                passedPickupLocation={pickupLocation}
                                passedPickupDate={searchPickupDate}
                                passedReturnDate={searchReturnDate}
                            />
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', color: '#8d99ae', padding: '40px 0', fontSize: '16px' }}>
                        Няма намерени автомобили, отговарящи на избраните критерии или период.
                    </p>
                )
            )}

        </section>
    );
}
