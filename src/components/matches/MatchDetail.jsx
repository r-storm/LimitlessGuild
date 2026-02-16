import { useMemo } from 'react';
import StatCard from '../StatCard';
import SortableTable from '../SortableTable';
import { getGamePlayers, getGameSummary } from '../../data/dataUtils';

const columns = [
  { key: 'name', label: 'Player', align: 'left' },
  { key: 'defeated', label: 'Kills', align: 'right' },
  { key: 'assist', label: 'Assists', align: 'right' },
  { key: 'deaths', label: 'Deaths', align: 'right' },
  { key: 'damage', label: 'Damage', align: 'right' },
  { key: 'tank', label: 'Tank', align: 'right' },
  { key: 'heal', label: 'Healing', align: 'right' },
  { key: 'siege_damage', label: 'Siege', align: 'right' },
];

export default function MatchDetail({ gameNum, onPlayerClick }) {
  const summary = useMemo(() => getGameSummary(gameNum), [gameNum]);
  const players = useMemo(() => getGamePlayers(gameNum), [gameNum]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${
            summary.result === 'win'
              ? 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/30'
              : 'bg-red-400/15 text-red-400 border border-red-400/30'
          }`}>
            {summary.result}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${
            summary.type === 'league'
              ? 'bg-blue-400/15 text-blue-400 border border-blue-400/30'
              : 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
          }`}>
            {summary.type}
          </span>
          <span className="text-[var(--color-text-secondary)] text-sm">Match {summary.gameNum} &middot; {summary.date}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Players" value={summary.playerCount} />
          <StatCard label="Total Damage" value={summary.totalDamage} />
          <StatCard label="Total Kills" value={summary.totalKills} />
          <StatCard label="Total Deaths" value={summary.totalDeaths} />
        </div>
      </div>
      <SortableTable
        columns={columns}
        data={players}
        onPlayerClick={onPlayerClick}
      />
    </div>
  );
}
