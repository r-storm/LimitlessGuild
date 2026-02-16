export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h1>
      {subtitle && (
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
      )}
    </div>
  );
}
