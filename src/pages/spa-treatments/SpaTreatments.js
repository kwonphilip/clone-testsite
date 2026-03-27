import { Link } from 'react-router-dom';
import { treatments } from './treatments';
import '../Treatments.css';

const treatments = [
  {
    name: 'Swedish Massage',
    price: 'From $95',
    duration: '60 or 90 min',
    desc: 'The classic full-body relaxation massage using long, flowing strokes, kneading, and circular movements to ease muscle tension, improve circulation, and induce a profound sense of calm.',
    tags: ['Relaxation', 'Stress Relief', 'Full Body'],
  },
  {
    name: 'Deep Tissue Massage',
    price: 'From $115',
    duration: '60 or 90 min',
    desc: 'Targets the deeper layers of muscle and connective tissue using slow, deliberate strokes and firm pressure. Ideal for chronic muscle pain, postural problems, and injury recovery.',
    tags: ['Therapeutic', 'Muscle Recovery', 'Tension Relief'],
  },
  {
    name: 'Hot Stone Massage',
    price: 'From $130',
    duration: '75 or 90 min',
    desc: 'Smooth, heated basalt stones are placed along key points of the body and used as massage tools. The warmth penetrates deeply into the muscles, promoting exceptional relaxation and circulation.',
    tags: ['Deep Relaxation', 'Heat Therapy', 'Circulation'],
  },
  {
    name: 'Aromatherapy Massage',
    price: 'From $105',
    duration: '60 or 90 min',
    desc: 'A holistic treatment combining Swedish massage techniques with the therapeutic benefits of pure essential oil blends — customized for your mood, stress levels, and wellness goals.',
    tags: ['Holistic', 'Stress Relief', 'Mood Enhancement'],
  },
  {
    name: 'Couples Massage',
    price: 'From $200',
    duration: '60 or 90 min',
    desc: 'Share the gift of relaxation with a partner, friend, or loved one in our private couples suite. Each guest receives a full Swedish or deep tissue massage simultaneously.',
    tags: ['For Two', 'Private Suite', 'Gift Experience'],
  },
  {
    name: 'Body Wrap',
    price: 'From $145',
    duration: '75 min',
    desc: 'A full-body treatment where a nourishing mask of minerals, botanicals, or clay is applied and then cocooned to maximize absorption. Deeply hydrating, detoxifying, and restorative.',
    tags: ['Detox', 'Hydration', 'Skin Softening'],
  },
  {
    name: 'Salt & Sugar Scrub',
    price: 'From $100',
    duration: '60 min',
    desc: 'A full-body exfoliation ritual using a blend of sea salts or sugar crystals with nourishing oils and botanicals to slough away dry, dull skin — revealing silky-smooth results.',
    tags: ['Exfoliation', 'Glow', 'Silky Skin'],
  },
  {
    name: 'Reflexology',
    price: 'From $75',
    duration: '45 min',
    desc: 'A targeted foot and lower leg treatment based on the principle that specific points on the feet correspond to organs and systems throughout the body. Deeply relaxing and balancing.',
    tags: ['Foot Treatment', 'Balancing', 'Holistic'],
  },
];

export default function SpaTreatments() {
  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <p className="page-hero__label">Our Services</p>
        <h1 className="page-hero__title">Spa Treatments</h1>
        <p className="page-hero__desc">
          Immersive body therapies and restorative rituals that soothe the mind,
          heal the body, and nourish the spirit.
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
            <h3>Your sanctuary awaits.</h3>
            <p>Reserve your spa experience and let the healing begin.</p>
            <Link to="/appointments" className="btn btn--primary">
              Book a Spa Treatment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
