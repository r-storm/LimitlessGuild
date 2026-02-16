import { useMemo } from 'react';
import SortableTable from './SortableTable';
import { getAllPlayersSorted } from '../data/dataUtils';

const columns = [
  { key: 'name', label: 'Player', align: 'left' },
  { key: 'games_played', label: 'Matches Played', align: 'left' },
  { key: 'total_damage', label: 'Damage', align: 'left' },
  { key: 'total_defeats', label: 'Kills', align: 'left' },
  { key: 'total_assists', label: 'Assists', align: 'left' },
  { key: 'total_deaths', label: 'Deaths', align: 'left' },
  { key: 'total_heal', label: 'Healing', align: 'left' },
  { key: 'total_tank', label: 'Tank', align: 'left' },
  { key: 'total_siege', label: 'Siege', align: 'left' },
];

const badgeCategories = [
  { key: 'total_damage', label: 'Damage Leader', tableLabel: 'DMG', bg: 'bg-violet-500/15', text: 'text-violet-400', glow: 'var(--glow-violet)' },
  { key: 'total_defeats', label: 'Ruthless Killer', tableLabel: 'KILLS', bg: 'bg-red-500/15', text: 'text-red-400', glow: 'var(--glow-red)' },
  { key: 'total_assists', label: 'Highest Assists', tableLabel: 'AST', bg: 'bg-purple-500/15', text: 'text-purple-400', glow: 'var(--glow-purple)' },
  { key: 'total_heal', label: 'Greatest Lifesaver', tableLabel: 'HEAL', bg: 'bg-emerald-500/15', text: 'text-emerald-400', glow: 'var(--glow-green)' },
  { key: 'total_tank', label: 'Top Tank', tableLabel: 'TANK', bg: 'bg-blue-500/15', text: 'text-blue-400', glow: 'var(--glow-blue)' },
  { key: 'total_siege', label: 'Top Siege Master', tableLabel: 'SIEGE', bg: 'bg-amber-500/15', text: 'text-amber-400', glow: 'var(--glow-amber)' },
];

export default function AllPlayersTable({ onPlayerClick }) {
  const data = useMemo(() => getAllPlayersSorted(), []);

  const badges = useMemo(() => {
    const map = {};
    for (const cat of badgeCategories) {
      let best = null;
      for (const p of data) {
        if (!best || p[cat.key] > best[cat.key]) best = p;
      }
      if (best && best[cat.key] > 0) {
        if (!map[best.name]) map[best.name] = [];
        map[best.name].push({ label: cat.label, bg: cat.bg, text: cat.text, glow: cat.glow });
      }
    }
    return map;
  }, [data]);

  return (
    <div>
      <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">All Players (Totals)</h3>
      <SortableTable
        columns={columns}
        data={data}
        onPlayerClick={onPlayerClick}
        badges={badges}
      />
    </div>
  );
}
