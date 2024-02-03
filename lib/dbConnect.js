import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = new MongoMemoryServer();
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    if (process.env.NODE_ENV === "test") {
      const uri = await mongod.getConnectionString();

      const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
      };

      cached.promise = mongoose.connect(uri, mongooseOpts).then((mongoose) => {
        return mongoose;
      });

      return mongoose;
    } else {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  if (process.env.NODE_ENV === "test") {
    await mongoose.connection.dropDatabase();
  } else {
    console.warn(
      `Dropping database only allowed in test env. Skipping clearDatabase in ${process.env.NODE_ENV} env`
    );
  }
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  if (process.env.NODE_ENV === "test") {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  } else {
    console.warn(
      `Clearing database only allowed in test env. Skipping clearDatabase in ${process.env.NODE_ENV} env`
    );
  }
};

export default dbConnect;
