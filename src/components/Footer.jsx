export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="container footer-grid">
                <div className="footer-about">
                    <h4>RENT CAR<span>.bg</span></h4>
                    <p>Модерни и сигурни автомобили под наем. Коректност и прозрачни условия без скрити такси.</p>
                    <div className="social-icons">
                        <a href="#"><i className="fa-brands fa-facebook"></i></a>
                        <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>
                <div className="footer-links">
                    <h4>Бързи връзки</h4>
                    <ul>
                        <li><a href="#">Автомобили</a></li>
                        <li><a href="#">Трансфери</a></li>
                        <li><a href="#">Общи условия</a></li>
                        <li><a href="#">За нас</a></li>
                    </ul>
                </div>
                <div className="footer-contacts">
                    <h4>Контакти</h4>
                    <p><i className="fa-solid fa-phone"></i> +359 877 744 363</p>
                    <p><i className="fa-solid fa-envelope"></i> office@rentcar.bg</p>
                    <p><i className="fa-solid fa-clock"></i> Пон-Пет: 9:00 - 19:00</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Rentcar. Всички права запазени.</p>
            </div>
        </footer>
    );
}