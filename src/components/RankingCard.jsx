import { formatNumber } from '../utils/formatters';
import classNames from '../utils/classNames';

const podiumConfig = [
  {
    order: 'order-2',
    padding: 'pt-8 pb-6',
    avatarSize: 'h-20 w-20 text-2xl',
    avatarGradient: 'bg-gradient-to-br from-amber-400 to-yellow-600',
    ringClass: 'ring-4 ring-amber-400/40',
    nameColor: 'text-amber-100',
    valueColor: 'text-amber-400',
    rankColor: 'text-amber-400',
    innerBg: 'bg-[#161208]',
    shimmer: 'podium-shimmer-gold',
    glow: 'podium-glow-gold',
    medal: '1ST',
    badgeBg: 'bg-amber-400/15 text-amber-400 border border-amber-400/30',
  },
  {
    order: 'order-1',
    padding: 'pt-6 pb-5',
    avatarSize: 'h-16 w-16 text-xl',
    avatarGradient: 'bg-gradient-to-br from-slate-300 to-slate-500',
    ringClass: 'ring-4 ring-slate-400/30',
    nameColor: 'text-slate-200',
    valueColor: 'text-slate-300',
    rankColor: 'text-slate-400',
    innerBg: 'bg-[#10111a]',
    shimmer: 'podium-shimmer-silver',
    glow: '',
    medal: '2ND',
    badgeBg: 'bg-slate-400/15 text-slate-400 border border-slate-400/30',
  },
  {
    order: 'order-3',
    padding: 'pt-6 pb-5',
    avatarSize: 'h-16 w-16 text-xl',
    avatarGradient: 'bg-gradient-to-br from-orange-400 to-amber-700',
    ringClass: 'ring-4 ring-orange-500/30',
    nameColor: 'text-orange-100',
    valueColor: 'text-amber-500',
    rankColor: 'text-orange-400',
    innerBg: 'bg-[#15100a]',
    shimmer: 'podium-shimmer-bronze',
    glow: '',
    medal: '3RD',
    badgeBg: 'bg-orange-400/15 text-orange-400 border border-orange-400/30',
  },
];

const compactStyles = [
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

function CompactLayout({ title, items, onPlayerClick }) {
  return (
    <div className="glass-adaptive border border-[var(--color-border)] rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
      </div>
      <div>
        {items.map((item, i) => {
          const isPodium = i < 3;
          const style = isPodium ? compactStyles[i] : null;

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

function PodiumCard({ item, index, config, title, onPlayerClick }) {
  const initial = item.name.charAt(0).toUpperCase();

  return (
    <div
      className={classNames(
        'relative rounded-2xl overflow-hidden',
        'transition-transform duration-300 hover:scale-[1.03]',
        'w-full max-w-[220px] sm:max-w-none',
        config.order,
        config.shimmer,
        config.glow,
      )}
    >
      {/* Inner card with opaque bg — border shimmer peeks through the 1.5px gap */}
      <div
        className={classNames(
          'relative z-10 flex flex-col items-center rounded-[15px] m-[1.5px]',
          config.padding,
          config.innerBg,
        )}
      >
        {/* Medal badge */}
        <span className={classNames(
          'text-xs font-bold tracking-wider rounded-full px-3 py-1 mb-3',
          config.badgeBg,
        )}>
          {config.medal}
        </span>

        {/* Avatar circle */}
        <div className={classNames(
          'flex items-center justify-center rounded-full font-bold mb-3',
          config.avatarSize,
          config.avatarGradient,
          config.ringClass,
        )}>
          <span className="text-white drop-shadow-md">{initial}</span>
        </div>

        {/* Player name */}
        <button
          onClick={() => onPlayerClick(item.name)}
          className={classNames(
            'text-sm font-semibold hover:underline transition-colors cursor-pointer bg-transparent border-none p-0 text-center',
            config.nameColor,
          )}
        >
          {item.name}
        </button>

        {/* Stat value */}
        <span className={classNames(
          'font-mono text-2xl font-bold mt-1.5 tabular-nums',
          config.valueColor,
        )}>
          {formatNumber(item.value)}
        </span>

        {/* Category label */}
        <span className="text-[11px] text-[var(--color-text-muted)] mt-1 uppercase tracking-wider">
          {title}
        </span>
      </div>
    </div>
  );
}

function FullLayout({ title, items, onPlayerClick }) {
  const podiumItems = items.slice(0, 3);
  const restItems = items.slice(3);

  return (
    <div className="space-y-6">
      {/* Podium section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 sm:gap-5 px-2">
        {podiumItems.map((item, i) => (
          <PodiumCard
            key={item.name}
            item={item}
            index={i}
            config={podiumConfig[i]}
            title={title}
            onPlayerClick={onPlayerClick}
          />
        ))}
      </div>

      {/* Rest of rankings */}
      {restItems.length > 0 && (
        <div className="glass-adaptive border border-[var(--color-border)] rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
            <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              Rank 4–{items.length}
            </span>
          </div>
          <div>
            {restItems.map((item, i) => {
              const rank = i + 4;
              const initial = item.name.charAt(0).toUpperCase();

              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-border)] hover:bg-[var(--color-bg-card-hover)] transition-colors first:border-t-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold w-6 text-center text-[var(--color-text-muted)]">
                      {rank}
                    </span>
                    <span className="flex items-center justify-center h-7 w-7 rounded-full bg-[var(--color-bg-elevated)] text-[10px] font-semibold text-[var(--color-text-secondary)] shrink-0">
                      {initial}
                    </span>
                    <button
                      onClick={() => onPlayerClick(item.name)}
                      className="text-sm text-violet-400 hover:text-violet-300 hover:underline font-medium transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                    >
                      {item.name}
                    </button>
                  </div>
                  <span className="font-mono text-sm text-[var(--color-text-primary)]">
                    {formatNumber(item.value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RankingCard({ title, items, onPlayerClick, compact = false }) {
  if (compact) {
    return <CompactLayout title={title} items={items} onPlayerClick={onPlayerClick} />;
  }
  return <FullLayout title={title} items={items} onPlayerClick={onPlayerClick} />;
}
