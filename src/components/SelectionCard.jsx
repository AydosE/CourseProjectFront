export default function SectionCard({ title, actions, children }) {
  return (
    <section className="rounded-lg border bg-background dark:bg-neutral-900 shadow-sm px-4 py-5 sm:px-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
}
