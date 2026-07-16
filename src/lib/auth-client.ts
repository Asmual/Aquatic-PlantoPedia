"use strict";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000",
  // Inferring custom user schema fields directly inside the client configuration
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
      },
      role: {
        type: "string",
      },
    },
  },
});

export const { useSession, signOut, signIn, signUp } = authClient;