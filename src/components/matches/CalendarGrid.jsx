import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from '../../utils/classNames';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function buildCalendarWeeks(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // Monday=0 ... Sunday=6
  const daysInMonth = lastDay.getDate();

  const cells = [];

  const prevLast = new Date(year, month, 0).getDate();
  for (let i = startDow - 1; i >= 0; i--) {
    cells.push({ day: prevLast - i, currentMonth: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}/${String(month + 1).padStart(2, '0')}/${String(d).padStart(2, '0')}`;
    cells.push({ day: d, currentMonth: true, dateStr });
  }

  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, currentMonth: false });
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function CalendarGrid({ year, month, onMonthChange, matchDates, selectedDate, onSelectDate }) {
  const weeks = buildCalendarWeeks(year, month);

  function prevMonth() {
    if (month === 0) onMonthChange(year - 1, 11);
    else onMonthChange(year, month - 1);
  }

  function nextMonth() {
    if (month === 11) onMonthChange(year + 1, 0);
    else onMonthChange(year, month + 1);
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          {MONTH_NAMES[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {DAY_LABELS.map(d => (
          <div key={d} className="py-1.5 text-center text-xs font-medium text-[var(--color-text-muted)]">
            {d}
          </div>
        ))}
        {weeks.flat().map((cell, i) => {
          const hasMatch = cell.currentMonth && matchDates.has(cell.dateStr);
          const isSelected = cell.currentMonth && cell.dateStr === selectedDate;

          return (
            <button
              key={i}
              onClick={() => {
                if (cell.currentMonth && hasMatch) onSelectDate(cell.dateStr);
              }}
              disabled={!cell.currentMonth || !hasMatch}
              className={classNames(
                'relative flex flex-col items-center justify-center py-2 text-sm rounded-md transition-colors',
                !cell.currentMonth && 'text-[var(--color-text-muted)] opacity-30',
                cell.currentMonth && !hasMatch && 'text-[var(--color-text-secondary)]',
                cell.currentMonth && hasMatch && !isSelected && 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] cursor-pointer font-medium',
                isSelected && 'bg-violet-400/15 text-violet-400 font-bold cursor-pointer',
                (!cell.currentMonth || !hasMatch) && 'cursor-default',
              )}
            >
              <span>{cell.day}</span>
              {hasMatch && (
                <span className={classNames(
                  'absolute bottom-1 h-1.5 w-1.5 rounded-full',
                  isSelected ? 'bg-violet-400' : 'bg-violet-400/60',
                )} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
