import { useContext, useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router";
import AuthContext from "../../context/auth-context";

export default function Header() {
    const { user } = useContext(AuthContext);

    // 1. memory: is the mobile menu open?
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 2. a function that closes it
    const closeMenu = () => setIsMenuOpen(false);

    // points at the <header> element, so we can check where a tap happened
    const headerRef = useRef(null);

    // close the menu when the user taps outside the header
    useEffect(() => {
        if (!isMenuOpen) {
            return;                       // menu closed: nothing to listen for
        }

        const handlePointerDown = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        // cleanup: runs when the menu closes or the header disappears
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [isMenuOpen]);

    return (
        <header className="main-header" ref={headerRef}>
            <div className="container header-flex">
                <div className="logo">
                    <Link to="/">RENTCAR<span>.bg</span></Link>
                </div>

                {/* 3. the hamburger button (visible only on phones) */}
                <button
                    type="button"
                    className="menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Затвори менюто" : "Отвори менюто"}
                    aria-expanded={isMenuOpen}
                    aria-controls="main-menu"
                >
                    <i className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
                </button>

                {/* 4. one wrapper around the nav and the buttons */}
                <div
                    id="main-menu"
                    className={isMenuOpen ? "header-menu open" : "header-menu"}
                    onClick={closeMenu}
                >
                    <nav className="main-nav">
                        <ul>
                            <li><NavLink to="/cars">Автомобили</NavLink></li>
                            <li><NavLink to="/transfers">Трансфери</NavLink></li>
                            <li><NavLink to="/offers">Оферти</NavLink></li>
                            {user && <li><NavLink to="/reservations">Моите резервации</NavLink></li>}
                            <li><NavLink to="/contacts">Контакти</NavLink></li>
                        </ul>
                    </nav>

                    <div className="auth-buttons">
                        {user ? (
                            <>
                                <Link to="/reservations" className="btn-link">{user.email}</Link>
                                <Link to="/logout" className="btn-primary">Изход</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-link">Вход</Link>
                                <Link to="/register" className="btn-primary">Регистрация</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}