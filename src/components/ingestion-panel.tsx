"use client";

import { Database, FileCheck2, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SourceIcon } from "@/components/source-icon";

export type IngestedItem = {
  id: string;
  sourceName: string;
  summary: string;
  timestamp: string;
};

type IngestionPanelProps = {
  /** Display names of sources currently being simulated as syncing. */
  syncingSources: string[];
  items: IngestedItem[];
};

export function IngestionPanel({ syncingSources, items }: IngestionPanelProps) {
  const isSyncing = syncingSources.length > 0;
  const [progress, setProgress] = useState(0);

  // Purely cosmetic progress: it climbs while a mock sync is in flight and
  // snaps to 100% when the simulated ingestion resolves.
  useEffect(() => {
    if (!isSyncing) {
      setProgress(100);
      return;
    }

    setProgress(10);
    const interval = setInterval(() => {
      setProgress((value) => (value >= 92 ? 92 : value + Math.random() * 12));
    }, 220);

    return () => clearInterval(interval);
  }, [isSyncing, syncingSources.join(",")]);

  return (
    <Card className="animate-fade-up overflow-hidden">
      <CardHeader className="flex flex-col gap-3 border-b border-navy/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal">
            <Database className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-serif text-lg text-navy">Vector database</h3>
            <p className="mt-1 text-sm text-navy/60">
              Documents are chunked, embedded and indexed in your private tenant.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-navy-50 px-2.5 py-1 text-xs text-navy/55 sm:self-center">
          <ShieldCheck className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
          Encrypted at rest
        </span>
      </CardHeader>

      <CardContent className="pt-5 sm:pt-6">
        {isSyncing ? (
          <div aria-live="polite">
            <div className="flex items-center gap-2 text-sm font-medium text-navy">
              <Loader2 className="h-4 w-4 animate-spin text-teal" aria-hidden="true" />
              Syncing to vector database…
            </div>
            <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-navy-50">
              <div
                className="shimmer relative h-full rounded-full bg-teal transition-[width] duration-200 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="mt-2.5 text-xs text-navy/50">
              Embedding content from {syncingSources.join(" and ")}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm font-medium text-navy">
            <FileCheck2 className="h-4 w-4 text-mint-700" aria-hidden="true" />
            Index up to date
          </div>
        )}

        {items.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {items.map((item) => (
              <li
                key={item.id}
                className="animate-fade-up flex items-center gap-3 rounded-xl border border-navy/10 bg-offwhite px-3.5 py-3"
              >
                <SourceIcon id={item.id} className="h-5 w-5 shrink-0" />
                <p className="min-w-0 text-sm text-navy/75">
                  <span className="font-medium text-navy">{item.summary}</span>
                  <span className="text-navy/45"> · {item.timestamp}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
