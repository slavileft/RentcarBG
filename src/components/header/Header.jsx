import { NavLink, Link } from "react-router";

export default function Header() {
    return (
        <header className="main-header">
            <div className="container header-flex">
                <div className="logo">
                    <Link to="/">RENTCAR<span>.bg</span></Link>
                </div>
                <nav className="main-nav">
                    <ul><li><NavLink to="/">Автомобили</NavLink></li>
                        <li><NavLink to="/transfers">Трансфери</NavLink></li>
                        <li><NavLink to="/reservations">Моите Резервации</NavLink></li>
                        <li><NavLink to="/contacts">Контакти</NavLink></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    <Link to="#" className="btn-link">Вход</Link>
                    <Link to="#" className="btn-primary">Регистрация</Link>
                </div>
            </div>
        </header>
    );
}