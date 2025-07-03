export default function FormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white dark:bg-neutral-900 rounded-lg shadow space-y-6 animate-pulse">
      <Skeleton className="h-6 w-2/3" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-32" />
    </div>
  );
}
