import { useState, useMemo } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getPlayerDetails } from '../data/dataUtils';
import { formatNumber } from '../utils/formatters';
import { PlayerStatSparkline } from './charts/PlayerDamageSparkline';
import classNames from '../utils/classNames';
import ClassIcon from './ClassIcon';

function StatGroup({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {children}
      </div>
    </div>
  );
}

function StatCell({ label, value, highlight }) {
  return (
    <div className="bg-[var(--color-bg-card)] rounded-xl p-4 text-center">
      <div className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider mb-1.5">{label}</div>
      <div className={`font-mono font-bold text-lg ${highlight ? 'text-violet-400' : 'text-[var(--color-text-primary)]'}`}>
        {value}
      </div>
    </div>
  );
}

const TREND_TABS = [
  { key: 'damage', label: 'Damage', stat: 'damage', color: '139, 92, 246', always: true },
  { key: 'heal', label: 'Healing', stat: 'heal', color: '52, 211, 153', totalKey: 'total_heal' },
  { key: 'tank', label: 'Tank', stat: 'tank', color: '59, 130, 246', totalKey: 'total_tank' },
  { key: 'siege', label: 'Siege', stat: 'siege_damage', color: '251, 191, 36', totalKey: 'total_siege' },
];

function TrendTabs({ playerName, player }) {
  const availableTabs = useMemo(
    () => TREND_TABS.filter(t => t.always || player[t.totalKey] > 0),
    [player],
  );
  const [activeTab, setActiveTab] = useState('damage');
  const current = availableTabs.find(t => t.key === activeTab) || availableTabs[0];

  return (
    <div className="rounded-xl bg-[var(--color-bg-card)] p-4">
      <div className="flex items-center gap-1.5 mb-4">
        {availableTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={classNames(
              'px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer',
              tab.key === current.key
                ? 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <PlayerStatSparkline playerName={playerName} stat={current.stat} color={current.color} />
    </div>
  );
}

export default function PlayerModal({ playerName, onClose }) {
  const player = getPlayerDetails(playerName);

  if (!player) return null;

  const avgDamage = Math.round(player.total_damage / player.games_played);
  const avgKills = (player.total_defeats / player.games_played).toFixed(1);
  const avgAssists = (player.total_assists / player.games_played).toFixed(1);
  const kdRatio = player.total_deaths > 0
    ? (player.total_defeats / player.total_deaths).toFixed(2)
    : player.total_defeats.toFixed(2);

  const hasHealing = player.total_heal > 0;
  const hasTank = player.total_tank > 0;
  const hasSiege = player.total_siege > 0;

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
            className="relative w-full max-w-6xl transform overflow-hidden rounded-2xl glass-strong border border-[var(--color-border)] shadow-2xl transition-all data-[closed]:opacity-0 data-[closed]:scale-95 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in"
          >
            <div className="sticky top-0 bg-[var(--color-bg-card)] border-b border-[var(--color-border)] px-8 py-5 flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <ClassIcon playerName={playerName} size={22} />
                {playerName}
              </DialogTitle>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 max-h-[calc(90vh-5rem)] overflow-y-auto space-y-8">
              {/* Stats Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left column */}
                <div className="space-y-6">
                  <StatGroup title="Damage">
                    <StatCell label="Total Damage" value={formatNumber(player.total_damage)} highlight />
                    <StatCell label="Avg Damage" value={formatNumber(avgDamage)} highlight />
                    <StatCell label="Matches" value={player.games_played} />
                  </StatGroup>

                  <StatGroup title="Combat">
                    <StatCell label="Kills" value={player.total_defeats} />
                    <StatCell label="Assists" value={player.total_assists} />
                    <StatCell label="Deaths" value={player.total_deaths} />
                    <StatCell label="Avg Kills" value={avgKills} />
                    <StatCell label="Avg Assists" value={avgAssists} />
                    <StatCell label="K/D Ratio" value={kdRatio} />
                  </StatGroup>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                  {(hasHealing || hasTank || hasSiege) && (
                    <StatGroup title="Support">
                      {hasHealing && <StatCell label="Healing" value={formatNumber(player.total_heal)} />}
                      {hasTank && <StatCell label="Tank" value={formatNumber(player.total_tank)} />}
                      {hasSiege && <StatCell label="Siege" value={formatNumber(player.total_siege)} />}
                    </StatGroup>
                  )}

                  {/* Tabbed Trend Chart */}
                  <div>
                    <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Trends</h3>
                    <TrendTabs playerName={playerName} player={player} />
                  </div>
                </div>
              </div>

              {/* Match History */}
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">Match History</h3>
                <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
                  <table className="w-full text-base">
                    <thead>
                      <tr className="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
                        <th className="px-4 py-3 text-left text-[var(--color-text-muted)] text-sm uppercase tracking-wider">Match</th>
                        <th className="px-4 py-3 text-center text-[var(--color-text-muted)] text-sm uppercase tracking-wider">Result</th>
                        <th className="px-4 py-3 text-right text-[var(--color-text-muted)] text-sm uppercase tracking-wider">Kills</th>
                        <th className="px-4 py-3 text-right text-[var(--color-text-muted)] text-sm uppercase tracking-wider">Assists</th>
                        <th className="px-4 py-3 text-right text-[var(--color-text-muted)] text-sm uppercase tracking-wider">Deaths</th>
                        <th className="px-4 py-3 text-right text-[var(--color-text-muted)] text-sm uppercase tracking-wider">Damage</th>
                        <th className="px-4 py-3 text-right text-[var(--color-text-muted)] text-sm uppercase tracking-wider">Healing</th>
                        <th className="px-4 py-3 text-right text-[var(--color-text-muted)] text-sm uppercase tracking-wider">Tank</th>
                        <th className="px-4 py-3 text-right text-[var(--color-text-muted)] text-sm uppercase tracking-wider">Siege</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedGames.map(g => (
                        <tr key={g.game_num} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-card-hover)] transition-colors">
                          <td className="px-4 py-3 text-[var(--color-text-secondary)] text-sm">{g.date}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-bold text-sm uppercase ${g.result === 'win' ? 'text-emerald-400' : 'text-red-400'}`}>
                              {g.result}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-mono">{g.defeated}</td>
                          <td className="px-4 py-3 text-right font-mono">{g.assist}</td>
                          <td className="px-4 py-3 text-right font-mono">{g.deaths}</td>
                          <td className="px-4 py-3 text-right font-mono text-violet-400">{formatNumber(g.damage)}</td>
                          <td className="px-4 py-3 text-right font-mono">{formatNumber(g.heal)}</td>
                          <td className="px-4 py-3 text-right font-mono">{formatNumber(g.tank)}</td>
                          <td className="px-4 py-3 text-right font-mono">{formatNumber(g.siege_damage)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
