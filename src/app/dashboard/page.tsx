"use client";

import { useEffect, useReducer, useRef, useState } from "react";

import { ComingSoonCard, ConnectorCard } from "@/components/connector-card";
import { IngestionPanel, type IngestedItem } from "@/components/ingestion-panel";
import { TopBar } from "@/components/top-bar";
import {
  COMING_SOON_CONNECTORS,
  LIVE_CONNECTORS,
  type ConnectionStatus,
  type ConnectorId,
} from "@/lib/connectors";
import { formatRelative } from "@/lib/time";

/** Simulated timings for the mock connect + ingest flow. */
const CONNECT_MS = 1400;
const INGEST_MS = 2800;

type ConnectorState = { status: ConnectionStatus; connectedAt?: number };

type State = {
  connectors: Record<ConnectorId, ConnectorState>;
  /** Sources with a mock sync in flight. */
  syncing: ConnectorId[];
  /** Sources whose mock ingestion has resolved, in completion order. */
  indexed: ConnectorId[];
};

type Action =
  | { type: "connect_start"; id: ConnectorId }
  | { type: "connect_done"; id: ConnectorId; at: number }
  | { type: "ingest_done"; id: ConnectorId };

const initialState: State = {
  connectors: {
    confluence: { status: "disconnected" },
    github: { status: "disconnected" },
  },
  syncing: [],
  indexed: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "connect_start":
      return {
        ...state,
        connectors: {
          ...state.connectors,
          [action.id]: { status: "connecting" },
        },
      };

    case "connect_done":
      return {
        ...state,
        connectors: {
          ...state.connectors,
          [action.id]: { status: "connected", connectedAt: action.at },
        },
        syncing: [...state.syncing, action.id],
      };

    case "ingest_done":
      return {
        ...state,
        syncing: state.syncing.filter((id) => id !== action.id),
        indexed: [...state.indexed, action.id],
      };

    default:
      return state;
  }
}

export default function DashboardPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [now, setNow] = useState(() => Date.now());
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Keep the mock relative timestamps ("just now" → "1 min ago") moving.
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function handleConnect(id: ConnectorId) {
    dispatch({ type: "connect_start", id });

    timers.current.push(
      setTimeout(() => {
        dispatch({ type: "connect_done", id, at: Date.now() });
        setNow(Date.now());

        timers.current.push(
          setTimeout(() => dispatch({ type: "ingest_done", id }), INGEST_MS),
        );
      }, CONNECT_MS),
    );
  }

  const connectorById = Object.fromEntries(
    LIVE_CONNECTORS.map((connector) => [connector.id, connector]),
  ) as Record<ConnectorId, (typeof LIVE_CONNECTORS)[number]>;

  const syncingSources = state.syncing.map((id) => connectorById[id].name);

  const ingestedItems: IngestedItem[] = state.indexed.map((id) => {
    const connector = connectorById[id];
    const connectedAt = state.connectors[id].connectedAt ?? now;

    return {
      id,
      sourceName: connector.name,
      summary: `${connector.ingest.count} ${connector.ingest.unit} indexed from ${connector.name}`,
      timestamp: formatRelative(connectedAt, now),
    };
  });

  const hasConnection = state.syncing.length > 0 || state.indexed.length > 0;

  return (
    <div className="min-h-dvh bg-offwhite">
      <TopBar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="max-w-2xl">
          <h1 className="font-serif text-2xl text-navy sm:text-3xl">
            Connect your knowledge sources
          </h1>
          <p className="mt-2.5 text-[15px] leading-relaxed text-navy/60">
            Link the systems your teams already work in. Content is indexed into
            your private vector store and stays inside your tenant boundary.
          </p>
        </div>

        <section aria-label="Available connectors" className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LIVE_CONNECTORS.map((connector) => {
              const connectorState = state.connectors[connector.id];

              return (
                <ConnectorCard
                  key={connector.id}
                  id={connector.id}
                  name={connector.name}
                  description={connector.description}
                  status={connectorState.status}
                  connectedLabel={
                    connectorState.connectedAt
                      ? formatRelative(connectorState.connectedAt, now)
                      : undefined
                  }
                  onConnect={() => handleConnect(connector.id)}
                />
              );
            })}

            {COMING_SOON_CONNECTORS.map((connector) => (
              <ComingSoonCard key={connector.id} {...connector} />
            ))}
          </div>
        </section>

        {hasConnection && (
          <section aria-label="Ingestion status" className="mt-8 sm:mt-10">
            <IngestionPanel
              syncingSources={syncingSources}
              items={ingestedItems}
            />
          </section>
        )}
      </main>
    </div>
  );
}
