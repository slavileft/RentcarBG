import { useNavigate } from "react-router";

export default function CarCard({
    id,
    carClass,
    imageURL,
    carModel,
    carGear,
    carGas,
    carSeats,
    carPrice,
    promoPrice,
    passedPickupLocation,
    passedPickupDate,
    passedReturnDate
}) {
    const navigate = useNavigate();

    const hasPromo = promoPrice !== null && promoPrice !== undefined && promoPrice < carPrice;

    const carDetailsClickHandler = () => {
        navigate(`/cars/${id}`, {
            state: {
                initialPickupLocation: passedPickupLocation,
                initialPickupDate: passedPickupDate,
                initialReturnDate: passedReturnDate
            }
        })
    };

    return (
        <article className="car-card" >
            <span className="badge">{carClass}</span>
            {hasPromo && <span className="promo-badge">% Оферта</span>}
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

                        {hasPromo ? (
                            <>
                                <span className="old-price">€{carPrice}</span>
                                <span className="price-value promo-price-value">€{promoPrice}</span>
                            </>
                        ) : (
                            <span className="price-value">€{carPrice}</span>
                        )}
                        <span className="price-period">/ ден</span>

                    </div>
                    <button className="btn-secondary" onClick={carDetailsClickHandler}>Виж детайли</button>
                </div>
            </div>
        </article>
    );
}