import { useMemo } from 'react';
import SortableTable from './SortableTable';
import { getAllPlayersSorted } from '../data/dataUtils';

const columns = [
  { key: 'name', label: 'Player', align: 'left' },
  { key: 'games_played', label: 'MP', align: 'right' },
  { key: 'total_damage', label: 'Damage', align: 'right' },
  { key: 'avg_damage', label: 'Avg Dmg', align: 'right' },
  { key: 'total_defeats', label: 'Kills', align: 'right' },
  { key: 'total_assists', label: 'Assists', align: 'right' },
  { key: 'total_deaths', label: 'Deaths', align: 'right' },
  { key: 'total_heal', label: 'Healing', align: 'right' },
  { key: 'total_tank', label: 'Tank', align: 'right' },
  { key: 'total_siege', label: 'Siege', align: 'right' },
];

export default function AllPlayersTable({ searchQuery, onPlayerClick }) {
  const data = useMemo(() => getAllPlayersSorted(), []);

  return (
    <div>
      <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">All Players</h3>
      <SortableTable
        columns={columns}
        data={data}
        searchQuery={searchQuery}
        onPlayerClick={onPlayerClick}
      />
    </div>
  );
}
