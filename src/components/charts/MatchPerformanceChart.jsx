import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { getAllGameSummaries } from '../../data/dataUtils';

export default function MatchPerformanceChart() {
  const summaries = useMemo(() => getAllGameSummaries(), []);

  const data = {
    labels: summaries.map(s => `Match ${s.gameNum} (${s.date.split(' ')[0]})`),
    datasets: [
      {
        label: 'Kills',
        data: summaries.map(s => s.totalKills),
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(139, 92, 246)',
      },
      {
        label: 'Deaths',
        data: summaries.map(s => s.totalDeaths),
        borderColor: 'rgb(248, 113, 113)',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(248, 113, 113)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(30, 30, 42, 0.3)' },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="rounded-xl glass-adaptive border border-[var(--color-border)] p-5">
      <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
        Kills & Deaths Per Match
      </h3>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
