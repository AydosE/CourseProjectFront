import { Skeleton } from "./skeleton";

export default function SkeletonForm() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-6 w-1/3 mt-6" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-10 w-32 mt-4" />
    </div>
  );
}
