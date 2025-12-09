import mongoose, { Schema, Document } from "mongoose";

// Interface for the Event document
export interface EventDocument extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Event schema definition
const eventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, required: true },
    audience: { type: String, required: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

// Add unique index on slug
eventSchema.index({ slug: 1 });

// Pre-save hook for slug generation, date normalization, and time consistency
eventSchema.pre<EventDocument>("save", async function (this: EventDocument) {
  // Generate slug from title if title is modified
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  if (this.isModified("date")) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format");
    }
    this.date = parsedDate.toISOString().split("T")[0];
  }

  // Normalize time to 24-hour format (HH:MM)
  if (this.isModified("time")) {
    const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM)?$/i;
    const match = this.time.match(timeRegex);
    if (!match) {
      throw new Error("Invalid time format. Use HH:MM or HH:MM AM/PM");
    }
    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const ampm = match[3]?.toUpperCase();
    if (ampm === "PM" && hours !== 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;
    this.time = `${hours.toString().padStart(2, "0")}:${minutes}`;
  }
});

// Export the Event model
export const Event = mongoose.model<EventDocument>("Event", eventSchema);
