import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllGameSummaries } from '../../data/dataUtils';
import { formatNumber } from '../../utils/formatters';

export default function DamagePerMatchChart() {
  const summaries = useMemo(() => getAllGameSummaries(), []);

  const data = {
    labels: summaries.map(s => `Match ${s.gameNum} (${s.result === 'win' ? 'W' : 'L'})`),
    datasets: [
      {
        label: 'Damage',
        data: summaries.map(s => s.totalDamage),
        backgroundColor: 'rgba(139, 92, 246, 0.6)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Healing',
        data: summaries.map(s => s.totalHealing),
        backgroundColor: 'rgba(52, 211, 153, 0.6)',
        borderColor: 'rgb(52, 211, 153)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Siege',
        data: summaries.map(s => s.totalSiege),
        backgroundColor: 'rgba(251, 191, 36, 0.6)',
        borderColor: 'rgb(251, 191, 36)',
        borderWidth: 1,
        borderRadius: 6,
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
      tooltip: {
        callbacks: {
          title: ctx => `${ctx[0].label} — ${summaries[ctx[0].dataIndex].date}`,
          label: ctx => `${ctx.dataset.label}: ${formatNumber(ctx.raw)}`,
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
        Damage, Healing & Siege Per Match
      </h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
