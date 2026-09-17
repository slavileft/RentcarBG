export default function CarCard({carClass, imageURL, carModel, carGear, carGas, carSeats, carPrice}) {
    return (
        <article className="car-card" >
            <span className="badge luxury">{carClass}</span>
            <div className="car-image-wrapper">
                <img src={imageURL} alt="Renault Austral" />
            </div>
            <div className="car-details">
                <h3>{carModel}</h3>
                <div className="car-specs">
                    <span><i className="fa-solid fa-gears"></i> {carGear}</span>
                    <span><i className="fa-solid fa-gas-pump"></i> {carGas}</span>
                    <span><i className="fa-solid fa-users"></i> {carSeats}</span>
                </div>
                <div className="car-footer">
                    <div className="price-box">
                        <span className="price-value">€{carPrice}</span>
                        <span className="price-period">/ ден</span>
                    </div>
                    <a href="#" className="btn-secondary">Виж детайли</a>
                </div>
            </div>
        </article>
    );
}