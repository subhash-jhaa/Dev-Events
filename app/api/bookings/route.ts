import { NextRequest, NextResponse } from "next/server";
import { getBookingsByUserId, createBooking } from "@/lib/actions/booking.actions";
import { auth } from "@clerk/nextjs/server";
import resend from "@/lib/resend";
import { getBookingEmailTemplate } from "@/lib/email-template";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function GET(req: NextRequest) {
    try {
        const { userId: authUserId } = await auth();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!authUserId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        if (!userId) {
            return NextResponse.json({ message: "UserId is required" }, { status: 400 });
        }

        // Only allow users to fetch their own bookings, unless they are an admin (can be added later)
        if (authUserId !== userId) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const bookings = await getBookingsByUserId(userId);
        return NextResponse.json(bookings);
    } catch (error) {
        console.error("API Booking GET Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId: authUserId } = await auth();
        if (!authUserId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { eventId, email, userId } = await req.json();

        if (!eventId || !email || !userId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        if (authUserId !== userId) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        // 1. Create the booking
        const result = await createBooking({ eventId, email, userId });

        if (!result.success) {
            return NextResponse.json(result, { status: result.error === 'already_booked' ? 409 : 500 });
        }

        // 2. Fetch event details for the email (can be optimized but safe for now)
        try {
            await connectDB();
            const event = await Event.findById(eventId);

            if (event) {
                const emailHtml = getBookingEmailTemplate({
                    eventTitle: event.title,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    eventUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/events/${event.slug}`
                });

                // Send email asynchronously - don't await to keep response fast
                resend.emails.send({
                    from: 'DevEvent <onboarding@resend.dev>', // Use verified domain in production
                    to: email,
                    subject: `Booking Confirmed: ${event.title}`,
                    html: emailHtml,
                }).catch(emailErr => {
                    console.error("Failed to send confirmation email:", emailErr);
                });
            }
        } catch (eventFetchErr) {
            console.error("Error fetching event for email:", eventFetchErr);
            // Don't fail the booking if only the email fails
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("API Booking POST Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
