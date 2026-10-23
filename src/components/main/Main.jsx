import { useState, useEffect, useContext } from "react";
import Booking from "../booking/Booking";
import Catalog from "../catalog/Catalog";
import request from "../../utils/request";
import AuthContext from "../../context/auth-context";
import { toast } from "sonner";

export default function Main({catalogOnly}) {
    const { accessToken } = useContext(AuthContext);
    const [bookingData, setBookingData] = useState({});
    const [allBookings, setAllBookings] = useState([]);

    useEffect(() => {
        request(import.meta.env.VITE_REST_URL, "/Reservations", "GET", null, accessToken)
            .then(data => setAllBookings(data))
            .catch(error => toast.error(`Error fetching bookings:, ${error.message}`));
    }, []);

    return (
        <main className="main-content">
            {!catalogOnly && <Booking setBookingData={setBookingData} />}

            <Catalog
                allBookings={allBookings}
                pickupLocation={bookingData.pickupLocation}
                searchPickupDate={bookingData.pickupDate}
                searchReturnDate={bookingData.returnDate}
            />
        </main>
    );
}
