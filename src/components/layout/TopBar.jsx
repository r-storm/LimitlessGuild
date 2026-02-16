import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function TopBar({ onMenuClick, searchQuery, onSearchChange }) {
  return (
    <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-[var(--color-border)] glass-floating px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden -m-2 p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <div className="flex flex-1 items-center gap-3">
        <div className="relative max-w-md flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] py-1.5 pl-9 pr-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-violet-400/40 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
