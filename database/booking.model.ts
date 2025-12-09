import mongoose, { Schema, Document } from "mongoose";
import { Event } from "./event.model";

// Interface for the Booking document
export interface BookingDocument extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Booking schema definition
const bookingSchema = new Schema<BookingDocument>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  { timestamps: true }
);

// Add index on eventId for faster queries
bookingSchema.index({ eventId: 1 });

// Pre-save hook to validate eventId reference
bookingSchema.pre<BookingDocument>(
  "save",
  async function (this: BookingDocument) {
    // Check if the referenced event exists
    const event = await Event.findById(this.eventId);
    if (!event) {
      throw new Error("Referenced event does not exist");
    }
  }
);

// Export the Booking model
export const Booking = mongoose.model<BookingDocument>(
  "Booking",
  bookingSchema
);
