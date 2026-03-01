'use client'

import { createBooking } from '@/lib/actions/booking.actions';
import { useUser, SignInButton } from '@clerk/nextjs';
import posthog from 'posthog-js';
import { useState } from 'react'

const BookEvent = ({ eventId, slug }: { eventId: string, slug: string }) => {
    const { isSignedIn, user } = useUser();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignedIn || !user) return;

        setLoading(true);
        setError('');

        const email = user.primaryEmailAddress?.emailAddress ?? '';
        const userId = user.id;

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ eventId, email, userId }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitted(true);
                posthog.capture('booking_created', { eventId, slug, email });
            } else if (response.status === 409 || result.error === 'already_booked') {
                setError("You've already booked this event!");
            } else {
                setError(`Booking failed: ${result.message || result.error || 'Unknown error'}`);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error("Booking submission error:", err);
        } finally {
            setLoading(false);
        }
    }

    // User is not signed in — prompt them
    if (!isSignedIn) {
        return (
            <div id='book-event'>
                <p className='text-sm'>You need to be signed in to book this event.</p>
                <SignInButton mode="modal">
                    <button className='button-submit' style={{ marginTop: '12px' }}>Sign In to Book</button>
                </SignInButton>
            </div>
        )
    }

    return (
        <div id='book-event'>
            {submitted ? (
                <p className='text-sm'>🎉 You&apos;re booked! We&apos;ll see you there.</p>
            ) : (
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <p className='text-sm'>Booking as <strong>{user.primaryEmailAddress?.emailAddress}</strong></p>
                    {error && (
                        <p className='text-sm' style={{ color: '#ff6b6b' }}>{error}</p>
                    )}
                    <button type='submit' className='button-submit' disabled={loading}>
                        {loading ? 'Booking...' : 'Book My Spot'}
                    </button>
                </form>
            )}
        </div>
    )
}

export default BookEvent
