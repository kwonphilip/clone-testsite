import { Link } from 'react-router-dom';
import { treatments } from './treatments';
import '../Treatments.css';

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
                {/* First-visit price badge — only shown when available */}
                {t.firstPrice && (
                  <span className="treatment-card__first-badge">
                    First facial {t.firstPrice}
                  </span>
                )}
                <div className="treatment-card__top">
                  <h2 className="treatment-card__name">{t.name}</h2>
                  <span className="treatment-card__price">{t.price}</span>
                </div>
                <p className="treatment-card__desc">{t.desc}</p>
                <Link to="/appointments" className="treatment-card__cta">
                  Book now →
                </Link>
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
