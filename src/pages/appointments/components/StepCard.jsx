/**
 * StepCard — A reusable card wrapper for each numbered step in the
 * appointment booking form.
 *
 * Provides consistent outer chrome (border, shadow, step label, title,
 * optional subtitle) so that individual step components only need to
 * worry about their own inner content — not the card structure.
 *
 * The CSS classes used here (.appt-card, .appt-card__header, etc.) are
 * defined in Appointments.css at the page level so they stay available to
 * all child components without additional imports.
 *
 * @param {Object}          props
 * @param {number|string}   props.step       - Step number (e.g. 1, 2, …).
 * @param {string}          props.title      - Primary card heading.
 * @param {string}          [props.subtitle] - Optional descriptive subtext below the title.
 * @param {React.ReactNode} props.children   - Card body content (the actual step UI).
 */
export default function StepCard({ step, title, subtitle, children }) {
  // Zero-pad single-digit numbers to produce "01", "02", … for a consistent
  // typographic rhythm in the step indicator.
  const stepLabel = String(step).padStart(2, '0');

  return (
    <div className="appt-card">
      <div className="appt-card__header">
        <span className="appt-step">{stepLabel}</span>
        <h2 className="appt-card__title">{title}</h2>
        {/* Only render the subtitle element if text was provided */}
        {subtitle && <p className="appt-card__subtitle">{subtitle}</p>}
      </div>

      {/* Children render directly inside the card with no extra wrapper —
          each step component is responsible for its own internal padding
          (typically using the .appt-form-body class or its own custom layout). */}
      {children}
    </div>
  );
}
