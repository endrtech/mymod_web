"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { permanentRedirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigateToAuthPage = () => {
    return permanentRedirect(
      `http${process.env.NEXT_PUBLIC_DEV_MODE === "true" ? "" : "s"}://${
        process.env.NEXT_PUBLIC_ENDR_ID_AUTH_URL
      }/oauth/authorize?clientId=${process.env.NEXT_PUBLIC_ENDR_ID_APP_ID}`
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your ENDR ID</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div>
                <Button variant="outline" className="w-full">
                  <SignInButton forceRedirectUrl="/portal">
                    Login with ENDR ID
                  </SignInButton>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="https://endr.com.au/legal/terms">Terms of Service</a> and{" "}
        <a href="https://endr.com.au/legal/privacy">Privacy Policy</a>.
      </div>
    </div>
  );
}
