import CarCard from "./CarCard";

export default function Catalog() {
    return (
        <section className="catalog-section container">
            <div className="section-title">
                <h2>Нашият Автопарк</h2>
                <p>Изберете перфектния автомобил за вашето пътуване</p>
            </div>

            <div className="cars-grid">

                {/* <!-- REACT Component: <CarCards /> --> */}
                <CarCard 
                carClass={"Луксозен"} 
                imageURL={"https://rentcar.bg/f/gallery/0/ec382ea25d7da0ae7977ee01d9317b83.jpg"}
                carModel={"Renault Austral Techno"}
                carGear={"Автоматик"}
                carGas={"Хибрид"}
                carSeats={"4+1 места"}
                carPrice={55}
                />

                {/* <!-- Second CarCard --> */}
                <CarCard
                carClass={"Компактен"}
                imageURL={"https://rentcar.bg/f/gallery/0/600_0699c204d99c25a3e49df5f0762eb364.jpg"}
                carModel={"Skoda Scala 1.0 TSI"}
                carGear={"Ръчна"}
                carGas={"Бензин"}
                carSeats={"4+1 места"}
                carPrice={35}
                />

                {/* <!-- Third CarCard (Marked as busy) --> */}
                <article className="car-card unavailable">
                    <span className="badge suv">SUV</span>
                    <div className="car-image-wrapper">
                        <img src="https://rentcar.bg/f/gallery/0/600_88793bf98b05e3f64455da4b9bde16e6.jpg" alt="Dacia Sandero" />
                    </div>
                    <div className="car-details">
                        <h3>Dacia Sandero Stepway</h3>
                        <div className="car-specs">
                            <span><i className="fa-solid fa-gears"></i> Ръчна</span>
                            <span><i className="fa-solid fa-gas-pump"></i> Бензин / LPG</span>
                            <span><i className="fa-solid fa-users"></i> 4+1 места</span>
                        </div>
                        <div className="car-footer">
                            <div className="price-box">
                                <span className="price-value">€30</span>
                                <span className="price-period">/ ден</span>
                            </div>
                            <button className="btn-disabled" disabled>Резервирана</button>
                        </div>
                    </div>
                </article>

            </div>
        </section>
    );
}