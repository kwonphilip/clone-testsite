/**
 * PersonalInfoForm — Step 2 of the appointment booking form.
 *
 * Conditionally renders one of two form variants based on `customerType`:
 *   - "new"       → NewClientFields:      full intake (name, contact, address)
 *   - "returning" → ReturningClientFields: quick lookup (email or phone)
 *
 * Both variants share the same `form` state object and `onChange` handler
 * from the parent. This means switching between new/returning does NOT
 * lose any already-entered data — the user can go back and forth freely.
 *
 * @param {Object}   props
 * @param {string}   props.customerType - 'new' | 'returning'
 * @param {Object}   props.form         - Full form field values from parent state.
 * @param {Function} props.onChange     - Input change handler: receives a native
 *                                        ChangeEvent and reads event.target.name/value.
 */
export default function PersonalInfoForm({ customerType, form, onChange }) {
  if (customerType === 'returning') {
    return <ReturningClientFields form={form} onChange={onChange} />;
  }
  return <NewClientFields form={form} onChange={onChange} />;
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

/**
 * NewClientFields — Full intake form for first-time visitors.
 *
 * Collects the contact information and mailing address needed to create
 * a new client record. Required fields are marked with a red asterisk.
 */
function NewClientFields({ form, onChange }) {
  return (
    <div className="appt-form-body">

      {/* ── Name ─────────────────────────────────────────────────────── */}
      <div className="form-grid-2">
        <Field id="firstName" label="First Name" required>
          <input
            id="firstName" name="firstName" type="text"
            className="form-input" placeholder="Jane"
            value={form.firstName} onChange={onChange} required
          />
        </Field>
        <Field id="lastName" label="Last Name" required>
          <input
            id="lastName" name="lastName" type="text"
            className="form-input" placeholder="Smith"
            value={form.lastName} onChange={onChange} required
          />
        </Field>
      </div>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <div className="form-grid-2">
        <Field id="email" label="Email Address" required>
          <input
            id="email" name="email" type="email"
            className="form-input" placeholder="jane@example.com"
            value={form.email} onChange={onChange} required
          />
        </Field>
        <Field id="phone" label="Phone Number" required>
          <input
            id="phone" name="phone" type="tel"
            className="form-input" placeholder="(555) 123-4567"
            value={form.phone} onChange={onChange} required
          />
        </Field>
      </div>

      {/* ── Street address ───────────────────────────────────────────── */}
      <Field id="address" label="Street Address">
        <input
          id="address" name="address" type="text"
          className="form-input" placeholder="123 Main Street"
          value={form.address} onChange={onChange}
        />
      </Field>

      {/* ── City / State / ZIP ───────────────────────────────────────── */}
      {/* Uses a 3-column grid: city gets more space than state or zip */}
      <div className="form-grid-3">
        <Field id="city" label="City">
          <input
            id="city" name="city" type="text"
            className="form-input" placeholder="New York"
            value={form.city} onChange={onChange}
          />
        </Field>
        <Field id="state" label="State">
          <input
            id="state" name="state" type="text"
            className="form-input" placeholder="NY"
            maxLength={2} value={form.state} onChange={onChange}
          />
        </Field>
        <Field id="zip" label="ZIP Code">
          <input
            id="zip" name="zip" type="text"
            className="form-input" placeholder="10001"
            value={form.zip} onChange={onChange}
          />
        </Field>
      </div>

    </div>
  );
}

/**
 * ReturningClientFields — Minimal lookup form for existing clients.
 *
 * Staff will use the email or phone number to pull up the client's profile
 * in the booking system, so we only need enough to identify them.
 */
function ReturningClientFields({ form, onChange }) {
  return (
    <div className="appt-form-body">

      {/* Explain why we're only asking for two fields instead of the full form */}
      <p className="appt-returning-note">
        We'll look up your profile using your email or phone number.
      </p>

      <div className="form-grid-2">
        <Field id="lookupEmail" label="Email Address" required>
          <input
            id="lookupEmail" name="lookupEmail" type="email"
            className="form-input" placeholder="jane@example.com"
            value={form.lookupEmail} onChange={onChange} required
          />
        </Field>
        <Field id="lookupPhone" label="Phone Number">
          <input
            id="lookupPhone" name="lookupPhone" type="tel"
            className="form-input" placeholder="(555) 123-4567"
            value={form.lookupPhone} onChange={onChange}
          />
        </Field>
      </div>

    </div>
  );
}

/**
 * Field — Minimal label + input wrapper used throughout the form.
 *
 * Eliminates the repetitive pattern of wrapping every input in a
 * .form-group div with a matching .form-label. The `required` prop
 * appends a visual asterisk while keeping the actual `required`
 * attribute on the native input (which the parent passes via children).
 *
 * @param {Object}          props
 * @param {string}          props.id         - Ties the label's `htmlFor` to the input's `id`.
 * @param {string}          props.label      - Display text for the label.
 * @param {boolean}         [props.required] - Appends a styled asterisk when true.
 * @param {React.ReactNode} props.children   - The <input> or <select> element.
 */
function Field({ id, label, required = false, children }) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
        {/* aria-label "required" prevents screen readers from just saying "asterisk" */}
        {required && <span className="required" aria-label="required"> *</span>}
      </label>
      {children}
    </div>
  );
}
