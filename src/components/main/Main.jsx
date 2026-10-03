import { useState, useEffect } from "react"

import Booking from "../booking/Booking"
import Catalog from "../catalog/Catalog"

export default function Main() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // Fetch car data from supabase API
        fetch('https://mbqmgwqphsyquffalqrm.supabase.co/rest/v1/Cars', {
            method: 'GET',
            headers: {
                'apikey': import.meta.env.VITE_API_KEY,
            }
        })
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error('Error fetching car data:', error));
    }, []);

    return (
        <main className="main-content">

            <Booking />

            <Catalog cars={cars} />

        </main>
    );
}