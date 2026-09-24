import {useState, useEffect} from "react";

import CarCard from "./CarCard";

export default function Catalog() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // Fetch car data from supabase API
        fetch('https://mbqmgwqphsyquffalqrm.supabase.co/rest/v1/Cars', {
            method: 'GET',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1icW1nd3FwaHN5cXVmZmFscXJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM2NzUzNywiZXhwIjoyMTAxOTQzNTM3fQ.gIfaBzC4RqSkoIA6dXHKw-UDDV7jNCvQFJu8zG_XdSw',
            }
        })
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error('Error fetching car data:', error));
    }, []);

    return (
        <section className="catalog-section container">
            <div className="section-title">
                <h2>Нашият Автопарк</h2>
                <p>Изберете перфектния автомобил за вашето пътуване</p>
            </div>

            <div className="cars-grid">

                {/* <!-- REACT Component: <CarCards /> --> */}
                {cars.map((car) => (<CarCard key={car.id} {...car} />))}

            </div>
        </section>
    );
}