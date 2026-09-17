"use client";

import { Check, Loader2 } from "lucide-react";

import { SourceIcon } from "@/components/source-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ConnectionStatus } from "@/lib/connectors";

type ConnectorCardProps = {
  id: string;
  name: string;
  description: string;
  status: ConnectionStatus;
  /** Mock relative timestamp, e.g. "just now". */
  connectedLabel?: string;
  onConnect: () => void;
};

export function ConnectorCard({
  id,
  name,
  description,
  status,
  connectedLabel,
  onConnect,
}: ConnectorCardProps) {
  const isConnected = status === "connected";

  return (
    <Card
      className={`flex flex-col transition-shadow hover:shadow-lift ${
        isConnected ? "ring-1 ring-mint/30" : ""
      }`}
    >
      <CardHeader className="flex items-start gap-3 pb-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50">
          <SourceIcon id={id} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg text-navy">{name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-navy/60">
            {description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="mt-auto">
        {isConnected ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Badge variant="mint">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Connected
            </Badge>
            <span className="text-xs text-navy/45">{connectedLabel}</span>
          </div>
        ) : (
          <Button
            variant="secondary"
            onClick={onConnect}
            disabled={status === "connecting"}
            aria-label={`Connect ${name}`}
            className="w-full sm:w-auto"
          >
            {status === "connecting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Connecting…
              </>
            ) : (
              "Connect"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function ComingSoonCard({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}) {
  return (
    <Card
      aria-disabled="true"
      className="flex flex-col border-dashed bg-white/60 shadow-none"
    >
      <CardHeader className="flex items-start gap-3 pb-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy/25">
          <SourceIcon id={id} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg text-navy/40">{name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-navy/35">
            {description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <Badge variant="neutral">Coming soon</Badge>
      </CardContent>
    </Card>
  );
}
