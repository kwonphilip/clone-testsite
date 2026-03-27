/**
 * SuccessScreen — Full-page confirmation shown after the appointment
 * form is successfully submitted.
 *
 * Displays a celebratory message with the booked date, time, and email
 * address, then offers a button to reset all state and start a new booking.
 *
 * This is a pure presentational component — all state management and the
 * reset logic live in the parent (Appointments.js), keeping this file simple.
 *
 * @param {Object}      props
 * @param {Date|null}   props.selectedDate - The date the client selected, or null.
 * @param {string|null} props.selectedTime - The time slot label the client chose, or null.
 * @param {string}      props.email        - Email to show in the confirmation message.
 * @param {Function}    props.onReset      - Callback that clears all state and returns
 *                                           the user to the empty booking form.
 */

import { MONTH_NAMES } from '../constants/schedule';

export default function SuccessScreen({ selectedDate, selectedTime, email, onReset }) {
  // Build a human-readable appointment string only when both date and time
  // were selected. If the user submitted without choosing a slot, we omit
  // that portion of the confirmation to avoid showing incomplete info.
  const appointmentDetail =
    selectedDate && selectedTime
      ? ` on ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()} at ${selectedTime}`
      : '';

  return (
    <div className="appt-success">

      {/* Animated ornament — adds a celebratory feel to the confirmation */}
      <div className="appt-success__icon" aria-hidden="true">✦</div>

      <h1 className="appt-success__title">You're all set!</h1>

      <p className="appt-success__desc">
        Thank you for booking with Rejuvi-Skin. We'll reach out shortly to
        confirm your appointment{appointmentDetail}.
      </p>

      {/* Only show the email line when an address is available */}
      {email && (
        <p className="appt-success__desc">
          A confirmation will be sent to <strong>{email}</strong>.
        </p>
      )}

      <button
        className="btn btn--primary btn--lg"
        style={{ marginTop: '2rem' }}
        onClick={onReset}
      >
        Book Another Appointment
      </button>

    </div>
  );
}
