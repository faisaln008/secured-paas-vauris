import { BrandMark } from "@/components/brand-mark";
import { LoginForm } from "@/components/login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-offwhite px-4 py-10 sm:px-6">
      <div className="w-full max-w-[420px]">
        <div className="flex justify-center">
          <BrandMark />
        </div>

        <Card className="mt-6 shadow-lift sm:mt-8">
          <CardHeader className="pb-2 text-center sm:pb-3">
            <h1 className="font-serif text-2xl text-navy">Sign in</h1>
            <p className="mt-2 text-sm text-navy/60">
              Access your organisation&rsquo;s secured knowledge index.
            </p>
          </CardHeader>

          <CardContent className="pt-4 sm:pt-5">
            <LoginForm />
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-navy/40">
          Prototype only &middot; no credentials are checked or stored
        </p>
      </div>
    </main>
  );
}
