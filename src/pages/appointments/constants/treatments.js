/**
 * treatments.js — Treatment data and default form state for the Appointments feature.
 *
 * TREATMENT_OPTIONS is derived directly from the three page treatment files
 * (skin-treatments, beauty-treatments, spa-treatments) so that treatment names
 * only ever need to be maintained in one place. Renaming a treatment on its page
 * automatically updates the checklist here with no extra steps.
 */

import { treatments as skinTreatments }    from '../../skin-treatments/treatments';
import { treatments as beautyTreatments }  from '../../beauty-treatments/treatments';

/**
 * All available treatments grouped by category, used to render the
 * treatment-interest checklist in Step 3 of the booking form.
 *
 * @type {Record<string, string[]>}
 */
export const TREATMENT_OPTIONS = {
  'Skin Treatments':   skinTreatments.map(t => t.name),
  'Beauty Treatments': beautyTreatments.map(t => t.name),
};

/**
 * Blank form state used to initialise the appointment form and to reset it
 * after a successful submission.
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
