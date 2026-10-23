import { useState, useContext } from "react";

import useFetch from "../../hooks/useFetch";

import Booking from "../booking/Booking";
import Catalog from "../catalog/Catalog";
import AuthContext from "../../context/auth-context";

export default function Main({catalogOnly}) {
    const { accessToken } = useContext(AuthContext);
    const [bookingData, setBookingData] = useState({});

    const { data: allBookings, error } = useFetch('/Reservations', [], accessToken);

    return (
        <main className="main-content">
            {!catalogOnly && <Booking setBookingData={setBookingData} />}

            {error && (
                <p className="form-error container">
                    Не можахме да проверим наличността на автомобилите: {error}
                </p>
            )}
            
            <Catalog
                allBookings={allBookings}
                pickupLocation={bookingData.pickupLocation}
                searchPickupDate={bookingData.pickupDate}
                searchReturnDate={bookingData.returnDate}
            />
        </main>
    );
}
