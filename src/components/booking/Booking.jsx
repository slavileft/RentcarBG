import { useState } from "react";

export default function Booking({ setBookingData }) {
    const today = new Date().toISOString().split('T')[0];
    const [error, setError] = useState('');

    const searchActionHandler = (formData) => {
        const pickupLocation = formData.get("pickupLocation");
        const pickupDate = formData.get("pickupDate");
        const returnDate = formData.get("returnDate");

        setError('');

        if (!pickupLocation) {
            setError("Моля, изберете локация!");
            return;
        }

        if (!pickupDate) {
            setError("Моля, изберете дата на наемане!");
            return;
        }

        if (!returnDate) {
            setError("Моля, изберете дата на връщане!");
            return;
        }

        if (pickupDate && returnDate && new Date(pickupDate) > new Date(returnDate)) {
            setError("Датата на връщане не може да бъде преди датата на вземане!");
            return;
        }

        setBookingData({ pickupLocation, pickupDate, returnDate });

    };

    return (
        <section className="search-section">
            <div className="container">
                <div className="search-box">
                    <h3>Направи резервация</h3>
                    <form className="search-form" action={searchActionHandler}>
                        <div className="form-group">
                            <label><i className="fa-solid fa-location-dot"></i> Място на наемане</label>
                            <select name="pickupLocation">
                                <option value="">Изберете локация...</option>
                                <option value="Летище София Т1">Летище София Т1</option>
                                <option value="Летище София Т2">Летище София Т2</option>
                                <option value="Офис - Александър Жендов №6">Офис - Александър Жендов №6</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-calendar-days"></i> Дата на наемане</label>
                            <input type="date" name="pickupDate" min={today} />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-calendar-days"></i> Дата на връщане</label>
                            <input type="date" name="returnDate" min={today} />
                        </div>
                        <button type="submit" className="btn-accent">Търсене</button>
                    </form>
                    {error && <p className="form-error">{error}</p>}
                </div>
            </div>
        </section>
    );
}
