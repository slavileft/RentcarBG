import { useState, useEffect } from "react";
import Booking from "../booking/Booking";
import Catalog from "../catalog/Catalog";
import request from "../../utils/request";

export default function Main() {
    const [location, setLocation] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [allBookings, setAllBookings] = useState([]);

    useEffect(() => {
        request(import.meta.env.VITE_REST_URL, "/Reservations")
            .then(data => setAllBookings(data))
            .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    return (
        <main className="main-content">
            <Booking 
                location={location} setLocation={setLocation}
                pickupDate={pickupDate} setPickupDate={setPickupDate}
                returnDate={returnDate} setReturnDate={setReturnDate}
            />

            <Catalog 
                allBookings={allBookings}
                searchPickupDate={pickupDate}
                searchReturnDate={returnDate}
            />
        </main>
    );
}
