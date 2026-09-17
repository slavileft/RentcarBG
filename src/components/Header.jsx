export default function Header() {
    return (
        <header className="main-header">
            <div className="container header-flex">
                <div className="logo">
                    <a href="#">RENTCAR<span>.bg</span></a>
                </div>
                <nav className="main-nav">
                    <ul>
                        <li><a href="#" className="active">Автомобили</a></li>
                        <li><a href="#">Трансфери</a></li>
                        <li><a href="#">Моите Резервации</a></li>
                        <li><a href="#">Контакти</a></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    <a href="#" className="btn-link">Вход</a>
                    <a href="#" className="btn-primary">Регистрация</a>
                </div>
            </div>
        </header>
    );
}