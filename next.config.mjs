import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so a lockfile elsewhere on the machine is ignored.
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
