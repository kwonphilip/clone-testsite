/**
 * DateTimePicker — Step 4 of the appointment booking form.
 *
 * Renders a single-month calendar the user can navigate with Previous/Next
 * buttons, followed by a time-slot grid that appears once a date is selected.
 *
 * ── CALENDAR LAYOUT ──────────────────────────────────────────────────────────
 *
 *   ┌─ ← April 2026 → ─────────────────────────────────────────────────────┐
 *   │  Sun   Mon   Tue   Wed   Thu   Fri   Sat                              │
 *   │   ─     ─     ─   [ 1] [ 2] [ 3] [ 4]                                │
 *   │  [ 5] [ 6] [ 7] [ 8] [ 9] [10] [11]                                  │
 *   │  [12] [13] [14] [15] [16] [17] [18]                                  │
 *   │  [19] [20] [21] [22] [23] [24] [25]                                  │
 *   │  [26] [27] [28] [29] [30]  ─    ─                                    │
 *   └───────────────────────────────────────────────────────────────────────┘
 *
 *   Sundays are visible but disabled ("Closed").
 *   Past dates (before tomorrow) are visible but disabled ("Unavailable").
 *   Empty cells (─) are null placeholders that keep the 7-column grid aligned.
 *
 * ── MONTH NAVIGATION ─────────────────────────────────────────────────────────
 *
 *   Clients can navigate forward up to MAX_MONTHS_AHEAD months from today.
 *   The "Previous month" button is disabled when already on the current month
 *   so that clients cannot navigate into the past.
 *
 * @param {Object}      props
 * @param {Date|null}   props.selectedDate - Currently selected date, or null.
 * @param {string|null} props.selectedTime - Currently selected time label, or null.
 * @param {Function}    props.onDateSelect - Called with a Date when a date is clicked.
 * @param {Function}    props.onTimeSelect - Called with a time label string when a slot is clicked.
 */

import { useState, useMemo } from 'react';
import { getCalendarWeeks } from '../helpers/dateHelpers';
import { generateTimeSlots } from '../helpers/timeSlotHelpers';
import { DAY_NAMES, MONTH_NAMES, MONTH_NAMES_FULL } from '../constants/schedule';
import './DateTimePicker.css';

// How many months ahead clients are allowed to book.
// 11 = up to and including the same month next year.
const MAX_MONTHS_AHEAD = 11;

export default function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}) {
  // ── Internal view state ───────────────────────────────────────────────

  /**
   * viewDate: the first day of whichever month is currently displayed.
   * Initialised to the first of the current month so clients immediately
   * see available slots in the nearest possible timeframe.
   */
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // ── Derived navigation bounds ─────────────────────────────────────────

  /**
   * First day of the current calendar month — the earliest month clients
   * can navigate to. Memoized once; never changes within a session.
   */
  const currentMonthStart = useMemo(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  /**
   * First day of the furthest-future month that clients may view.
   * Calculated once so the boundary stays stable across renders.
   */
  const maxMonthStart = useMemo(() => {
    const d = new Date(currentMonthStart);
    d.setMonth(d.getMonth() + MAX_MONTHS_AHEAD);
    return d;
  }, [currentMonthStart]);

  // Compare by value (getTime) rather than reference because new Date()
  // objects are never === even when they represent the same instant.
  const canGoPrev = viewDate.getTime() > currentMonthStart.getTime();
  const canGoNext = viewDate.getTime() < maxMonthStart.getTime();

  // ── Navigation handlers ───────────────────────────────────────────────

  const goToPrevMonth = () => {
    setViewDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const goToNextMonth = () => {
    setViewDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  // ── Calendar grid ─────────────────────────────────────────────────────

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Recompute the week grid only when the displayed month changes, not on
  // every date/time selection (which would cause unnecessary reflows).
  const weeks = useMemo(() => getCalendarWeeks(year, month), [year, month]);

  // Bookability boundaries:
  //   today    → used to identify "today" for a highlight ring
  //   tomorrow → first bookable day (staff need 24 h lead time)
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const tomorrow = useMemo(() => {
    const d = new Date(today);
    d.setDate(today.getDate() + 1);
    return d;
  }, [today]);

  // Derive time slots for the selected date (empty array when none selected).
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  return (
    <div className="dtp">

      {/* ── Calendar ────────────────────────────────────────────────── */}
      <div className="dtp__calendar">

        {/* ── Month navigation header ─────────────────────────────── */}
        <div className="dtp__nav">
          <button
            type="button"
            className="dtp__nav-btn"
            onClick={goToPrevMonth}
            disabled={!canGoPrev}
            aria-label="Previous month"
          >
            ←
          </button>

          <h3 className="dtp__month-label">
            {MONTH_NAMES_FULL[month]} {year}
          </h3>

          <button
            type="button"
            className="dtp__nav-btn"
            onClick={goToNextMonth}
            disabled={!canGoNext}
            aria-label="Next month"
          >
            →
          </button>
        </div>

        {/* Day-of-week column headers: Sun Mon Tue Wed Thu Fri Sat */}
        <div className="dtp__week-row dtp__week-row--header">
          {DAY_NAMES.map(day => (
            <div key={day} className="dtp__col-header">{day}</div>
          ))}
        </div>

        {/* One row per calendar week in the current month */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="dtp__week-row">
            {week.map((date, dayIndex) =>
              date === null ? (
                // null = a padding cell before the 1st or after the last day.
                // aria-hidden prevents screen readers from announcing the blank.
                <div
                  key={dayIndex}
                  className="dtp__cell dtp__cell--empty"
                  aria-hidden="true"
                />
              ) : (
                <DateCell
                  key={dayIndex}
                  date={date}
                  today={today}
                  tomorrow={tomorrow}
                  selectedDate={selectedDate}
                  onDateSelect={onDateSelect}
                />
              )
            )}
          </div>
        ))}

      </div>

      {/* ── Time slot grid (appears after a date is chosen) ──────── */}
      {selectedDate && (
        <TimeSlotSection
          date={selectedDate}
          slots={timeSlots}
          selectedTime={selectedTime}
          onTimeSelect={onTimeSelect}
        />
      )}

    </div>
  );
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

/**
 * DateCell — A single day button within a week row.
 *
 * Handles four visual states:
 *   - Closed (Sunday):     visible but disabled, shows "Closed" label.
 *   - Past (before tomorrow): visible but disabled, reduced opacity.
 *   - Today:               a subtle ring highlights the current day.
 *   - Selected:            filled with the primary brand color.
 *
 * Why show disabled dates instead of hiding them?
 *   Hiding past dates or Sundays would collapse those column slots and break
 *   the 7-column grid alignment. Showing them (greyed out) preserves the
 *   visual rhythm of a real calendar.
 *
 * @param {Object}    props
 * @param {Date}      props.date         - The date this cell represents.
 * @param {Date}      props.today        - Today at midnight, for "today" ring.
 * @param {Date}      props.tomorrow     - Tomorrow at midnight; first bookable day.
 * @param {Date|null} props.selectedDate - For selected-state comparison.
 * @param {Function}  props.onDateSelect - Invoked with the Date when clicked.
 */
function DateCell({ date, today, tomorrow, selectedDate, onDateSelect }) {
  const isSunday   = date.getDay() === 0;
  const isPast     = date < tomorrow; // before tomorrow → not bookable
  const isToday    = date.toDateString() === today.toDateString();
  const isDisabled = isSunday || isPast;
  const isSelected = Boolean(
    selectedDate && date.toDateString() === selectedDate.toDateString()
  );

  const classes = [
    'dtp__cell',
    'dtp__date-btn',
    isSunday   ? 'dtp__date-btn--closed'   : '',
    isPast && !isSunday ? 'dtp__date-btn--past' : '',
    isToday    ? 'dtp__date-btn--today'    : '',
    isSelected ? 'dtp__date-btn--selected' : '',
  ].filter(Boolean).join(' ');

  // Build an accessible label that assistive technologies can announce.
  // E.g. "Wednesday, April 8" or "Sunday, April 5 — Closed"
  const dayName = DAY_NAMES[date.getDay()];
  const ariaLabel = [
    `${dayName}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`,
    isSunday ? '— Closed' : isPast ? '— Unavailable' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={classes}
      onClick={() => onDateSelect(date)}
      aria-pressed={isSelected}
      aria-label={ariaLabel}
    >
      <span className="dtp__date-num">{date.getDate()}</span>
      {isSunday && (
        <span className="dtp__closed-label" aria-hidden="true">Closed</span>
      )}
    </button>
  );
}

/**
 * TimeSlotSection — Grid of available time slots for the selected date.
 *
 * Appears below the calendar once the user picks a date. Both available and
 * unavailable slots are rendered — booked ones appear struck-through and
 * disabled. Showing booked slots rather than hiding them gives clients a
 * realistic sense of how full the day is.
 *
 * @param {Object}      props
 * @param {Date}        props.date         - The selected date (used in the heading).
 * @param {TimeSlot[]}  props.slots        - Array of { label, available } objects.
 * @param {string|null} props.selectedTime - Currently selected time label, or null.
 * @param {Function}    props.onTimeSelect - Called with the time label when clicked.
 */
function TimeSlotSection({ date, slots, selectedTime, onTimeSelect }) {
  const dayLabel = `${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;

  return (
    <div className="dtp__time-section">
      <h3 className="dtp__time-title">
        Available times — {dayLabel}
      </h3>

      {slots.length === 0 ? (
        // Defensive fallback — should only appear for Sundays, which are
        // already disabled in the calendar so this path is rarely reached.
        <p className="dtp__no-slots">
          No availability on this day. Please select another date.
        </p>
      ) : (
        <div className="dtp__slots-grid">
          {slots.map(({ label, available }) => (
            <TimeSlotButton
              key={label}
              label={label}
              available={available}
              selected={selectedTime === label}
              onSelect={onTimeSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * TimeSlotButton — One bookable time option in the slot grid.
 *
 * @param {Object}   props
 * @param {string}   props.label     - Display string (e.g. "10:00 AM").
 * @param {boolean}  props.available - Whether this slot can be selected.
 * @param {boolean}  props.selected  - Whether this slot is currently chosen.
 * @param {Function} props.onSelect  - Called with the label string when clicked.
 */
function TimeSlotButton({ label, available, selected, onSelect }) {
  const classes = [
    'dtp__slot-btn',
    !available ? 'dtp__slot-btn--booked'   : '',
    selected   ? 'dtp__slot-btn--selected' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      disabled={!available}
      className={classes}
      onClick={() => available && onSelect(label)}
      aria-pressed={selected}
    >
      {label}
      {/* "Booked" label clarifies to the user why the slot is disabled */}
      {!available && (
        <span className="dtp__booked-label" aria-hidden="true">Booked</span>
      )}
    </button>
  );
}
