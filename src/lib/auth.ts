"use strict";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

const client = new MongoClient(uri);
await client.connect();

const db = client.db("Aquatic_PlantoPedia");

export const auth = betterAuth({
  database: mongodbAdapter(db),
 
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      // Added role configuration to dynamically default every new registration to "user"
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
    },
  },

  // Exposes the role attribute directly to the client-side session schema configuration
  plugins: [
    {
      id: "role-session-extension",
      transformSession: {
        schema: {
          user: {
            role: {
              type: "string",
            },
          },
        },
        fn: async (sessionContext) => {
          return {
            session: sessionContext.session,
            user: {
              ...sessionContext.user,
              role: (sessionContext.user as { role?: string }).role || "user",
            },
          };
        },
      },
    },
  ],
});