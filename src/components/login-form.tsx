"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Prototype sign-in: there is no credential check and no session. Any
 * non-empty username and password navigates to the dashboard.
 */
export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Enter both a username and a password to continue.");
      return;
    }

    setError("");
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-navy/75"
        >
          Username
        </label>
        <Input
          id="username"
          name="username"
          autoComplete="username"
          placeholder="a.rivera@acme.com"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-navy/75"
          >
            Password
          </label>
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            className="text-xs font-medium text-teal hover:text-teal-700 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-[#B3261E]">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full">
        Log in
      </Button>
    </form>
  );
}
