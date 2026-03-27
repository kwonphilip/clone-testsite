import { Link } from 'react-router-dom';
import { treatments } from './treatments';
import '../Treatments.css';

export default function BeautyTreatments() {
  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <p className="page-hero__label">Our Services</p>
        <h1 className="page-hero__title">Beauty Treatments</h1>
        <p className="page-hero__desc">
          Precision artistry and enhancing techniques that celebrate your natural
          beauty and elevate your everyday look.
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
            <h3>Express your beauty.</h3>
            <p>Book a beauty consultation and let our artists create your perfect look.</p>
            <Link to="/appointments" className="btn btn--primary">
              Book a Beauty Treatment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
