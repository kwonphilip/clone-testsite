import { Link } from 'react-router-dom';
import { services } from '../constants';
import './ServicesSection.css';

export default function ServicesSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header section-header--center">
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Two distinct pillars of care, each crafted with precision,
            passion, and purpose.
          </p>
        </div>

        <div className="services-grid">
          {services.map(({ to, icon, label, desc, color, img }) => (
            <Link key={to} to={to} className={`service-card service-card--${color}`}>
              <img src={img} alt={label} className="service-card__img" />
              <div className="service-card__icon">{icon}</div>
              <h3 className="service-card__title">{label}</h3>
              <p className="service-card__desc">{desc}</p>
              <span className="service-card__cta">
                Explore <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
