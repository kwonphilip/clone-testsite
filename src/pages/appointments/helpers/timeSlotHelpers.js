/**
 * timeSlotHelpers.js — Utilities for generating time-slot availability
 * for a given calendar date.
 *
 * ── FUTURE INTEGRATION NOTE ─────────────────────────────────────────────────
 *
 * Availability is currently mocked using deterministic pseudo-random logic
 * (see generateTimeSlots below). When a real scheduling backend is integrated
 * (e.g. Google Calendar API), this function should be replaced with one that:
 *
 *   1. Fetches booked events from the calendar for the selected date.
 *   2. Computes free slots by subtracting booked blocks from business hours.
 *   3. Returns the same { label, available } shape so no callers need to change.
 *
 * The rest of the codebase depends only on the return shape, not the
 * implementation, so this swap will be a single-file change.
 */

import { BUSINESS_HOURS } from '../constants/schedule';

/**
 * Generates an array of 30-minute time-slot objects for a given date,
 * based on the business's operating hours for that day of the week.
 *
 * ── MOCK AVAILABILITY ────────────────────────────────────────────────────────
 *
 * Availability is determined by a *deterministic* pseudo-random formula:
 *
 *   seed = (dateSeed × 7 + timeSeed × 13) % 10
 *   available = seed > 2        → roughly 70% of slots appear available
 *
 * Why deterministic instead of Math.random()?
 *   - The same date always shows the same slots across re-renders and page
 *     refreshes — no confusing "flickering" availability.
 *   - Makes the calendar feel like it reflects real booked data rather than
 *     random noise.
 *
 * Why prime multipliers (7, 13)?
 *   - Primes reduce clustering patterns in the output.
 *   - Without them, nearby time slots tend to show the same availability,
 *     making the pattern look unnaturally uniform.
 *
 * @param {Date} date - The selected calendar date.
 * @returns {TimeSlot[]} An empty array if the business is closed that day.
 *
 * @typedef {{ label: string, available: boolean }} TimeSlot
 */
export function generateTimeSlots(date) {
  // Business is always closed on Sundays (getDay() === 0).
  // Return early to prevent a slot grid from appearing for closed days.
  if (date.getDay() === 0) return [];

  const isSaturday        = date.getDay() === 6;
  const { start, end }    = isSaturday
    ? BUSINESS_HOURS.saturday  // 9 AM – 4 PM
    : BUSINESS_HOURS.weekday;  // 9 AM – 7 PM

  const slots = [];

  for (let hour = start; hour < end; hour++) {
    for (let min = 0; min < 60; min += 30) {

      // ── Format the display label as "H:MM AM/PM" ─────────────────────
      const period      = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const displayMin  = min === 0 ? '00' : '30';
      const label       = `${displayHour}:${displayMin} ${period}`;

      // ── Deterministic availability seed ──────────────────────────────
      // dateSeed: varies by day and month, giving different patterns per date.
      // timeSeed: varies by hour and half-hour, so adjacent slots differ.
      // The modulo 10 keeps the result in [0, 9]; available when > 2 (~70%).
      const dateSeed  = date.getDate() * 31 + date.getMonth() * 365;
      const timeSeed  = hour * 2 + (min / 30); // unique index per slot in a day
      const seed      = (dateSeed * 7 + timeSeed * 13) % 10;
      const available = seed > 2;

      slots.push({ label, available });
    }
  }

  return slots;
}
