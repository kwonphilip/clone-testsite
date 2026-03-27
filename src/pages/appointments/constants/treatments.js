/**
 * treatments.js — Treatment menu data and default form state for the
 * Appointments feature.
 *
 * Keeping these in a dedicated constants file makes it easy to add,
 * remove, or rename services without touching any component or helper logic.
 * When the service menu changes, this is the only file that needs updating.
 */

/**
 * All available treatments grouped by category.
 * Used in Step 3 to render the treatment-interest checklist.
 *
 * Object key  → category heading displayed above each group.
 * Array value → individual service names within that category.
 *
 * @type {Record<string, string[]>}
 */
export const TREATMENT_OPTIONS = {
  'Skin Treatments': [
    'HydraFacial',
    'Chemical Peel',
    'Microneedling',
    'Microdermabrasion',
    'LED Light Therapy',
    'Dermaplaning',
    'Oxygen Facial',
    'Lymphatic Drainage Facial',
  ],
  'Beauty Treatments': [
    'Full Makeup Application',
    'Brow Shaping & Tinting',
    'Lash Lift & Tint',
    'Classic Lash Extensions',
    'Volume Lash Extensions',
    'Lip Blush (PMU)',
    'Microblading',
    'Waxing Services',
  ],
  'Spa Treatments': [
    'Swedish Massage',
    'Deep Tissue Massage',
    'Hot Stone Massage',
    'Aromatherapy Massage',
    'Couples Massage',
    'Body Wrap',
    'Salt & Sugar Scrub',
    'Reflexology',
  ],
};

/**
 * Blank form state used to initialize the appointment form and to reset
 * it after a successful submission.
 *
 * All new-client and returning-client fields live in one flat object so
 * the parent can use a single useState call and a single onChange handler.
 * Fields irrelevant to the current customerType are simply ignored on submit.
 */
export const INITIAL_FORM = {
  // ── New-client intake fields ─────────────────────────────────────────────
  firstName: '',
  lastName:  '',
  email:     '',
  phone:     '',
  address:   '',
  city:      '',
  state:     '',
  zip:       '',

  // ── Returning-client lookup fields ───────────────────────────────────────
  // Separate from `email`/`phone` so switching customer type doesn't clear
  // one set while the user is filling out the other.
  lookupEmail: '',
  lookupPhone: '',

  // ── Shared ───────────────────────────────────────────────────────────────
  notes: '',
};
