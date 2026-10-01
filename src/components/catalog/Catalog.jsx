import CarCard from "./../car-card/CarCard";

export default function Catalog({cars}) {
    return (
        <section className="catalog-section container">
            <div className="section-title">
                <h2>Нашият Автопарк</h2>
                <p>Изберете перфектния автомобил за вашето пътуване</p>
            </div>

            <div className="cars-grid">

                {cars.map((car) => (<CarCard key={car.id} {...car} />))}

            </div>
        </section>
    );
}