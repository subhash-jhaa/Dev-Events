import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from "cloudinary";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        let event: any;
        let formData: FormData | null = null;
        const contentType = req.headers.get("content-type") || "";

        console.log("Received Content-Type:", contentType || "(empty)");

        // Handle different content types
        if (contentType.includes("application/json")) {
            // Handle JSON data
            event = await req.json();
        } else if (contentType.includes("multipart/form-data")) {
            // Handle form-data
            try {
                formData = await req.formData();
                event = Object.fromEntries(formData.entries());

                // Convert string arrays back to arrays for agenda and tags
                if (event.agenda && typeof event.agenda === 'string') {
                    event.agenda = event.agenda.split(',').map((item: string) => item.trim());
                }
                if (event.tags && typeof event.tags === 'string') {
                    event.tags = event.tags.split(',').map((item: string) => item.trim());
                }
            } catch (formError) {
                return NextResponse.json({
                    message: "Invalid form data format",
                    error: formError instanceof Error ? formError.message : 'Unknown form data error',
                    hint: "Ensure Content-Type header includes multipart boundary"
                }, { status: 400 });
            }
        } else {
            return NextResponse.json({
                message: "Missing or invalid Content-Type header",
                error: `Received: '${contentType}'. Expected 'application/json' or 'multipart/form-data'`,
                hint: "In Postman Headers tab: CHECK the Content-Type checkbox to enable it"
            }, { status: 415 });
        }

        console.log("Received event data:", event);

        let tags: string[] | undefined;
        let agenda: string[] | undefined;

        // Handle image upload only for form-data
        if (formData) {
            const file = formData.get("image");

            if (!file || !(file instanceof File)) {
                return NextResponse.json(
                    {
                        message: "Invalid image file",
                        error: `Expected a File but got: ${typeof file}`,
                    },
                    { status: 400 }
                );
            }
            
            // Tags and agenda are already converted to arrays in event object (lines 28-32)
            tags = event.tags;
            agenda = event.agenda;

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "DevEvent", resource_type: "image" },
                    (error, result) => {
                        if (error) return reject(error);
                        if (!result) return reject(new Error("Cloudinary upload failed"));
                        resolve(result);
                    }
                ).end(buffer);
            });

            // event.image = uploadResult.secure_url;
            event.image = (uploadResult as {secure_url:string}).secure_url;
        }

        // For JSON requests, image should be a URL string in the JSON body

        const createdEvent = await Event.create({
            ...event,
            ...(tags && { tags }),
            ...(agenda && { agenda }),
        });

        return NextResponse.json({
            message: "Event created successfully",
            event: createdEvent
        }, { status: 201 });
    } catch (e) {
        console.error("Error creating event:", e);
        return NextResponse.json({
            message: "Failed to create event",
            error: e instanceof Error ? e.message : 'Unknown error'
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 });
        return NextResponse.json({message: 'Events fetch success',events }, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({
            message: "Failed to fetch events",
            error: e  }, { status: 500 });
    }
}