import PageHeader from '../layout/PageHeader';
import OverallStatsBar from '../OverallStatsBar';
import AllPlayersTable from '../AllPlayersTable';
import DamagePerMatchChart from '../charts/DamagePerMatchChart';
import WinLossChart from '../charts/WinLossChart';
import TopDamageChart from '../charts/TopDamageChart';
import MatchPerformanceChart from '../charts/MatchPerformanceChart';

export default function DashboardPage({ searchQuery, onPlayerClick }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Guild war performance overview" />
      <OverallStatsBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DamagePerMatchChart />
        <WinLossChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MatchPerformanceChart />
        <TopDamageChart />
      </div>

      <AllPlayersTable searchQuery={searchQuery} onPlayerClick={onPlayerClick} />
    </div>
  );
}
