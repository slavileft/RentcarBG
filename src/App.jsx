import { Routes, Route } from "react-router"

import Header from "./components/Header.jsx"
import Main from "./components/Main.jsx"
import Footer from "./components/Footer.jsx"
import CarDetails from "./components/CarDetails.jsx";
import Contacts from "./components/Contacts.jsx";

function App() {

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/cars/:carId" element={<CarDetails />} />
                <Route path="/contacts" element={<Contacts />} />
            </Routes>

            <Footer />

        </>
    )
}

export default App