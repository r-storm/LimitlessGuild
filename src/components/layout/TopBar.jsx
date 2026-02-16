import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function TopBar({ onMenuClick, onSearchClick }) {
  return (
    <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-[var(--color-border)] glass-floating px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden -m-2 p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={onSearchClick}
          className="relative max-w-md flex-1 flex items-center gap-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] py-1.5 px-3 text-sm text-[var(--color-text-muted)] hover:border-violet-400/40 transition-colors cursor-pointer text-left"
        >
          <MagnifyingGlassIcon className="h-4 w-4 shrink-0" />
          <span className="flex-1">Search players...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-1.5 py-0.5 text-[10px] font-mono">
            Ctrl K
          </kbd>
        </button>
      </div>
    </div>
  );
}
