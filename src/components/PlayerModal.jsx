import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getPlayerDetails } from '../data/dataUtils';
import { formatNumber } from '../utils/formatters';
import PlayerDamageSparkline from './charts/PlayerDamageSparkline';

export default function PlayerModal({ playerName, onClose }) {
  const player = getPlayerDetails(playerName);

  if (!player) return null;

  const avgDamage = Math.round(player.total_damage / player.games_played);
  const avgKills = (player.total_defeats / player.games_played).toFixed(1);
  const avgAssists = (player.total_assists / player.games_played).toFixed(1);

  const statItems = [
    { label: 'Matches Played', value: player.games_played },
    { label: 'Total Damage', value: formatNumber(player.total_damage), highlight: true },
    { label: 'Avg Damage', value: formatNumber(avgDamage) },
    { label: 'Total Kills', value: player.total_defeats },
    { label: 'Total Assists', value: player.total_assists },
    { label: 'Total Deaths', value: player.total_deaths },
    { label: 'Total Healing', value: formatNumber(player.total_heal) },
    { label: 'Total Tank', value: formatNumber(player.total_tank) },
    { label: 'Total Siege', value: formatNumber(player.total_siege) },
    { label: 'Avg Kills', value: avgKills },
    { label: 'Avg Assists', value: avgAssists },
    { label: 'K/D Ratio', value: player.total_deaths > 0 ? (player.total_defeats / player.total_deaths).toFixed(2) : player.total_defeats.toFixed(2) },
  ];

  const sortedGames = [...player.games].sort((a, b) => a.game_num - b.game_num);

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl glass-strong border border-[var(--color-border)] shadow-2xl transition-all data-[closed]:opacity-0 data-[closed]:scale-95 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in"
          >
            <div className="sticky top-0 bg-[var(--color-bg-card)] border-b border-[var(--color-border)] px-6 py-4 flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-[var(--color-text-primary)]">{playerName}</DialogTitle>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 max-h-[calc(85vh-4rem)] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                {statItems.map(s => (
                  <div key={s.label} className="bg-[var(--color-bg-card)] rounded-lg p-3 text-center">
                    <div className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-wider mb-1">{s.label}</div>
                    <div className={`font-mono font-bold text-sm ${s.highlight ? 'text-violet-400' : 'text-[var(--color-text-primary)]'}`}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6 rounded-lg bg-[var(--color-bg-card)] p-3">
                <div className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-wider mb-2">Damage Trend</div>
                <PlayerDamageSparkline playerName={playerName} />
              </div>

              <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Match History</h3>
              <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
                      <th className="px-3 py-2 text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Match</th>
                      <th className="px-3 py-2 text-center text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Result</th>
                      <th className="px-3 py-2 text-right text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Kills</th>
                      <th className="px-3 py-2 text-right text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Assists</th>
                      <th className="px-3 py-2 text-right text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Deaths</th>
                      <th className="px-3 py-2 text-right text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Damage</th>
                      <th className="px-3 py-2 text-right text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Healing</th>
                      <th className="px-3 py-2 text-right text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Siege</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedGames.map(g => (
                      <tr key={g.game_num} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-card-hover)] transition-colors">
                        <td className="px-3 py-2 text-[var(--color-text-secondary)] text-xs">{g.date}</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`font-bold text-xs uppercase ${g.result === 'win' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {g.result}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right font-mono">{g.defeated}</td>
                        <td className="px-3 py-2 text-right font-mono">{g.assist}</td>
                        <td className="px-3 py-2 text-right font-mono">{g.deaths}</td>
                        <td className="px-3 py-2 text-right font-mono text-violet-400">{formatNumber(g.damage)}</td>
                        <td className="px-3 py-2 text-right font-mono">{formatNumber(g.heal)}</td>
                        <td className="px-3 py-2 text-right font-mono">{formatNumber(g.siege_damage)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
