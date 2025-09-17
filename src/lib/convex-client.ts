import { ConvexReactClient } from "convex/react";

export const convexClient = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL as string,
  { expectAuth: true },
);

export function closeConvexConnections() {
  try {
    void convexClient.close();
  } catch {
    // noop
  }
}
