"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

const DEMO_USER = { name: "A. Rivera", initials: "AR" };

export function TopBar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 border-b border-navy/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <BrandMark />

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-sm font-medium text-teal-700"
            >
              {DEMO_USER.initials}
            </span>
            <span className="hidden text-sm text-navy/70 sm:inline">
              {DEMO_USER.name}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/login")}
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
