/**
 * dateHelpers.js — Utilities for generating and structuring Date objects
 * used by the appointment date picker.
 *
 * This module is intentionally kept free of any React imports so it can
 * be unit-tested in isolation without a rendering environment.
 */

import { MONTH_NAMES_FULL } from '../constants/schedule';

// ── DATE GENERATION ───────────────────────────────────────────────────────────

/**
 * Generates an ordered array of Date objects representing future bookable days,
 * starting from *tomorrow* and continuing for `count` days.
 *
 * Why start from tomorrow? Same-day bookings are not supported — staff need
 * at least 24 hours of lead time to prepare for a new appointment.
 *
 * Time components are zeroed to midnight so that all downstream date comparisons
 * using toDateString() operate at day-level granularity, never by time.
 *
 * @param {number} count - Total calendar days to generate.
 * @returns {Date[]}
 */
export function generateDates(count) {
  const dates = [];
  const today = new Date();

  // Normalize to midnight — ensures date math (setDate) doesn't produce
  // unexpected results around DST boundaries or near end-of-day.
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i <= count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }

  return dates;
}

// ── DATE GROUPING ─────────────────────────────────────────────────────────────

/**
 * Groups an array of Date objects into a month → week hierarchy for rendering
 * as a structured calendar grid (Sun–Sat columns).
 *
 * ── HOW THE GROUPING WORKS ──────────────────────────────────────────────────
 *
 *  For each date in the input:
 *    1. It is assigned to the month it belongs to (year + month index).
 *    2. Within that month, it is placed in the calendar week whose Sunday
 *       it belongs to. We find the Sunday by rewinding: sunday = date - getDay().
 *    3. That week is represented as exactly 7 cells (indices 0–6, Sun → Sat).
 *       Each cell contains either:
 *         • A Date object — the day is in-range AND in this month group.
 *         • null          — the day falls outside the range or is in an
 *                           adjacent month; rendered as an empty placeholder.
 *
 * ── CROSS-MONTH WEEKS ───────────────────────────────────────────────────────
 *
 *  When a calendar week spans two months (e.g. the week of Mar 30 – Apr 5),
 *  it appears in *both* month groups. March shows only Mar 30–31, and April
 *  shows Apr 1–5. Cross-month cells are null in each respective group.
 *
 *  This design was chosen because:
 *    - It mirrors how people read a wall or phone calendar naturally.
 *    - It keeps month sections visually clean — no rows that bleed into
 *      a previous or next month's territory.
 *    - It avoids the complexity of "should this week belong to March or April?"
 *      — each month simply owns its own days.
 *
 * ── EXAMPLE OUTPUT SHAPE ────────────────────────────────────────────────────
 *
 *  [
 *    {
 *      key: '2026-3',
 *      label: 'April 2026',
 *      weeks: [
 *        { key: '2026-3-Wed Apr 01 2026', cells: [null, null, null, Date, Date, Date, Date] },
 *        { key: '2026-3-Sun Apr 06 2026', cells: [null, Date, Date, Date, Date, Date, Date] },
 *        ...
 *      ]
 *    },
 *    ...
 *  ]
 *
 * @param {Date[]} dates - Array of bookable dates, sorted ascending.
 * @returns {MonthGroup[]}
 *
 * @typedef {{ key: string, label: string, weeks: WeekGroup[] }} MonthGroup
 * @typedef {{ key: string, cells: (Date|null)[]            }} WeekGroup
 */
export function groupDatesByMonthAndWeek(dates) {
  // Build a Set of serialized date strings for O(1) membership testing.
  // toDateString() strips time, giving us a stable day-level key like
  // "Mon Apr 06 2026" that matches how we serialize cells below.
  const dateSet = new Set(dates.map(d => d.toDateString()));

  // Map preserves insertion order, so months appear in chronological order
  // without needing a separate sort step after grouping.
  const monthMap = new Map();

  for (const date of dates) {
    const year  = date.getFullYear();
    const month = date.getMonth(); // 0-indexed (Jan = 0, Dec = 11)

    const monthKey   = `${year}-${month}`;
    const monthLabel = `${MONTH_NAMES_FULL[month]} ${year}`;

    // Get or create the month group for this date.
    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, { key: monthKey, label: monthLabel, weeks: new Map() });
    }
    const monthGroup = monthMap.get(monthKey);

    // ── Find the Sunday that starts this date's week ─────────────────────
    // date.getDay() returns 0 for Sunday, 1 for Monday, …, 6 for Saturday.
    // Subtracting getDay() always lands on the Sunday of that week.
    // Example: Wednesday (getDay()=3) → subtract 3 → previous Sunday.
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay());

    // The week key must be unique *within this month group* because the same
    // Sunday can appear in two different month groups (cross-month weeks).
    // Combining monthKey + the Sunday string guarantees uniqueness.
    const weekKey = `${monthKey}-${sunday.toDateString()}`;

    // ── Build cells for this week if we haven't seen it yet ──────────────
    if (!monthGroup.weeks.has(weekKey)) {
      // Generate exactly 7 cells, one for each day Sun(0)…Sat(6).
      const cells = Array.from({ length: 7 }, (_, dayOffset) => {
        const cell = new Date(sunday);
        cell.setDate(sunday.getDate() + dayOffset);

        // A cell is "real" only when it satisfies both conditions:
        //   1. It belongs to this month group (not a neighboring month).
        //   2. It is within the bookable date range we were given.
        // Any cell that fails either test becomes null (empty grid slot).
        const inThisMonth = cell.getMonth() === month && cell.getFullYear() === year;
        const inRange     = dateSet.has(cell.toDateString());

        return (inThisMonth && inRange) ? cell : null;
      });

      monthGroup.weeks.set(weekKey, { key: weekKey, cells });
    }
  }

  // Convert nested Maps → plain arrays so React can iterate with .map().
  return Array.from(monthMap.values()).map(mg => ({
    ...mg,
    weeks: Array.from(mg.weeks.values()),
  }));
}
