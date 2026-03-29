import { features } from '../constants';
import './FeaturesSection.css';

export default function FeaturesSection() {
  return (
    <section className="section section--accent">
      <div className="container">
        <div className="section-header section-header--center">
          <p className="section-label">Why Rejuvi-Skin</p>
          <h2 className="section-title">The Rejuvi Difference</h2>
          <p className="section-subtitle">
            We hold ourselves to a higher standard — because you deserve nothing less.
          </p>
        </div>

        <div className="features-grid">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="feature-card">
              <div className="feature-card__icon">{icon}</div>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
