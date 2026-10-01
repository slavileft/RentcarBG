import { NavLink } from "react-router";

export default function Header() {
    return (
        <header className="main-header">
            <div className="container header-flex">
                <div className="logo">
                    <NavLink to="/">RENTCAR<span>.bg</span></NavLink>
                </div>
                <nav className="main-nav">
                    <ul><li><NavLink to="/">Автомобили</NavLink></li>
                        <li><NavLink to="/transfers">Трансфери</NavLink></li>
                        <li><NavLink to="/reservations">Моите Резервации</NavLink></li>
                        <li><NavLink to="/contacts">Контакти</NavLink></li>
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