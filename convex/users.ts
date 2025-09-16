// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

import { query } from "./_generated/server";
import { authComponent } from "./auth";

// You can read data from the database via a query:
export const me = query({
  // Query implementation.
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});
