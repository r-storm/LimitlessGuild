import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { getPlayerGameDamage } from '../../data/dataUtils';

export default function PlayerDamageSparkline({ playerName }) {
  const damages = useMemo(() => getPlayerGameDamage(playerName), [playerName]);

  if (damages.length < 2) return null;

  const data = {
    labels: damages.map((_, i) => i + 1),
    datasets: [
      {
        data: damages,
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: { borderCapStyle: 'round' },
    },
  };

  return (
    <div className="h-16">
      <Line data={data} options={options} />
    </div>
  );
}
