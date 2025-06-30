export default function SectionCard({ title, actions, children }) {
  return (
    <div className="rounded-md border bg-background shadow-sm p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base sm:text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
