import RankingCard from './RankingCard';
import {
  getTopAvgDamage,
  getTopAvgHealers,
  getTopAvgSiege,
  getTopTotalKills,
  getTopTotalAssists,
} from '../data/dataUtils';

export default function RankingsGrid({ onPlayerClick }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Rankings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <RankingCard title="Top Avg Damage" items={getTopAvgDamage()} onPlayerClick={onPlayerClick} />
        <RankingCard title="Top Total Kills" items={getTopTotalKills()} onPlayerClick={onPlayerClick} />
        <RankingCard title="Top Total Assists" items={getTopTotalAssists()} onPlayerClick={onPlayerClick} />
        <RankingCard title="Top Avg Healing" items={getTopAvgHealers()} onPlayerClick={onPlayerClick} />
        <RankingCard title="Top Avg Siege" items={getTopAvgSiege()} onPlayerClick={onPlayerClick} />
      </div>
    </div>
  );
}
