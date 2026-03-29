import { Link } from 'react-router-dom';
import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__bg" aria-hidden="true" />
      <div className="container cta-banner__content">
        <p className="section-label cta-banner__label">Ready to Begin?</p>
        <h2 className="cta-banner__title">Your transformation starts here.</h2>
        <p className="cta-banner__desc">
          Book your personalized consultation and treatment today.
          New and returning clients welcome.
        </p>
        <div className="cta-banner__actions">
          <Link to="/appointments" className="btn btn--primary btn--lg">
            Book Now
          </Link>
          <a href="tel:+15551234567" className="btn btn--ghost btn--lg">
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
