import { Cpu, MemoryStick, Microchip } from "lucide-react";
import { EmptyState } from "./empty-state";
import { ProjectDialog } from "./dialogs/project-dialog";
import { Button } from "./ui/button";

export function ProjectCreation() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <EmptyState
        title="No projects created"
        description="Create a new project to get started."
        icons={[Microchip, Cpu, MemoryStick]}
        action={
          <ProjectDialog>
            <Button>Create Project</Button>
          </ProjectDialog>
        }
      />
    </div>
  );
}
