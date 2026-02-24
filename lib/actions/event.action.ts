'use server';
import Event from '@/database/event.model';
import connectDB from "../mongodb";

export const getAllEvents = async () => {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(events));
    } catch (e) {
        console.error('Error fetching events:', e);
        return [];
    }
}

export const getEventBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug }).lean();
        if (!event) return null;
        return JSON.parse(JSON.stringify(event));
    } catch (e) {
        console.error('Error fetching event:', e);
        return null;
    }
}

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();

        const event = await Event.findOne({ slug }).lean();

        if (!event) return [];

        const similarEvents = await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags }
        }).lean();

        return JSON.parse(JSON.stringify(similarEvents));

    } catch (e) {
        return [];
    }
}
