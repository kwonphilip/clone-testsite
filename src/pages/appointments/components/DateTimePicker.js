/**
 * DateTimePicker — Step 4 of the appointment booking form.
 *
 * Renders a structured calendar where visible dates are grouped first by
 * month, then by calendar week (Sun–Sat rows), followed by a time-slot
 * grid that appears once the user selects a date.
 *
 * ── CALENDAR LAYOUT ──────────────────────────────────────────────────────────
 *
 *   ┌─ April 2026 ──────────────────────────────────────────────────────────┐
 *   │  Sun   Mon   Tue   Wed   Thu   Fri   Sat                              │
 *   │   ─     ─     ─   [ 1] [ 2] [ 3] [ 4]                                │
 *   │   ─   [ 6] [ 7] [ 8] [ 9] [10] [11]                                  │
 *   │   ─   [13] [14] [15] [16] [17] [18]                                  │
 *   │   ─   [20] [21] [22] [23] [24] [25]                                  │
 *   │   ─   [27] [28] [29] [30]  ─    ─                                    │
 *   └───────────────────────────────────────────────────────────────────────┘
 *
 *   Sundays are always shown but disabled ("Closed").
 *   Empty cells (─) keep the 7-column grid aligned without showing content.
 *
 * ── PROGRESSIVE DISCLOSURE ───────────────────────────────────────────────────
 *
 *   Only 2 weeks are shown initially (INITIAL_DAYS). Clicking "Show more
 *   dates" adds another 2 weeks, up to 12 months ahead (MAX_DAYS). This
 *   keeps the initial view lightweight while giving power users full range.
 *
 * @param {Object}      props
 * @param {Date[]}      props.dates        - All currently visible bookable dates.
 * @param {boolean}     props.canLoadMore  - True if more dates can be loaded.
 * @param {Date|null}   props.selectedDate - Currently selected date, or null.
 * @param {string|null} props.selectedTime - Currently selected time label, or null.
 * @param {Function}    props.onDateSelect - Called with a Date when a date is clicked.
 * @param {Function}    props.onTimeSelect - Called with a time label string when a slot is clicked.
 * @param {Function}    props.onLoadMore   - Called when "Show more dates" is clicked.
 */

import { useMemo } from 'react';
import { groupDatesByMonthAndWeek } from '../helpers/dateHelpers';
import { generateTimeSlots } from '../helpers/timeSlotHelpers';
import { DAY_NAMES, MONTH_NAMES } from '../constants/schedule';
import './DateTimePicker.css';

export default function DateTimePicker({
  dates,
  canLoadMore,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onLoadMore,
}) {
  // Memoize the grouping calculation so it only reruns when the dates array
  // changes (i.e. when the user clicks "load more"). Avoids re-grouping on
  // every re-render caused by date/time selection changes.
  const monthGroups = useMemo(
    () => groupDatesByMonthAndWeek(dates),
    [dates]
  );

  // Derive time slots for the selected date. Empty array when no date is selected.
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  return (
    <div className="dtp">

      {/* ── Calendar ──────────────────────────────────────────────────── */}
      <div className="dtp__calendar">
        {monthGroups.map(monthGroup => (
          <MonthSection
            key={monthGroup.key}
            monthGroup={monthGroup}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
          />
        ))}
      </div>

      {/* ── Progressive disclosure: load more dates ────────────────── */}
      {canLoadMore && (
        <div className="dtp__load-more">
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            onClick={onLoadMore}
          >
            Show more dates →
          </button>
        </div>
      )}

      {/* ── Time slot grid (appears after a date is chosen) ───────── */}
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
 * MonthSection — Renders one full calendar month with a header row and
 * one WeekRow per calendar week that contains visible dates.
 *
 * @param {Object}    props
 * @param {MonthGroup} props.monthGroup   - Data from groupDatesByMonthAndWeek.
 * @param {Date|null}  props.selectedDate - For highlight comparison in date cells.
 * @param {Function}   props.onDateSelect - Passed through to DateCell.
 */
function MonthSection({ monthGroup, selectedDate, onDateSelect }) {
  return (
    <div className="dtp__month">

      {/* Month heading, e.g. "April 2026" */}
      <h3 className="dtp__month-label">{monthGroup.label}</h3>

      {/* Day-of-week column headers: Sun Mon Tue Wed Thu Fri Sat */}
      <div className="dtp__week-row dtp__week-row--header">
        {DAY_NAMES.map(day => (
          <div key={day} className="dtp__col-header">
            {day}
          </div>
        ))}
      </div>

      {/* One row per calendar week within this month */}
      {monthGroup.weeks.map(weekGroup => (
        <div key={weekGroup.key} className="dtp__week-row">
          {weekGroup.cells.map((date, dayIndex) =>
            date === null ? (
              // null cell = a day outside this month's range or before tomorrow.
              // Rendered as an invisible placeholder to preserve grid alignment.
              // aria-hidden prevents screen readers from announcing empty cells.
              <div
                key={dayIndex}
                className="dtp__cell dtp__cell--empty"
                aria-hidden="true"
              />
            ) : (
              <DateCell
                key={dayIndex}
                date={date}
                dayIndex={dayIndex}
                selectedDate={selectedDate}
                onDateSelect={onDateSelect}
              />
            )
          )}
        </div>
      ))}

    </div>
  );
}

/**
 * DateCell — A single day button within a week row.
 *
 * Handles three visual states:
 *   - Closed (Sunday, dayIndex 0): visible but disabled with a "Closed" label.
 *   - Selected: filled with the primary brand color.
 *   - Default: bordered, hoverable button.
 *
 * Why show Sundays instead of hiding them?
 *   Showing disabled Sundays preserves the visual rhythm of a real calendar.
 *   If we hid them, the grid would only have 6 columns and weeks would look
 *   misaligned — Mon might appear under where Sun should be.
 *
 * @param {Object}    props
 * @param {Date}      props.date         - The date this cell represents.
 * @param {number}    props.dayIndex     - Column index (0 = Sun … 6 = Sat).
 * @param {Date|null} props.selectedDate - For selected-state comparison.
 * @param {Function}  props.onDateSelect - Invoked with the Date when clicked.
 */
function DateCell({ date, dayIndex, selectedDate, onDateSelect }) {
  // dayIndex 0 is always Sunday because cells are built from Sunday onward in dateHelpers.
  const isSunday   = dayIndex === 0;
  const isSelected = Boolean(
    selectedDate && date.toDateString() === selectedDate.toDateString()
  );

  // Build className string with conditionals separated for readability.
  // Using .filter(Boolean) removes empty strings from the falsy branches.
  const classes = [
    'dtp__cell',
    'dtp__date-btn',
    isSunday   ? 'dtp__date-btn--closed'   : '',
    isSelected ? 'dtp__date-btn--selected' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      disabled={isSunday}
      className={classes}
      onClick={() => onDateSelect(date)}
      // aria-pressed communicates toggle state to assistive technologies
      aria-pressed={isSelected}
      // Descriptive label for screen readers: "Wednesday, April 8" or "Sunday, April 5 — Closed"
      aria-label={`${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}${isSunday ? ' — Closed' : ''}`}
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
 * Appears below the calendar after the user picks a date. Both available
 * and unavailable slots are rendered — unavailable ones appear struck-through
 * and disabled. Showing booked slots rather than hiding them gives clients a
 * sense of the day's fullness and builds trust that availability is real data.
 *
 * @param {Object}      props
 * @param {Date}        props.date         - The selected date (used in the section heading).
 * @param {TimeSlot[]}  props.slots        - Array of { label, available } objects.
 * @param {string|null} props.selectedTime - Currently selected time label, or null.
 * @param {Function}    props.onTimeSelect - Called with the time label when a slot is clicked.
 */
function TimeSlotSection({ date, slots, selectedTime, onTimeSelect }) {
  const dayLabel = `${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;

  return (
    <div className="dtp__time-section">
      <h3 className="dtp__time-title">
        Available times — {dayLabel}
      </h3>

      {slots.length === 0 ? (
        // This branch should only be reachable for Sundays, which are already
        // disabled in the calendar. It acts as a defensive fallback.
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
      {/* "Booked" label helps users understand why the slot is unavailable */}
      {!available && (
        <span className="dtp__booked-label" aria-hidden="true">Booked</span>
      )}
    </button>
  );
}
