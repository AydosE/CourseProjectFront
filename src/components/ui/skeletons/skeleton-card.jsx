import { Skeleton } from "./skeleton";

export default function SkeletonCard() {
  return (
    <div className="p-4 border rounded-md bg-background shadow space-y-3">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-10 w-full mt-2" />
    </div>
  );
}
