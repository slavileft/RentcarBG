import { Routes, Route } from "react-router"

import Header from "./components/header/Header.jsx"
import Main from "./components/main/Main.jsx"
import Footer from "./components/footer/Footer.jsx"
import CarDetails from "./components/car-details/CarDetails.jsx";
import Contacts from "./components/contacts/Contacts.jsx";
import Transfers from "./components/transfer/Transfers.jsx";
import MyReservations from "./components/my-reservations/MyReservations.jsx";

function App() {

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/cars/:carId" element={<CarDetails />} />
                <Route path="/transfers" element={<Transfers />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/reservations" element={<MyReservations />} />
            </Routes>

            <Footer />

        </>
    )
}

export default App