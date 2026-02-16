import { useMemo } from 'react';
import PageHeader from '../layout/PageHeader';
import { getAllPlayers } from '../../data/dataUtils';
import { formatNumber } from '../../utils/formatters';

export default function TeamPage({ searchQuery, onPlayerClick }) {
  const players = useMemo(() => {
    const all = getAllPlayers();
    if (!searchQuery) return all;
    const q = searchQuery.toLowerCase();
    return all.filter(p => p.name.toLowerCase().includes(q));
  }, [searchQuery]);

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
