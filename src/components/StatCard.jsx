import { formatNumber } from '../utils/formatters';
import classNames from '../utils/classNames';

const accentMap = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'var(--glow-blue)' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'var(--glow-violet)' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', glow: 'var(--glow-purple)' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'var(--glow-amber)' },
  red: { bg: 'bg-red-500/10', text: 'text-red-400', glow: 'var(--glow-red)' },
  green: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'var(--glow-green)' },
};

export default function StatCard({ label, value, numeric = true, icon: Icon, accent = 'blue' }) {
  const a = accentMap[accent] || accentMap.blue;

  return (
    <div className="glass-adaptive border border-[var(--color-border)] rounded-xl p-4 flex items-center gap-4">
      {Icon && (
        <div
          className={classNames('flex h-10 w-10 items-center justify-center rounded-lg shrink-0', a.bg)}
          style={{ boxShadow: a.glow }}
        >
          <Icon className={classNames('h-5 w-5', a.text)} />
        </div>
      )}
      <div className={Icon ? '' : 'text-center w-full'}>
        <div className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider mb-0.5">{label}</div>
        <div className={classNames(
          'text-lg font-bold text-[var(--color-text-primary)]',
          numeric ? 'font-mono' : '',
        )}>
          {numeric ? formatNumber(value) : value}
        </div>
      </div>
    </div>
  );
}
