import { useState, useEffect } from "react"

import Booking from "./Booking"
import Catalog from "./Catalog"

export default function Main() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // Fetch car data from supabase API
        fetch('https://mbqmgwqphsyquffalqrm.supabase.co/rest/v1/Cars', {
            method: 'GET',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1icW1nd3FwaHN5cXVmZmFscXJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM2NzUzNywiZXhwIjoyMTAxOTQzNTM3fQ.gIfaBzC4RqSkoIA6dXHKw-UDDV7jNCvQFJu8zG_XdSw',
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