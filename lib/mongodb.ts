import mongoose, { Connection } from 'mongoose';

// Define the MongoDB connection URI from environment variables
const MONGODB_URI: string = process.env.MONGODB_URI!;

// Throw an error if the URI is not defined
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Extend the global object to include a mongoose cache for connection reuse
declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  } | undefined;
}

// Initialize the cache from the global object to prevent multiple connections
let cached = global.mongoose;

if (!cached) {
  // Create a new cache object if it doesn't exist
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to the MongoDB database using Mongoose.
 * Caches the connection to prevent multiple connections during development.
 * @returns A promise that resolves to the Mongoose connection object.
 */
async function connectToDatabase(): Promise<Connection> {
  // Return the cached connection if it exists
  if (cached!.conn) {
    return cached!.conn;
  }

  // If no connection promise exists, create one
  if (!cached!.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering
    };

    // Connect to MongoDB and store the promise
    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }

  // Await the connection promise and cache the result
  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default connectToDatabase;