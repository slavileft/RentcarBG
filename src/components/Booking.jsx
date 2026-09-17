export default function Booking() {
    return (
        <section className="search-section">
            <div className="container">
                <div className="search-box">
                    <h3>Направи резервация</h3>
                    <form className="search-form">
                        <div className="form-group">
                            <label><i className="fa-solid fa-location-dot"></i> Място на наемане</label>
                            <select>
                                <option>Изберете локация...</option>
                                <option>Летище София Т1</option>
                                <option>Летище София Т2</option>
                                <option>Офис - Александър Жендов №6</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-calendar-days"></i> Дата на наемане</label>
                            <input type="datetime-local" />
                        </div>
                        <div className="form-group">
                            <label><i className="fa-solid fa-calendar-days"></i> Дата на връщане</label>
                            <input type="datetime-local" />
                        </div>
                        <button type="submit" className="btn-accent">Търсене</button>
                    </form>
                </div>
            </div>
        </section>
    );
}