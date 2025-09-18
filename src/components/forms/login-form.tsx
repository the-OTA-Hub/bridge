import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { type LoginSearch } from "@/routes/_auth/login";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginValues = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  submit,
  search,
  isSubmitting,
  ...props
}: React.ComponentProps<"div"> & {
  submit: (values: LoginValues) => Promise<void>;
  search: LoginSearch;
  isSubmitting: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(formSchema as never),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                void form.handleSubmit(submit)(e);
              }}
            >
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="m@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <div className="flex items-center">
                              <FormLabel>Password</FormLabel>
                              <a
                                href="#"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                                tabIndex={-1}
                              >
                                Forgot your password?
                              </a>
                            </div>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  id="password"
                                  type={showPassword ? "text" : "password"}
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 size-6"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOffIcon className="w-4 h-4" />
                                  ) : (
                                    <EyeIcon className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="underline underline-offset-4"
                    search={search}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
