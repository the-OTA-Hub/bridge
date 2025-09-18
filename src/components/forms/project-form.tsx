import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";

import { Label } from "../ui/label";

export function ProjectForm() {
  return (
    <form>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name-1">Name</Label>
          <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username-1">Username</Label>
          <Input id="username-1" name="username" defaultValue="@peduarte" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
}
