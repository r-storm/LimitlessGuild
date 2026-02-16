import {
  ChartBarIcon,
  TrophyIcon,
  BoltIcon,
  FireIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import StatCard from './StatCard';
import { getOverallStats } from '../data/dataUtils';

export default function OverallStatsBar() {
  const stats = getOverallStats();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <StatCard label="Total Matches" value={stats.totalGames} icon={ChartBarIcon} accent="blue" />
      <StatCard label="Record" value={`${stats.wins}W - ${stats.losses}L`} numeric={false} icon={TrophyIcon} accent="amber" />
      <StatCard label="Win Rate" value={`${stats.winRate}%`} numeric={false} icon={BoltIcon} accent="green" />
      <StatCard label="Avg Team Damage" value={stats.avgDamage} icon={FireIcon} accent="red" />
      <StatCard label="Unique Players" value={stats.uniquePlayers} icon={UserGroupIcon} accent="purple" />
    </div>
  );
}
