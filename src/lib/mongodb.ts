"use strict";

import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MONGODB_URI to .env.local");
}

// Global connection routing config based on your previous architectural layout
const client = new MongoClient(process.env.MONGODB_URI, {
    family: 4, 
});

// Create the connection promise explicitly required by BetterAuth
const clientPromise = client.connect();

export default clientPromise;