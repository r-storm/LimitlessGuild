import { formatNumber } from '../utils/formatters';
import classNames from '../utils/classNames';

const podiumStyles = [
  {
    row: 'bg-amber-500/10 border-l-4 border-l-amber-400',
    badge: 'bg-amber-400 text-amber-950 shadow-amber-400/30 shadow-md',
    name: 'text-amber-100 font-semibold',
    value: 'text-amber-400 font-bold',
  },
  {
    row: 'bg-gray-500/10 border-l-4 border-l-gray-400',
    badge: 'bg-gray-400 text-gray-900 shadow-gray-400/30 shadow-md',
    name: 'text-gray-200 font-semibold',
    value: 'text-gray-300 font-bold',
  },
  {
    row: 'bg-orange-500/10 border-l-4 border-l-amber-600',
    badge: 'bg-amber-600 text-amber-50 shadow-amber-600/30 shadow-md',
    name: 'text-orange-100 font-semibold',
    value: 'text-amber-500 font-bold',
  },
];

export default function RankingCard({ title, items, onPlayerClick }) {
  return (
    <div className="glass-adaptive border border-[var(--color-border)] rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
      </div>
      <div>
        {items.map((item, i) => {
          const isPodium = i < 3;
          const style = isPodium ? podiumStyles[i] : null;

          return (
            <div
              key={item.name}
              className={classNames(
                'flex items-center justify-between px-4 transition-colors',
                isPodium
                  ? classNames(style.row, 'py-2.5')
                  : 'py-2 border-t border-[var(--color-border)] hover:bg-[var(--color-bg-card-hover)]',
              )}
            >
              <div className="flex items-center gap-3">
                {isPodium ? (
                  <span className={classNames(
                    'flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold shrink-0',
                    style.badge,
                  )}>
                    {i + 1}
                  </span>
                ) : (
                  <span className="font-mono text-xs font-bold w-6 text-center text-[var(--color-text-muted)]">
                    {i + 1}
                  </span>
                )}
                <button
                  onClick={() => onPlayerClick(item.name)}
                  className={classNames(
                    'text-sm hover:underline transition-colors cursor-pointer bg-transparent border-none p-0 text-left',
                    isPodium
                      ? style.name
                      : 'text-violet-400 hover:text-violet-300 font-medium',
                  )}
                >
                  {item.name}
                </button>
              </div>
              <span className={classNames(
                'font-mono text-sm',
                isPodium ? style.value : 'text-[var(--color-text-primary)]',
              )}>
                {formatNumber(item.value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
