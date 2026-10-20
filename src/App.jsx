import { Routes, Route, useNavigate } from "react-router"

import { useState } from "react";

import Header from "./components/header/Header.jsx"
import Main from "./components/main/Main.jsx"
import Footer from "./components/footer/Footer.jsx"
import CarDetails from "./components/car-details/CarDetails.jsx";
import Contacts from "./components/contacts/Contacts.jsx";
import Transfers from "./components/transfer/Transfers.jsx";
import Offers from "./components/offers/Offers.jsx";
import MyReservations from "./components/my-reservations/MyReservations.jsx";
import About from "./components/about/About.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import { authApi } from "./api"


function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);

    const registerHandler = async (userData) => {
        try {
            const result = await authApi.register(userData);

            setAuth(result);

            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    const loginHandler = async (userData) => {
        try {
            const result = await authApi.login(userData);

            setAuth(result);

            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <Header user={auth?.user} />

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/cars/:carId" element={<CarDetails />} />
                <Route path="/transfers" element={<Transfers />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/about" element={<About />} />
                <Route path="/reservations" element={<MyReservations />} />
                <Route path="/login" element={<Login onLogin={loginHandler} />} />
                <Route path="/register" element={<Register onRegister={registerHandler} />} />
            </Routes>

            <Footer />

        </>
    )
}

export default App