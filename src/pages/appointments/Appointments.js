/**
 * Appointments.js — The main appointment booking page.
 *
 * This component acts as the top-level orchestrator for the booking flow.
 * Its responsibilities are:
 *   1. Own all form state (customer type, form fields, selections, submission).
 *   2. Derive computed values from state (visible dates, canLoadMore).
 *   3. Define event handlers and pass them down to child components.
 *   4. Render the multi-step form layout using sub-components.
 *
 * It intentionally contains NO business logic or rendering detail — those
 * are delegated to the focused components in ./components/.
 * The helpers in ./helpers/ and constants in ./constants/
 * handle all data transformation and configuration.
 *
 * ── FORM STEPS ───────────────────────────────────────────────────────────────
 *   Step 1 — CustomerTypeToggle:  New or returning client?
 *   Step 2 — PersonalInfoForm:    Contact and address info.
 *   Step 3 — TreatmentChecklist:  Which treatments interest you?
 *   Step 4 — DateTimePicker:      Calendar + time slot selection.
 *   Step 5 — Notes & Submit:      Final notes and form submission (inline).
 *
 * ── ROUTING ──────────────────────────────────────────────────────────────────
 *   Rendered at /appointments via React Router (configured in App.js).
 */

import { useState, useCallback } from 'react';

// ── Sub-components ─────────────────────────────────────────────────────────
import StepCard           from './components/StepCard';
import CustomerTypeToggle from './components/CustomerTypeToggle';
import PersonalInfoForm   from './components/PersonalInfoForm';
import TreatmentChecklist from './components/TreatmentChecklist';
import DateTimePicker     from './components/DateTimePicker';
import AppointmentSidebar from './components/AppointmentSidebar';
import SuccessScreen      from './components/SuccessScreen';

// ── Constants ──────────────────────────────────────────────────────────────
import { INITIAL_FORM }           from './constants/treatments';
import { DAY_NAMES, MONTH_NAMES } from './constants/schedule';

import './Appointments.css';

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Appointments() {

  // ── State ──────────────────────────────────────────────────────────────

  /** Whether the visitor is a 'new' or 'returning' client. Controls Step 2 fields. */
  const [customerType, setCustomerType] = useState('new');

  /** All form field values (shared between new and returning client variants). */
  const [form, setForm] = useState(INITIAL_FORM);

  /** Set of treatment names the client has checked in Step 3. */
  const [selectedTreatments, setSelectedTreatments] = useState(new Set());

  /** The calendar date the client has selected, or null. */
  const [selectedDate, setSelectedDate] = useState(null);

  /** The time slot label the client has selected (e.g. "10:00 AM"), or null. */
  const [selectedTime, setSelectedTime] = useState(null);

  /** Whether the form has been submitted (shows SuccessScreen when true). */
  const [submitted, setSubmitted] = useState(false);

  // ── Event handlers ─────────────────────────────────────────────────────

  /**
   * Updates a single form field when the user types.
   * Wrapped in useCallback to keep the reference stable, preventing
   * PersonalInfoForm from re-rendering unnecessarily on parent re-renders.
   */
  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  /**
   * Adds or removes a treatment name from the selected set.
   * We create a new Set rather than mutating the existing one — React
   * requires a new reference to detect a state change and trigger a re-render.
   */
  const handleTreatmentToggle = useCallback((name) => {
    setSelectedTreatments(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }, []);

  /**
   * Selects a date in the calendar. Resets the time selection because the
   * available slots differ per day — keeping a stale time would be misleading.
   */
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  /**
   * Handles form submission.
   *
   * ── GOOGLE CALENDAR / SCHEDULER API PLACEHOLDER ──────────────────────────
   *
   * TODO: Replace the setSubmitted(true) call below with an API request to
   *       a real scheduling backend. Suggested steps:
   *
   *   1. Set up OAuth 2.0 credentials in Google Cloud Console and configure
   *      a backend proxy (the client-side app must NOT hold API keys directly).
   *   2. POST appointment data to your backend endpoint (e.g. /api/appointments).
   *   3. The backend uses the Google Calendar API (events.insert) to create
   *      a calendar event with the selected date, time, and client info.
   *   4. Send a confirmation email to the client via SendGrid, Resend, etc.
   *   5. Replace generateTimeSlots() in timeSlotHelpers.js with a function
   *      that fetches real availability from the calendar before rendering.
   *
   * Example call:
   *   await fetch('/api/appointments', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify({
   *       form,
   *       selectedTreatments: [...selectedTreatments],
   *       selectedDate,
   *       selectedTime,
   *     }),
   *   });
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Resets all state back to initial values, returning the user to a blank form.
   * Called from SuccessScreen's "Book Another Appointment" button.
   */
  const handleReset = () => {
    setCustomerType('new');
    setForm(INITIAL_FORM);
    setSelectedTreatments(new Set());
    setSelectedDate(null);
    setSelectedTime(null);
    setSubmitted(false);
  };

  // ── Success screen ─────────────────────────────────────────────────────

  if (submitted) {
    return (
      <SuccessScreen
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        // Show whichever email field is populated depending on customer type
        email={form.email || form.lookupEmail}
        onReset={handleReset}
      />
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────

  return (
    <div>

      {/* Page hero banner */}
      <div className="page-hero">
        <p className="page-hero__label">Get Started</p>
        <h1 className="page-hero__title">Book an Appointment</h1>
        <p className="page-hero__desc">
          Fill out the form below and we'll confirm your visit.
          New and returning clients are always welcome.
        </p>
      </div>

      <section className="section">
        <div className="container appt-layout">

          {/* ── Multi-step form ────────────────────────────────────── */}
          <form className="appt-form" onSubmit={handleSubmit} noValidate>

            {/* Step 1 — Customer type */}
            <StepCard step={1} title="Are you a new or returning client?">
              <CustomerTypeToggle
                value={customerType}
                onChange={setCustomerType}
              />
            </StepCard>

            {/* Step 2 — Personal information */}
            <StepCard step={2} title="Your Information">
              <PersonalInfoForm
                customerType={customerType}
                form={form}
                onChange={handleFormChange}
              />
            </StepCard>

            {/* Step 3 — Treatment interests */}
            <StepCard
              step={3}
              title="Treatment Interests"
              subtitle="Select all that interest you — this helps us prepare for your visit."
            >
              <TreatmentChecklist
                selected={selectedTreatments}
                onToggle={handleTreatmentToggle}
              />
            </StepCard>

            {/* Step 4 — Date and time picker */}
            <StepCard
              step={4}
              title="Choose a Date & Time"
              subtitle="Open Mon–Sat, 9 AM–7 PM (Sat until 4 PM). Sundays closed."
            >
              {/* DateTimePicker manages its own padding, so no .appt-form-body wrapper */}
              <DateTimePicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateSelect={handleDateSelect}
                onTimeSelect={setSelectedTime}
              />
            </StepCard>

            {/* Step 5 — Additional notes and submission */}
            <StepCard
              step={5}
              title="Additional Notes"
              subtitle="Skin sensitivities, allergies, or any special requests."
            >
              <div className="appt-form-body">

                {/* Notes textarea */}
                <div className="form-group">
                  <label className="form-label" htmlFor="notes">
                    Notes <span style={{ color: 'var(--color-text-light)', fontWeight: 400 }}>(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-input"
                    rows={4}
                    placeholder="e.g. I have sensitive skin and a latex allergy…"
                    value={form.notes}
                    onChange={handleFormChange}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Booking summary — only shows items that have been selected */}
                <AppointmentSummary
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedTreatments={selectedTreatments}
                />

                {/* Submit */}
                <button type="submit" className="btn btn--primary btn--lg appt-submit-btn">
                  Request Appointment
                </button>
                <p className="appt-disclaimer">
                  By submitting this form, you agree to be contacted by Rejuvi-Skin
                  to confirm your appointment. No payment is required at this time.
                </p>

              </div>
            </StepCard>

          </form>

          {/* ── Sidebar ───────────────────────────────────────────── */}
          <AppointmentSidebar />

        </div>
      </section>
    </div>
  );
}

// ── INLINE SUB-COMPONENT ──────────────────────────────────────────────────────

/**
 * AppointmentSummary — Shows a live preview of the client's selections
 * at the bottom of Step 5 before they submit.
 *
 * Kept inline in this file (rather than extracted to components/) because
 * it is small, used exactly once, and depends directly on DAY_NAMES and
 * MONTH_NAMES which are already imported at the top of this file.
 *
 * @param {Object}      props
 * @param {Date|null}   props.selectedDate       - The chosen date, or null.
 * @param {string|null} props.selectedTime       - The chosen time label, or null.
 * @param {Set<string>} props.selectedTreatments - Set of checked treatment names.
 */
function AppointmentSummary({ selectedDate, selectedTime, selectedTreatments }) {
  // Don't render anything if nothing has been selected yet
  const hasDate       = selectedDate && selectedTime;
  const hasTreatments = selectedTreatments.size > 0;

  if (!hasDate && !hasTreatments) return null;

  return (
    <div className="appt-summary">

      {hasDate && (
        <div className="appt-summary__item">
          <span className="appt-summary__icon" aria-hidden="true">📅</span>
          <span>
            <strong>
              {DAY_NAMES[selectedDate.getDay()]},{' '}
              {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getDate()}
            </strong>
            {' '}at <strong>{selectedTime}</strong>
          </span>
        </div>
      )}

      {hasTreatments && (
        <div className="appt-summary__item">
          <span className="appt-summary__icon" aria-hidden="true">✦</span>
          <span>
            <strong>
              {selectedTreatments.size} treatment{selectedTreatments.size > 1 ? 's' : ''}
            </strong>
            {' '}of interest: {[...selectedTreatments].join(', ')}
          </span>
        </div>
      )}

    </div>
  );
}
