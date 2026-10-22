import { Routes, Route } from "react-router"

import { AuthProvider } from "./context/auth-context";

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
import Logout from "./components/logout/Logout.jsx";

function App() {

    return (
        <AuthProvider>
            <Header />

            <Routes>
                <Route path="/" element={<Main catalogOnly={false}/>} />
                <Route path="/cars" element={<Main catalogOnly={true} />} />
                <Route path="/cars/:carId" element={<CarDetails />} />
                <Route path="/transfers" element={<Transfers />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/about" element={<About />} />
                <Route path="/reservations" element={<MyReservations />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>

            <Footer />

        </AuthProvider>
    )
}

export default App