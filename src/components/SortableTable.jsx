import { useState, useMemo } from 'react';
import { formatNumber } from '../utils/formatters';
import ClassIcon from './ClassIcon';

export default function SortableTable({ columns, data, onPlayerClick, badges }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(false);

  function handleSort(key) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'string') {
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortAsc ? av - bv : bv - av;
    });
  }, [data, sortKey, sortAsc]);

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
            <th className="px-3 py-3 text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider w-8">#</th>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`px-3 py-3 text-xs uppercase tracking-wider cursor-pointer hover:text-violet-400 transition-colors select-none ${
                  col.align === 'left' ? 'text-left' : 'text-right'
                } ${sortKey === col.key ? 'text-violet-400' : 'text-[var(--color-text-muted)]'}`}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {sortKey === col.key && (
                    <span className="text-[10px]">{sortAsc ? '\u25B2' : '\u25BC'}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.name}
              className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-card-hover)] transition-colors"
            >
              <td className="px-3 py-2.5 text-[var(--color-text-muted)] font-mono text-xs">{i + 1}</td>
              {columns.map(col => (
                <td
                  key={col.key}
                  className={`px-3 py-2.5 ${col.align === 'left' ? 'text-left' : 'text-right'} ${
                    col.key === 'name' ? '' : 'font-mono'
                  }`}
                >
                  {col.key === 'name' ? (
                    <span className="inline-flex items-center gap-1.5 flex-wrap">
                      <ClassIcon playerName={row.name} size={16} />
                      <button
                        onClick={() => onPlayerClick(row.name)}
                        className="text-violet-400 hover:text-violet-300 hover:underline transition-colors font-sans font-medium cursor-pointer bg-transparent border-none p-0 text-sm text-left"
                      >
                        {row.name}
                      </button>
                      {badges?.[row.name]?.map(b => (
                        <span
                          key={b.label}
                          className={`${b.bg} ${b.text} text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-current/20`}
                          style={{ boxShadow: b.glow }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </span>
                  ) : col.format ? (
                    col.format(row[col.key])
                  ) : typeof row[col.key] === 'number' ? (
                    formatNumber(row[col.key])
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="px-3 py-8 text-center text-[var(--color-text-muted)]">
                No players found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
