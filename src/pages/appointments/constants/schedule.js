/**
 * schedule.js — Scheduling-related constants for the Appointments feature.
 *
 * Centralizing these values here means any change to business hours,
 * calendar range, or date formatting only ever needs to happen in one place.
 * Components import from here rather than hardcoding strings or numbers inline.
 */

/**
 * Short day names indexed 0 (Sunday) through 6 (Saturday).
 * Used for column headers and aria-labels throughout the date picker.
 */
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Short (3-letter) month names, indexed 0 (January) through 11 (December).
 * Used in compact contexts: time-slot section headings, success screen, etc.
 */
export const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Full month names, indexed the same as MONTH_NAMES.
 * Used in calendar section headers (e.g. "April 2026") where space allows.
 */
export const MONTH_NAMES_FULL = [
  'January',  'February', 'March',    'April',
  'May',      'June',     'July',     'August',
  'September','October',  'November', 'December',
];

/**
 * Number of days to show in the date picker on initial render.
 * Two weeks (14 days) is the default per the product requirements.
 */
export const INITIAL_DAYS = 14;

/**
 * Number of additional days to reveal each time "Show more dates" is clicked.
 * Adding one week at a time keeps the UI from growing too large at once.
 */
export const LOAD_MORE_DAYS = 14;

/**
 * Hard cap on how far ahead a client can book (approximately 12 months).
 * 365 is used as a round upper bound; a production implementation might
 * derive this from a business-rules API.
 */
export const MAX_DAYS = 365;

/**
 * Business operating hours, expressed as 24-hour integers.
 *
 * `start` is inclusive — the first slot begins at this hour.
 * `end`   is exclusive — the last slot begins *before* this hour.
 *
 * Sunday is omitted because the business is always closed on Sundays.
 * The date picker enforces this by checking date.getDay() === 0.
 */
export const BUSINESS_HOURS = {
  weekday:  { start: 9, end: 19 }, // Mon–Fri: 9:00 AM – 7:00 PM
  saturday: { start: 9, end: 16 }, // Sat:     9:00 AM – 4:00 PM
};

/**
 * Human-readable hours for display in the sidebar.
 *
 * Kept as a separate structure (rather than derived from BUSINESS_HOURS)
 * so the display strings can be formatted naturally for users without
 * requiring runtime formatting logic in the component.
 */
export const DISPLAY_HOURS = [
  { days: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
  { days: 'Saturday',        hours: '9:00 AM – 4:00 PM' },
  { days: 'Sunday',          hours: 'Closed'             },
];
