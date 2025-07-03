export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded bg-muted dark:bg-neutral-800/80 ${className}`}
    />
  );
}
