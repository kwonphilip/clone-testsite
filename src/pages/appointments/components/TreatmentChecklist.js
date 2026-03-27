/**
 * TreatmentChecklist — Step 3 of the appointment booking form.
 *
 * Displays all available treatments grouped by category. Clients check any
 * services they're interested in so staff can prepare appropriately before
 * the visit. No selection is required — the checklist is informational,
 * not a binding service selection.
 *
 * @param {Object}      props
 * @param {Set<string>} props.selected - Set of currently checked treatment names.
 * @param {Function}    props.onToggle - Called with a treatment name string to toggle it.
 */

import { TREATMENT_OPTIONS } from '../constants/treatments';

export default function TreatmentChecklist({ selected, onToggle }) {
  return (
    <div className="treatments-checklist">
      {Object.entries(TREATMENT_OPTIONS).map(([category, items]) => (
        <ChecklistGroup
          key={category}
          category={category}
          items={items}
          selected={selected}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

/**
 * ChecklistGroup — One category section within the treatment checklist.
 *
 * Renders a category heading (e.g. "Skin Treatments") followed by a
 * two-column grid of individual ChecklistItem rows.
 *
 * @param {Object}      props
 * @param {string}      props.category - Category display name.
 * @param {string[]}    props.items    - Treatment names in this category.
 * @param {Set<string>} props.selected - Propagated from parent for checked state.
 * @param {Function}    props.onToggle - Propagated from parent.
 */
function ChecklistGroup({ category, items, selected, onToggle }) {
  return (
    <div className="checklist-group">
      <h3 className="checklist-group__title">{category}</h3>
      <div className="checklist-items">
        {items.map(item => (
          <ChecklistItem
            key={item}
            name={item}
            checked={selected.has(item)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * ChecklistItem — A single styled checkbox row.
 *
 * We use a visually-hidden native <input type="checkbox"> paired with a
 * custom-styled box div for two reasons:
 *   1. Accessibility: the native input remains in the accessibility tree,
 *      so keyboard navigation and screen readers work without any ARIA hacks.
 *   2. Design: the custom box can be styled to match the site's design system,
 *      unlike native checkboxes which are browser-dependent.
 *
 * The <label> wraps all child elements so that clicking anywhere on the row
 * (text, box, or padding) toggles the checkbox — a larger hit target.
 *
 * @param {Object}   props
 * @param {string}   props.name      - Treatment display name and identity key.
 * @param {boolean}  props.checked   - Whether this item is currently selected.
 * @param {Function} props.onToggle  - Called with `name` when the checkbox changes.
 */
function ChecklistItem({ name, checked, onToggle }) {
  return (
    <label className={`checklist-item${checked ? ' checklist-item--checked' : ''}`}>

      {/* Native checkbox — visually hidden but present in the accessibility tree */}
      <input
        type="checkbox"
        className="checklist-item__input"
        checked={checked}
        onChange={() => onToggle(name)}
      />

      {/* Custom styled box. aria-hidden because the real input handles a11y. */}
      <span className="checklist-item__box" aria-hidden="true">
        {checked && '✓'}
      </span>

      <span className="checklist-item__label">{name}</span>
    </label>
  );
}
