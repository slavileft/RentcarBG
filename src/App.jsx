import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Booking from "./components/Booking.jsx"
import Catalog from "./components/Catalog.jsx"

function App() {
    return (
        <>
            {/* <!-- REACT Component: <Header /> --> */}
            <Header />

            {/* <!-- REACT Component: <Main /> --> */}
            <main className="main-content">

                {/* <!-- REACT Component: <Booking Form /> --> */}
                <Booking />

                {/* <!-- REACT Component: <Catalog / CarList /> --> */}
                <Catalog />
            </main>

            {/* <!-- REACT Component: <Footer /> --> */}
            <Footer />
        </>
    )
}

export default App