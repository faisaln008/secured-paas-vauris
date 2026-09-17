export type ConnectorId = "confluence" | "github";

export type ConnectionStatus = "disconnected" | "connecting" | "connected";

export interface Connector {
  id: ConnectorId;
  name: string;
  description: string;
  /** Mock ingestion summary shown once the simulated sync finishes. */
  ingest: { count: number; unit: string };
}

export interface ComingSoonConnector {
  id: string;
  name: string;
  description: string;
}

export const LIVE_CONNECTORS: Connector[] = [
  {
    id: "confluence",
    name: "Confluence",
    description: "Index spaces, pages and internal documentation.",
    ingest: { count: 12, unit: "pages" },
  },
  {
    id: "github",
    name: "GitHub",
    description: "Index repositories, READMEs and source files.",
    ingest: { count: 34, unit: "files" },
  },
];

export const COMING_SOON_CONNECTORS: ComingSoonConnector[] = [
  {
    id: "notion",
    name: "Notion",
    description: "Index workspaces, databases and team notes.",
  },
  {
    id: "sharepoint",
    name: "SharePoint",
    description: "Index document libraries and team sites.",
  },
  {
    id: "gdrive",
    name: "Google Drive",
    description: "Index shared drives, docs and spreadsheets.",
  },
];
