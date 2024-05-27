// const { MongoClient } = require("mongodb");

// let connection;
// let db;

// if (process.env.NODE_ENV === "test") {
//   connection = await MongoClient.connect(global.__MONGO_URI__, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   // db = await connection.db();
// } else {
//   connection = mongoose.connect("mongodb://localhost:27017", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// }

// export default connection;

/**
 * Connect to the in-memory database.
 */

// Filename: database.js

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = new MongoMemoryServer();

export const connect = async () => {
  if (process.env.NODE_ENV === "test") {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
      // useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
    };

    await mongoose.connect(uri, mongooseOpts);

    return mongoose;
  } else {
    await mongoose.connect("mongodb://localhost:27017", {
      // useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return mongoose;
  }
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
