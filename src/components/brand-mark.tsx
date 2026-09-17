import { cn } from "@/lib/utils";

export const PRODUCT_NAME = "Secured RAG Platform";

/** Placeholder logo: a shield glyph plus the product wordmark. */
export function BrandMark({
  className,
  showName = true,
  tone = "dark",
}: {
  className?: string;
  showName?: boolean;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl",
          tone === "dark" ? "bg-navy" : "bg-white/10",
        )}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M12 2.5 4.5 5.4v6.1c0 4.5 3.1 8.6 7.5 10 4.4-1.4 7.5-5.5 7.5-10V5.4L12 2.5Z"
            fill="#02C39A"
            fillOpacity=".18"
            stroke="#02C39A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="m8.9 11.9 2.2 2.2 4-4.3"
            fill="none"
            stroke="#02C39A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showName && (
        <span
          className={cn(
            "font-serif text-[17px] tracking-tight",
            tone === "dark" ? "text-navy" : "text-white",
          )}
        >
          {PRODUCT_NAME}
        </span>
      )}
    </span>
  );
}
