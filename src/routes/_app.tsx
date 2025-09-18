import { AppSidebar } from "@/components/nav/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import { Authenticated, useQuery } from "convex/react";
import { ProjectCreation } from "@/components/project-creation";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function ForceProjectCreation() {
  const projects = useQuery(api.projects.findMany, {});
  return (
    <SidebarInset>
      {projects?.length ? <Outlet /> : <ProjectCreation />}
    </SidebarInset>
  );
}

function RouteComponent() {
  return (
    <Authenticated>
      <SidebarProvider>
        <AppSidebar />
        <ForceProjectCreation />
      </SidebarProvider>
    </Authenticated>
  );
}
