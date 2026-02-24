'use server';

import Booking from '@/database/booking.model';
import connectDB from "../mongodb";

export const createBooking = async ({ eventId, email, userId }: { eventId: string, email: string, userId?: string }) => {
    try {
        await connectDB();
        await Booking.create({ eventId, email, userId });
        return { success: true };
    } catch (e: any) {
        console.error("Error creating booking:", e);

        // Duplicate booking (unique index on eventId + email)
        if (e.code === 11000) {
            return { success: false, error: 'already_booked' };
        }

        return { success: false, error: e.message || 'unknown_error' };
    }
}