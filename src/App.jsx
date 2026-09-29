import { Routes, Route } from "react-router"

import Header from "./components/Header.jsx"
import Main from "./components/Main.jsx"
import Footer from "./components/Footer.jsx"
import CarDetails from "./components/CarDetails.jsx";
import Contacts from "./components/Contacts.jsx";
import Transfers from "./components/Transfers.jsx";
import MyReservations from "./components/MyReservations.jsx";

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