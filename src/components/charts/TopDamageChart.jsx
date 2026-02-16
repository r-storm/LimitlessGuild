import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTopAvgDamage } from '../../data/dataUtils';
import { formatNumber } from '../../utils/formatters';

export default function TopDamageChart() {
  const players = useMemo(() => getTopAvgDamage(10), []);

  const data = {
    labels: players.map(p => p.name),
    datasets: [
      {
        label: 'Avg Damage',
        data: players.map(p => p.value),
        backgroundColor: 'rgba(139, 92, 246, 0.6)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `Avg Damage: ${formatNumber(ctx.raw)}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { callback: v => formatNumber(v) },
        grid: { color: 'rgba(30, 30, 42, 0.3)' },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="rounded-xl glass-adaptive border border-[var(--color-border)] p-5">
      <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
        Top 10 Players — Avg Damage
      </h3>
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
