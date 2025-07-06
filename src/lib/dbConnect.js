import mongoose from 'mongoose';

let cached = global.mongoose;  

// if not cache exists, initialize one in the global space.
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
    // if the conn is already established, do not reconnect to the database.
    if (cached.conn) {
        return cached.conn;
    }

    // if the conneciton has not started yet, connect to the database.
    if (!cached.promise) {
        // ensure that the environment variable is set.
        if (!process.env.MONGODB_URL) {
            console.error("MONGODB_URL is not defined in envrionment variables. Error in lib/dbConnect.js");
            process.exit(1);
        }

        // Start the connectio to the database.
        cached.promise = mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'InterviewPrepApp',
        });
    }

    // wait for the conn to complete and returns the Mongoose instance.
    try {
        cached.conn = await cached.promise;

        if (cached.conn.connection.readyState === 1) {
            console.log("✅ Connected to MongoDB");
            return cached.conn;
        } else {
            console.error("Couldn't connect to the MongoDB");
            process.exit(1);
        }
    } catch (error) {
        console.error("Failed to connect to MongoDB. Error in lib/dbConnect.js: ", error);
        process.exit(1);
    }
}