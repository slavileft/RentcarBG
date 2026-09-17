import Booking from "./Booking.jsx"
import Catalog from "./Catalog.jsx"

export default function Main() {
    return (
        <main className="main-content">

            {/* <!-- REACT Component: <Booking Form /> --> */}
            <Booking />

            {/* <!-- REACT Component: <Catalog / CarList /> --> */}
            <Catalog />
        </main>
    );
}