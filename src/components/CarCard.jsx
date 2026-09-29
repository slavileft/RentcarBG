import { useNavigate } from "react-router";

export default function CarCard({ id, carClass, imageURL, carModel, carGear, carGas, carSeats, carPrice, isAvailable }) {
    const navigate = useNavigate();

    const carDetailsClickHandler = () => {
        navigate(`cars/${id}`)
        
    };
    
    return (
        <article className={`car-card ${!isAvailable && 'unavailable'}`}>
            <span className="badge luxury">{carClass}</span>
            <div className="car-image-wrapper">
                <img src={imageURL} alt={carModel} />
            </div>
            <div className="car-details">
                <h3 onClick={carDetailsClickHandler}>{carModel}</h3>
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
                    {isAvailable ? (
                        // TODO: Да променя текста на бутона на Резервирай и да променя функционалността за резервиране onClick
                        <button className="btn-secondary" onClick={carDetailsClickHandler}>Виж детайли</button>
                    ) : (
                        <button className="btn-disabled" disabled>Резервирана</button>
                    )}
                </div>
            </div>
        </article>
    );
}