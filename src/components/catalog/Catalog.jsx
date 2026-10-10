import { useState } from "react"

import SearchFilter from "../search-filter/SearchFilter";
import CarCard from "./../car-card/CarCard";

export default function Catalog({ cars }) {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedGear, setSelectedGear] = useState('');

    const filteredCars = cars.filter(car => {
        const matchesClass = selectedClass === '' || car.carClass === selectedClass;

        const matchesGear = selectedGear === '' || car.carGear === selectedGear;

        return matchesClass && matchesGear;
    });

    return (
        <section className="catalog-section container">
            <div className="section-title">
                <h2>Нашият Автопарк</h2>
                <p>Изберете перфектния автомобил за вашето пътуване</p>
            </div>

            <SearchFilter
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                selectedGear={selectedGear}
                setSelectedGear={setSelectedGear}
            />

            {filteredCars.length > 0 ? (
                <div className="cars-grid">
                    {filteredCars.map((car) => (<CarCard key={car.id} {...car} />))}
                </div>
            ) : (
                <p style={{ textAlign: 'center', color: '#8d99ae', padding: '40px 0', fontSize: '16px' }}>
                    Няма намерени автомобили, отговарящи на избраните критерии.
                </p>
            )}
        </section>
    );
}