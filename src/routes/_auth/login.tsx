import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoginForm, LoginValues } from "@/components/login-form";
import { GalleryVerticalEnd } from "lucide-react";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";

const searchSchema = z.object({
  redirect: z.string().catch("/"),
});

export type LoginSearch = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [isSubmitting, startTransition] = useTransition();
  async function onSubmit(values: LoginValues) {
    startTransition(async () => {
      const result = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });
      if (result.error) {
        toast.error(result.error.message);
      } else {
        void navigate({
          to: redirect,
        });
      }
    });
    return;
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm
          submit={onSubmit}
          search={{ redirect }}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
