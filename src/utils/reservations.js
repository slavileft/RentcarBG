import request from './request';

export async function hasOverlappingBooking(carId, startDate, endDate, excludeBookingId, token) {
    const path =
        `/Reservations?carId=eq.${carId}` +
        `&id=neq.${excludeBookingId}` +
        `&startDate=lte.${endDate}` +
        `&endDate=gte.${startDate}`;

    const conflicts = await request(import.meta.env.VITE_REST_URL, path, 'GET', null, token);

    return conflicts.length > 0;
}