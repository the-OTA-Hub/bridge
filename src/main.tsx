import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";
import "./index.css";
import { useConvexAuth } from "convex/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { Loading } from "@/components/loading";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { convexClient } from "@/lib/convex-client";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const auth = useConvexAuth();
  if (auth.isLoading) {
    return <Loading />;
  }
  return <RouterProvider router={router} context={{ auth }} />;
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ConvexBetterAuthProvider client={convexClient} authClient={authClient}>
          <App />
        </ConvexBetterAuthProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
