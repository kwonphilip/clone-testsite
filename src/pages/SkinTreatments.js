import { Link } from 'react-router-dom';
import './Treatments.css';

const treatments = [
  {
    name: 'HydraFacial',
    price: 'From $185',
    duration: '60 min',
    desc: 'A multi-step facial that cleanses, exfoliates, extracts, and hydrates using advanced vortex-infusion technology. Suitable for all skin types with immediate, visible results.',
    tags: ['Hydration', 'Anti-Aging', 'All Skin Types'],
  },
  {
    name: 'Chemical Peel',
    price: 'From $120',
    duration: '30–45 min',
    desc: 'Customized acid blends that dissolve dead skin cells to reveal fresher, smoother skin beneath. Available in light, medium, and deep formulations.',
    tags: ['Brightening', 'Resurfacing', 'Acne-Prone'],
  },
  {
    name: 'Microneedling',
    price: 'From $250',
    duration: '75 min',
    desc: 'Collagen induction therapy using micro-fine needles to stimulate the skin\'s natural healing response. Reduces fine lines, acne scars, and uneven texture over a series of sessions.',
    tags: ['Collagen Boost', 'Anti-Aging', 'Scar Reduction'],
  },
  {
    name: 'Microdermabrasion',
    price: 'From $95',
    duration: '45 min',
    desc: 'A gentle physical exfoliation using fine crystals or a diamond-tip wand to remove the outermost layer of skin, revealing a brighter, more even complexion.',
    tags: ['Exfoliation', 'Pore Refinement', 'Dull Skin'],
  },
  {
    name: 'LED Light Therapy',
    price: 'From $65',
    duration: '30 min',
    desc: 'Non-invasive photobiomodulation using targeted wavelengths of light to address acne, inflammation, and signs of aging. Often paired with other treatments.',
    tags: ['Acne Control', 'Anti-Inflammatory', 'Healing'],
  },
  {
    name: 'Dermaplaning',
    price: 'From $90',
    duration: '45 min',
    desc: 'A precision blade gently removes vellus hair (peach fuzz) and dead skin cells, leaving the skin exceptionally smooth and primed for optimal product absorption.',
    tags: ['Smoothing', 'Brightening', 'Peach Fuzz Removal'],
  },
  {
    name: 'Oxygen Facial',
    price: 'From $130',
    duration: '60 min',
    desc: 'Pressurized oxygen delivers a potent serum of vitamins, antioxidants, and hyaluronic acid deep into the skin — providing an instant plumping and luminosity boost.',
    tags: ['Hydration', 'Instant Glow', 'Pre-Event'],
  },
  {
    name: 'Lymphatic Drainage Facial',
    price: 'From $110',
    duration: '60 min',
    desc: 'A relaxing, technique-focused facial that uses gentle manual manipulation to encourage lymphatic flow, reducing puffiness, promoting detoxification, and supporting skin clarity.',
    tags: ['Depuffing', 'Detox', 'Redness Reduction'],
  },
];

export default function SkinTreatments() {
  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <p className="page-hero__label">Our Services</p>
        <h1 className="page-hero__title">Skin Treatments</h1>
        <p className="page-hero__desc">
          Science-backed therapies and luxurious rituals designed to transform
          your complexion and address your skin's unique needs.
        </p>
      </div>

      {/* Treatments Grid */}
      <section className="section">
        <div className="container">
          <div className="treatments-grid">
            {treatments.map((t) => (
              <div key={t.name} className="treatment-card">
                <div className="treatment-card__top">
                  <h2 className="treatment-card__name">{t.name}</h2>
                  <span className="treatment-card__price">{t.price}</span>
                </div>
                <p className="treatment-card__duration">⏱ {t.duration}</p>
                <p className="treatment-card__desc">{t.desc}</p>
                <div className="treatment-card__tags">
                  {t.tags.map((tag) => (
                    <span key={tag} className="treatment-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Booking CTA */}
          <div className="treatments-cta">
            <h3>Ready to glow?</h3>
            <p>Schedule a complimentary skin consultation and find the right treatment for you.</p>
            <Link to="/appointments" className="btn btn--primary">
              Book a Skin Treatment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
