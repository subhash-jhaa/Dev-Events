import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

// Define the route params type for the dynamic [slug] parameter
type RouteParams = {
  params: {
    slug: string;
  };
};

/**
 * GET handler to fetch a single event by its slug.
 * @param request - The incoming request object (unused but required by Next.js)
 * @param context - Contains the route parameters including the slug
 * @returns JSON response with the event data or an error message
 */
export async function GET(
  request: NextRequest,
  {params}: RouteParams
): Promise<NextResponse> {
  try {

    // Establish database connection
    await connectDB();

    // Extract slug from route parameters
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        {
          message: 'Invalid request',
          error: 'Slug parameter is required and must be a non-empty string',
        },
        { status: 400 }
      );
    }

    // Normalize slug to lowercase and trim whitespace
    const normalizedSlug = slug.toLowerCase().trim();

    
    // Query the Event model by slug
    const event= await Event.findOne({ slug: normalizedSlug });

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        {
          message: 'Event not found',
          error: `No event exists with slug: ${normalizedSlug}`,
        },
        { status: 404 }
      );
    }

    // Return the event data
    return NextResponse.json(
      {
        message: 'Event fetched successfully',
        event,
      },
      { status: 200 }
    );
  } catch (error) { 
    // Log error for debugging (appears in server logs)
    if (process.env.NODE_ENV === 'production'){
    console.error('Error fetching event by slug:', error);
    }
    if (error instanceof Error) {
      if(error.message.includes('MONGODB_URI')){
        return NextResponse.json(
          {
            message: 'Database connection error',
            error: 'Failed to connect to the database. Please check your database configuration.',
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          message: 'Failed to fetch event',
          error: error.message,
        },
        { status: 500 }
      );
    }
    
    // Handle unexpected errors
    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
