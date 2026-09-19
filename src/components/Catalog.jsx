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
                    isAvailable={true}
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
                    isAvailable={true}
                />

                {/* <!-- Third CarCard (Marked as busy) --> */}
                <CarCard
                    carClass={"SUV"}
                    imageURL={"https://rentcar.bg/f/gallery/0/600_88793bf98b05e3f64455da4b9bde16e6.jpg"}
                    carModel={"Dacia Sandero Stepway"}
                    carGear={"Ръчна"}
                    carGas={"Бензин / LPG"}
                    carSeats={"4+1 места"}
                    carPrice={30}
                    isAvailable={false}
                />

            </div>
        </section>
    );
}