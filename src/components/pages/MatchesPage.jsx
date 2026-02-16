import { useState, useMemo } from 'react';
import PageHeader from '../layout/PageHeader';
import CalendarGrid from '../matches/CalendarGrid';
import MatchDetail from '../matches/MatchDetail';
import { getMatchDates, getMatchesByDate } from '../../data/dataUtils';

export default function MatchesPage({ onPlayerClick }) {
  const matchDates = useMemo(() => getMatchDates(), []);

  const defaultDate = useMemo(() => {
    const sorted = [...matchDates].sort().reverse();
    return sorted[0] || null;
  }, [matchDates]);

  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const initialDate = defaultDate ? defaultDate.split('/') : null;
  const [calendarYear, setCalendarYear] = useState(initialDate ? parseInt(initialDate[0]) : new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(initialDate ? parseInt(initialDate[1]) - 1 : new Date().getMonth());

  const matches = useMemo(() => {
    if (!selectedDate) return [];
    return getMatchesByDate(selectedDate);
  }, [selectedDate]);

  function handleMonthChange(year, month) {
    setCalendarYear(year);
    setCalendarMonth(month);
  }

  return (
    <div>
      <PageHeader title="Matches" subtitle="Browse match history by date" />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-72 shrink-0">
          <div className="glass-adaptive rounded-xl border border-[var(--color-border)] p-4">
            <CalendarGrid
              year={calendarYear}
              month={calendarMonth}
              onMonthChange={handleMonthChange}
              matchDates={matchDates}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {selectedDate && matches.length > 0 ? (
            <>
              <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Matches on {selectedDate}
              </h2>
              {matches.map(m => (
                <MatchDetail
                  key={m.gameNum}
                  gameNum={m.gameNum}
                  onPlayerClick={onPlayerClick}
                />
              ))}
            </>
          ) : (
            <div className="text-center py-12 text-[var(--color-text-muted)]">
              Select a date with matches from the calendar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
