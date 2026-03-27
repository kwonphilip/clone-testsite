/**
 * AppointmentSidebar — Supplementary information panel shown alongside
 * the appointment booking form.
 *
 * Contains contact details, business hours, and a first-time client perk.
 * Rendered as an <aside> element for correct semantic meaning — this is
 * supporting content, not part of the primary form interaction flow.
 *
 * The sidebar is sticky on desktop (via CSS) so it stays in view as the
 * user scrolls through the multi-step form.
 */

import { DISPLAY_HOURS } from '../constants/schedule';

export default function AppointmentSidebar() {
  return (
    <aside className="appt-sidebar">

      {/* ── Contact information ──────────────────────────────────── */}
      <div className="appt-sidebar__card">
        <h3 className="appt-sidebar__title">Contact Us</h3>
        <SidebarItem icon="📍">
          {/* Using a <span> here (not <address>) because this is inside an aside,
              not a standalone contact block — avoids improper nesting. */}
          123 Bliss Avenue, Suite 4<br />New York, NY 10001
        </SidebarItem>
        <SidebarItem icon="📞">
          <a href="tel:+15551234567">(555) 123-4567</a>
        </SidebarItem>
        <SidebarItem icon="✉">
          <a href="mailto:hello@rejuviskin.com">hello@rejuviskin.com</a>
        </SidebarItem>
      </div>

      {/* ── Business hours ───────────────────────────────────────── */}
      {/* Data sourced from DISPLAY_HOURS constant so it stays in sync
          with the scheduling logic in timeSlotHelpers.js */}
      <div className="appt-sidebar__card">
        <h3 className="appt-sidebar__title">Hours</h3>
        {DISPLAY_HOURS.map(({ days, hours }) => (
          <div key={days} className="appt-sidebar__hours-row">
            <span>{days}</span>
            <span>{hours}</span>
          </div>
        ))}
      </div>

      {/* ── New-client perk callout ──────────────────────────────── */}
      <div className="appt-sidebar__card appt-sidebar__card--note">
        <p className="appt-sidebar__note-text">
          ✦ First-time clients receive a complimentary 15-minute skin
          or wellness consultation before their treatment.
        </p>
      </div>

    </aside>
  );
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

/**
 * SidebarItem — Small layout helper that pairs an icon with a content block.
 *
 * Extracted to remove repetitive flex-layout boilerplate from the main render.
 *
 * @param {Object}          props
 * @param {string}          props.icon     - Emoji or symbol for the left column.
 * @param {React.ReactNode} props.children - Text or link content.
 */
function SidebarItem({ icon, children }) {
  return (
    <div className="appt-sidebar__item">
      {/* aria-hidden on the icon so screen readers don't announce emoji names */}
      <span className="appt-sidebar__icon" aria-hidden="true">{icon}</span>
      <span>{children}</span>
    </div>
  );
}
