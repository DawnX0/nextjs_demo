import { Event } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Connecting to database...");
    await connectToDatabase();
    console.log("Connected, fetching events...");

    const events = await Event.find({}).sort({ createdAt: -1 });
    console.log(`Fetched ${events.length} events`);

    return NextResponse.json({ events }, { status: 200 });
  } catch (e) {
    console.error("Error in GET /api/events:", e);
    return NextResponse.json(
      {
        message: "Failed to fetch events",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // Basic validation for required fields
    const requiredFields = [
      "title",
      "description",
      "overview",
      "image",
      "venue",
      "location",
      "date",
      "time",
      "mode",
      "audience",
      "agenda",
      "organizer",
      "tags",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Ensure agenda and tags are arrays
    if (!Array.isArray(body.agenda) || !Array.isArray(body.tags)) {
      return NextResponse.json(
        { message: "agenda and tags must be arrays" },
        { status: 400 }
      );
    }

    const createEvent = await Event.create(body);

    return NextResponse.json(
      { message: "Event created successfully", event: createEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Event creation failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
