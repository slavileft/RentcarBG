export default function Booking({ 
    location, setLocation, 
    pickupDate, setPickupDate, 
    returnDate, setReturnDate 
}) {
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (pickupDate && returnDate && new Date(pickupDate) > new Date(returnDate)) {
            alert("Датата на връщане не може да бъде преди датата на вземане!");
        }
    };

    return (
        <section className="search-section">
            <div className="container">
                <div className="search-box">
                    <h3>Направи резервация</h3>
                    <form className="search-form" onSubmit={searchSubmitHandler}>
                        <div className="form-group">
                            <label><i className="fa-solid fa-location-dot"></i> Място на наемане</label>
                            <select value={location} onChange={(e) => setLocation(e.target.value)}>
                                <option value="">Изберете локация...</option>
                                <option value="Летище София Т1">Летище София Т1</option>
                                <option value="Летище София Т2">Летище София Т2</option>
                                <option value="Офис - Александър Жендов №6">Офис - Александър Жендов №6</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-calendar-days"></i> Дата на наемане</label>
                            <input 
                                type="date" 
                                value={pickupDate} 
                                onChange={(e) => setPickupDate(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-calendar-days"></i> Дата на връщане</label>
                            <input 
                                type="date" 
                                value={returnDate} 
                                onChange={(e) => setReturnDate(e.target.value)} 
                            />
                        </div>
                        <button type="submit" className="btn-accent">Търсене</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
