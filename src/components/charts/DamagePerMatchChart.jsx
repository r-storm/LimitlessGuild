import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllGameSummaries } from '../../data/dataUtils';
import { formatNumber } from '../../utils/formatters';

export default function DamagePerMatchChart() {
  const summaries = useMemo(() => getAllGameSummaries(), []);

  const data = {
    labels: summaries.map(s => `Match ${s.gameNum} (${s.date.split(' ')[0]})`),
    datasets: [
      {
        label: 'Team Damage',
        data: summaries.map(s => s.totalDamage),
        backgroundColor: summaries.map(s =>
          s.result === 'win' ? 'rgba(139, 92, 246, 0.7)' : 'rgba(100, 116, 139, 0.5)',
        ),
        borderColor: summaries.map(s =>
          s.result === 'win' ? 'rgb(139, 92, 246)' : 'rgb(100, 116, 139)',
        ),
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `Damage: ${formatNumber(ctx.raw)}`,
          afterLabel: ctx => summaries[ctx.dataIndex].result === 'win' ? 'Won' : 'Lost',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: v => formatNumber(v) },
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
        Team Damage Per Match
      </h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
