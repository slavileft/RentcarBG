import { useState, useEffect, useContext } from "react";
import Booking from "../booking/Booking";
import Catalog from "../catalog/Catalog";
import request from "../../utils/request";
import AuthContext from "../../context/auth-context";

export default function Main() {
    const { accessToken } = useContext(AuthContext);
    const [bookingData, setBookingData] = useState({});

    // console.log(bookingData.pickupLocation, bookingData.pickupDate, bookingData.returnDate);

    const [allBookings, setAllBookings] = useState([]);

    useEffect(() => {
        request(import.meta.env.VITE_REST_URL, "/Reservations", "GET", null, accessToken)
            .then(data => setAllBookings(data))
            .catch(error => alert(`Error fetching bookings:, ${error.message}`));
    }, []);

    return (
        <main className="main-content">
            <Booking setBookingData={setBookingData} />

            <Catalog
                allBookings={allBookings}
                searchPickupDate={bookingData.pickupDate}
                searchReturnDate={bookingData.returnDate}
            />
        </main>
    );
}
