import { useState, useMemo } from 'react';
import PageHeader from '../layout/PageHeader';
import { getAllPlayers } from '../../data/dataUtils';
import classNames from '../../utils/classNames';

const badgeCategories = [
  { key: 'total_damage', label: 'Damage Leader', bg: 'bg-violet-500/15', text: 'text-violet-400', glow: 'var(--glow-violet)' },
  { key: 'total_defeats', label: 'Ruthless Killer', bg: 'bg-red-500/15', text: 'text-red-400', glow: 'var(--glow-red)' },
  { key: 'total_assists', label: 'Highest Assists', bg: 'bg-purple-500/15', text: 'text-purple-400', glow: 'var(--glow-purple)' },
  { key: 'total_heal', label: 'Greatest Lifesaver', bg: 'bg-emerald-500/15', text: 'text-emerald-400', glow: 'var(--glow-green)' },
  { key: 'total_tank', label: 'Top Tank', bg: 'bg-blue-500/15', text: 'text-blue-400', glow: 'var(--glow-blue)' },
  { key: 'total_siege', label: 'Top Siege Master', bg: 'bg-amber-500/15', text: 'text-amber-400', glow: 'var(--glow-amber)' },
];

export default function TeamPage({ searchQuery, onPlayerClick }) {
  const [matchFilter, setMatchFilter] = useState(null);
  const allPlayers = useMemo(() => getAllPlayers(), []);

  const matchCounts = useMemo(() => {
    const counts = new Set(allPlayers.map(p => p.games_played));
    return [...counts].sort((a, b) => a - b);
  }, [allPlayers]);

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
    let filtered = allPlayers;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
    }
    if (matchFilter !== null) {
      filtered = filtered.filter(p => p.games_played === matchFilter);
    }
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [allPlayers, searchQuery, matchFilter]);

  return (
    <div>
      <PageHeader title="Team" subtitle="All guild members and their stats" />
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <button
          onClick={() => setMatchFilter(null)}
          className={classNames(
            'px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer',
            matchFilter === null
              ? 'bg-violet-500/20 text-violet-400 border-violet-500/40'
              : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)]',
          )}
        >
          All
        </button>
        {matchCounts.map(count => (
          <button
            key={count}
            onClick={() => setMatchFilter(count)}
            className={classNames(
              'px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer',
              matchFilter === count
                ? 'bg-violet-500/20 text-violet-400 border-violet-500/40'
                : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)]',
            )}
          >
            {count} {count === 1 ? 'match' : 'matches'}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 max-w-2xl mx-auto">
        {players.map(player => (
          <button
            key={player.name}
            onClick={() => onPlayerClick(player.name)}
            className="flex items-center gap-3 glass-adaptive glass-adaptive-hover border border-[var(--color-border)] rounded-xl px-4 py-3 cursor-pointer text-left bg-transparent w-full"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-400 text-white font-bold text-sm shrink-0">
              {player.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-[var(--color-text-primary)] truncate shrink-0">
              {player.name}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] shrink-0">
              {player.games_played} {player.games_played === 1 ? 'match' : 'matches'}
            </span>
            {badges[player.name] && (
              <div className="flex flex-wrap gap-1.5 ml-auto">
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
          </button>
        ))}
        {players.length === 0 && (
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            No players found
          </div>
        )}
      </div>
    </div>
  );
}
