import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllGameSummaries } from '../../data/dataUtils';
import { formatNumber } from '../../utils/formatters';

export default function TopDamageChart() {
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
        borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 6, bottomRight: 6 },
      },
      {
        label: 'Healing',
        data: summaries.map(s => s.totalHealing),
        backgroundColor: 'rgba(52, 211, 153, 0.6)',
        borderColor: 'rgb(52, 211, 153)',
        borderWidth: 1,
      },
      {
        label: 'Siege',
        data: summaries.map(s => s.totalSiege),
        backgroundColor: 'rgba(251, 191, 36, 0.6)',
        borderColor: 'rgb(251, 191, 36)',
        borderWidth: 1,
        borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
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
          afterBody: ctx => {
            const i = ctx[0].dataIndex;
            const total = summaries[i].totalDamage + summaries[i].totalHealing + summaries[i].totalSiege;
            return `Total: ${formatNumber(total)}`;
          },
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { callback: v => formatNumber(v) },
        grid: { color: 'rgba(30, 30, 42, 0.3)' },
      },
      x: {
        stacked: true,
        grid: { display: false },
      },
    },
  };

  return (
    <div className="rounded-xl glass-adaptive border border-[var(--color-border)] p-5">
      <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
        Total Output Per Match
      </h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
