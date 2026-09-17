"use client";

import { Check, Lock, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { BrandMark, PRODUCT_NAME } from "@/components/brand-mark";
import { SourceIcon } from "@/components/source-icon";
import { Button } from "@/components/ui/button";
import type { Connector } from "@/lib/connectors";

type AuthorizeDialogProps = {
  connector: Connector | null;
  onAuthorize: () => void;
  onCancel: () => void;
};

const FOCUSABLE = "button, a[href], input, [tabindex]:not([tabindex='-1'])";

/**
 * Simulated OAuth consent screen. Nothing here contacts a provider — it exists
 * so the demo mirrors the shape of a real authorization handshake.
 */
export function AuthorizeDialog({
  connector,
  onAuthorize,
  onCancel,
}: AuthorizeDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  // Escape cancels, Tab stays inside the dialog, and the page behind it is
  // locked while the dialog is open.
  useEffect(() => {
    if (!connector) return;

    confirmRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [connector, onCancel]);

  if (!connector) return null;

  const titleId = `authorize-${connector.id}-title`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/45 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-fade-up max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white shadow-lift sm:rounded-2xl"
      >
        {/* Mock provider chrome, so the dialog reads as an external consent page. */}
        <div className="flex items-center justify-between gap-3 border-b border-navy/10 bg-navy-50 px-4 py-2.5 sm:px-5">
          <span className="flex min-w-0 items-center gap-2 text-xs text-navy/55">
            <Lock className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden="true" />
            <span className="truncate font-medium">{connector.authHost}</span>
          </span>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancel authorization"
            className="-mr-1 rounded-md p-1 text-navy/45 transition-colors hover:bg-navy/5 hover:text-navy"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-6 sm:px-6">
          <div className="flex items-center justify-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50">
              <SourceIcon id={connector.id} className="h-6 w-6" />
            </span>
            <span aria-hidden="true" className="text-navy/25">
              &middot;&middot;&middot;
            </span>
            <BrandMark showName={false} />
          </div>

          <h2
            id={titleId}
            className="mt-5 text-center font-serif text-xl leading-snug text-navy"
          >
            Authorize {PRODUCT_NAME}
          </h2>
          <p className="mt-2 text-center text-sm leading-relaxed text-navy/60">
            {PRODUCT_NAME} is requesting access to your {connector.name}{" "}
            account.
          </p>

          <div className="mt-5 rounded-xl border border-navy/10 bg-offwhite p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-navy/45">
              This will allow it to
            </p>
            <ul className="mt-3 space-y-2.5">
              {connector.scopes.map((scope) => (
                <li key={scope} className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-mint-700"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-navy/75">
                    {scope}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-navy/45">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[10px] font-medium text-teal-700"
            >
              AR
            </span>
            Signed in as a.rivera@acme.com
          </p>

          <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row">
            <Button
              variant="outline"
              size="lg"
              onClick={onCancel}
              className="w-full sm:flex-1"
            >
              Cancel
            </Button>
            <Button
              ref={confirmRef}
              variant="secondary"
              size="lg"
              onClick={onAuthorize}
              className="w-full sm:flex-1"
            >
              Authorize access
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-navy/35">
            Simulated consent screen &middot; no real account is contacted
          </p>
        </div>
      </div>
    </div>
  );
}
