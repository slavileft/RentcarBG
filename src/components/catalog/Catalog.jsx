import { useState, useEffect, useContext } from "react"
import SearchFilter from "../search-filter/SearchFilter";
import CarCard from "./../car-card/CarCard";
import request from "../../utils/request";
import AuthContext from "../../context/auth-context";

export default function Catalog({ allBookings, searchPickupDate, searchReturnDate }) {
    const {accessToken} = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedGear, setSelectedGear] = useState('');
    const [cars, setCars] = useState([]);

    useEffect(() => {
        request(import.meta.env.VITE_REST_URL, "/Cars", "GET", null, accessToken)
            .then(data => setCars(data))
            .catch(error => alert(`Error fetching car data:, ${error.message}`));
    }, [accessToken]);

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

            {filteredCars.length > 0 ? (
                <div className="cars-grid">
                    {filteredCars.map((car) => (
                        <CarCard 
                            key={car.id} 
                            {...car} 
                            passedPickupDate={searchPickupDate}
                            passedReturnDate={searchReturnDate}
                        />
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center', color: '#8d99ae', padding: '40px 0', fontSize: '16px' }}>
                    Няма намерени автомобили, отговарящи на избраните критерии или период.
                </p>
            )}
        </section>
    );
}
