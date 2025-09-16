import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { Toaster } from "@/components/ui/sonner";
import { ConvexAuthState } from "convex/react";

interface RouterContext {
  auth: ConvexAuthState;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  errorComponent: (props) => {
    return <DefaultCatchBoundary {...props} />;
  },
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <Toaster />
    </React.Fragment>
  );
}
