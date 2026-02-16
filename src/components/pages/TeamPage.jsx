import { useMemo } from 'react';
import PageHeader from '../layout/PageHeader';
import { getAllPlayers } from '../../data/dataUtils';
import { formatNumber } from '../../utils/formatters';

const badgeCategories = [
  { key: 'total_damage', label: 'Damage Leader', bg: 'bg-violet-500/15', text: 'text-violet-400', glow: 'var(--glow-violet)' },
  { key: 'total_defeats', label: 'Ruthless Killer', bg: 'bg-red-500/15', text: 'text-red-400', glow: 'var(--glow-red)' },
  { key: 'total_assists', label: 'Highest Assists', bg: 'bg-purple-500/15', text: 'text-purple-400', glow: 'var(--glow-purple)' },
  { key: 'total_heal', label: 'Greatest Lifesaver', bg: 'bg-emerald-500/15', text: 'text-emerald-400', glow: 'var(--glow-green)' },
  { key: 'total_tank', label: 'Top Tank', bg: 'bg-blue-500/15', text: 'text-blue-400', glow: 'var(--glow-blue)' },
  { key: 'total_siege', label: 'Top Siege Master', bg: 'bg-amber-500/15', text: 'text-amber-400', glow: 'var(--glow-amber)' },
];

export default function TeamPage({ searchQuery, onPlayerClick }) {
  const allPlayers = useMemo(() => getAllPlayers(), []);

  const badges = useMemo(() => {
    const map = {};
    for (const cat of badgeCategories) {
      let best = null;
      for (const p of allPlayers) {
        if (!best || p[cat.key] > best[cat.key]) best = p;
      }
      if (best && best[cat.key] > 0) {
        if (!map[best.name]) map[best.name] = [];
        map[best.name].push({ label: cat.label, bg: cat.bg, text: cat.text, glow: cat.glow });
      }
    }
    return map;
  }, [allPlayers]);

  const players = useMemo(() => {
    if (!searchQuery) return allPlayers;
    const q = searchQuery.toLowerCase();
    return allPlayers.filter(p => p.name.toLowerCase().includes(q));
  }, [allPlayers, searchQuery]);

  return (
    <div>
      <PageHeader title="Team" subtitle="All guild members and their stats" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {players.map(player => {
          const avgDamage = Math.round(player.total_damage / player.games_played);

          return (
            <div
              key={player.name}
              className="glass-adaptive glass-adaptive-hover border border-[var(--color-border)] rounded-xl p-5 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-400 text-white font-bold text-sm shrink-0">
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <button
                    onClick={() => onPlayerClick(player.name)}
                    className="text-sm font-semibold text-[var(--color-text-primary)] hover:text-violet-400 transition-colors cursor-pointer bg-transparent border-none p-0 text-left truncate block max-w-full"
                  >
                    {player.name}
                  </button>
                  <p className="text-xs text-[var(--color-text-muted)]">{player.games_played} matches played</p>
                </div>
              </div>
              {badges[player.name] && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {badges[player.name].map(b => (
                    <span
                      key={b.label}
                      className={`${b.bg} ${b.text} text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-current/20`}
                      style={{ boxShadow: b.glow }}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[var(--color-bg-elevated)] rounded-lg p-2 text-center">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Avg Dmg</div>
                  <div className="font-mono text-sm font-bold text-[var(--color-text-primary)]">{formatNumber(avgDamage)}</div>
                </div>
                <div className="bg-[var(--color-bg-elevated)] rounded-lg p-2 text-center">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Kills</div>
                  <div className="font-mono text-sm font-bold text-[var(--color-text-primary)]">{formatNumber(player.total_defeats)}</div>
                </div>
                <div className="bg-[var(--color-bg-elevated)] rounded-lg p-2 text-center">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Deaths</div>
                  <div className="font-mono text-sm font-bold text-[var(--color-text-primary)]">{formatNumber(player.total_deaths)}</div>
                </div>
                <div className="bg-[var(--color-bg-elevated)] rounded-lg p-2 text-center">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Healing</div>
                  <div className="font-mono text-sm font-bold text-[var(--color-text-primary)]">{formatNumber(player.total_heal)}</div>
                </div>
              </div>
            </div>
          );
        })}
        {players.length === 0 && (
          <div className="col-span-full text-center py-12 text-[var(--color-text-muted)]">
            No players found
          </div>
        )}
      </div>
    </div>
  );
}
