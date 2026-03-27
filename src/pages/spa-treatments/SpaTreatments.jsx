import { Link } from 'react-router-dom';
import { treatments } from './treatments';
import '../Treatments.css';

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
