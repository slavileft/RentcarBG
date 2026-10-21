import { NavLink, Link } from "react-router";

export default function Header({ user }) {

    return (
        <header className="main-header">
            <div className="container header-flex">
                <div className="logo">
                    <Link to="/">RENTCAR<span>.bg</span></Link>
                </div>
                <nav className="main-nav">
                    <ul><li><NavLink to="/">Автомобили</NavLink></li>
                        <li><NavLink to="/transfers">Трансфери</NavLink></li>
                        <li><NavLink to="/offers">Оферти</NavLink></li>
                        {user && <li><NavLink to="/reservations">Моите Резервации</NavLink></li>}
                        <li><NavLink to="/contacts">Контакти</NavLink></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    {user ? (
                        <>
                            <Link to="/reservations" className="btn-link">{user.email}</Link>
                            <Link to="#" className="btn-primary">Изход</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-link">Вход</Link>
                            <Link to="/register" className="btn-primary">Регистрация</Link>
                        </>
                    )
                    }
                </div>
            </div>
        </header>
    );
}