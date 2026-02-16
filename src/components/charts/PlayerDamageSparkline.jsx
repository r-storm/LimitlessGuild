import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { getPlayerGameDamage, getPlayerGameStat } from '../../data/dataUtils';

export default function PlayerDamageSparkline({ playerName }) {
  const damages = useMemo(() => getPlayerGameDamage(playerName), [playerName]);

  if (damages.length < 2) return null;

  return <PlayerSparkline values={damages} color="139, 92, 246" />;
}

export function PlayerSparkline({ values, color = '139, 92, 246' }) {
  if (!values || values.length < 2) return null;

  const data = {
    labels: values.map((_, i) => i + 1),
    datasets: [
      {
        data: values,
        borderColor: `rgb(${color})`,
        backgroundColor: `rgba(${color}, 0.1)`,
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
    <div className="h-24">
      <Line data={data} options={options} />
    </div>
  );
}

export function PlayerStatSparkline({ playerName, stat, color }) {
  const values = useMemo(() => getPlayerGameStat(playerName, stat), [playerName, stat]);
  return <PlayerSparkline values={values} color={color} />;
}
