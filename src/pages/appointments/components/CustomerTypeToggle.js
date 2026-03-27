/**
 * CustomerTypeToggle — Step 1 of the appointment booking form.
 *
 * Lets the user identify whether they are a new or returning client.
 * The selection controls which fields are shown in Step 2 (PersonalInfoForm):
 *   - "new"       → full intake form (name, address, contact info)
 *   - "returning" → lightweight lookup (email/phone to find their profile)
 *
 * Implemented as two large tap-target buttons rather than radio inputs
 * so the interaction feels natural on both desktop and mobile.
 *
 * @param {Object}   props
 * @param {string}   props.value    - Currently selected type: 'new' | 'returning'.
 * @param {Function} props.onChange - Called with the new value string when toggled.
 */
export default function CustomerTypeToggle({ value, onChange }) {
  // Each option is defined as data so the render loop stays clean.
  // Adding a third customer type in the future only requires a new entry here.
  const options = [
    {
      id:   'new',
      icon: '✦',
      label: 'New Client',
      desc:  'First visit to Rejuvi-Skin',
    },
    {
      id:   'returning',
      icon: '◈',
      label: 'Returning Client',
      desc:  "I've visited before",
    },
  ];

  return (
    <div className="customer-toggle">
      {options.map(({ id, icon, label, desc }) => (
        <button
          key={id}
          type="button" // Explicit "button" prevents accidental form submission
          className={`customer-toggle__btn${value === id ? ' customer-toggle__btn--active' : ''}`}
          onClick={() => onChange(id)}
          aria-pressed={value === id} // Communicates toggle state to screen readers
        >
          <span className="customer-toggle__icon" aria-hidden="true">{icon}</span>
          <span className="customer-toggle__label">{label}</span>
          <span className="customer-toggle__desc">{desc}</span>
        </button>
      ))}
    </div>
  );
}
