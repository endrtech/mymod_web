import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <form>
            <div className="grid gap-6">
              <div>
                <Link href={`http${process.env.NEXT_PUBLIC_DEV_MODE === "true" ? "" : "s"}://${process.env.NEXT_PUBLIC_ENDR_ID_AUTH_URL}/oauth/authorize?clientId=${process.env.NEXT_PUBLIC_ENDR_ID_APP_ID}`}>
                <Button variant="outline" className="w-full">
                  Login with ENDR ID
                </Button>
                </Link>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href={`http${process.env.NEXT_PUBLIC_DEV_MODE === "true" ? "" : "s"}://${process.env.NEXT_PUBLIC_ENDR_ID_AUTH_URL}/oauth/sign-up?clientId=${process.env.NEXT_PUBLIC_ENDR_ID_APP_ID}`} className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="https://endr.tech/legal/terms">Terms of Service</a>{" "}
        and <a href="https://endr.tech/legal/privacy">Privacy Policy</a>.
      </div>
    </div>
  )
}
