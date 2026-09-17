/** Mock relative timestamp for the prototype's "Connected" badges. */
export function formatRelative(from: number, now: number) {
  const minutes = Math.floor((now - from) / 60_000);

  if (minutes < 1) return "just now";
  if (minutes === 1) return "1 min ago";
  if (minutes < 60) return `${minutes} mins ago`;

  const hours = Math.floor(minutes / 60);
  return hours === 1 ? "1 hr ago" : `${hours} hrs ago`;
}
