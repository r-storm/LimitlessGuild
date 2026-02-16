import { useState, useMemo } from 'react';
import PageHeader from '../layout/PageHeader';
import RankingCard from '../RankingCard';
import {
  getTopAvgDamage,
  getTopAvgHealers,
  getTopAvgSiege,
  getTopTotalKills,
  getTopTotalAssists,
} from '../../data/dataUtils';
import classNames from '../../utils/classNames';

const tabs = [
  { key: 'avgDamage', label: 'Avg Damage', getter: () => getTopAvgDamage(Infinity) },
  { key: 'totalKills', label: 'Total Kills', getter: () => getTopTotalKills(Infinity) },
  { key: 'totalAssists', label: 'Total Assists', getter: () => getTopTotalAssists(Infinity) },
  { key: 'avgHealing', label: 'Avg Healing', getter: () => getTopAvgHealers(Infinity) },
  { key: 'avgSiege', label: 'Avg Siege', getter: () => getTopAvgSiege(Infinity) },
];

export default function RankingsPage({ onPlayerClick }) {
  const [activeTab, setActiveTab] = useState('avgDamage');

  const activeConfig = tabs.find(t => t.key === activeTab);
  const items = useMemo(() => activeConfig.getter(), [activeConfig]);

  return (
    <div className="space-y-6">
      <PageHeader title="Rankings" subtitle="Full player rankings across all categories" />

      <div className="flex gap-1 overflow-x-auto border-b border-[var(--color-border)] pb-px scrollbar-none">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={classNames(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer rounded-t-lg',
              activeTab === tab.key
                ? 'text-violet-400 border-b-2 border-violet-400 bg-[var(--color-bg-card)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card-hover)]',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <RankingCard
        title={activeConfig.label}
        items={items}
        onPlayerClick={onPlayerClick}
      />
    </div>
  );
}
