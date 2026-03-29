import { Link } from 'react-router-dom';
import heroImg from '../../../images/hero-image.jpg.jpg';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow">Welcome to</p>
        <h1 className="hero__title">
          Rejuvi<span>-Skin</span>
        </h1>
        <p className="hero__tagline">Where Beauty Meets Wellness</p>
        <p className="hero__desc">
          Indulge in a curated collection of skin and beauty experiences
          crafted to nourish your body, restore your glow, and renew your spirit.
        </p>
        <div className="hero__actions">
          <Link to="/appointments" className="btn btn--primary btn--lg">
            Book an Appointment
          </Link>
          <Link to="/skin-treatments" className="btn btn--ghost btn--lg">
            Explore Services
          </Link>
        </div>
      </div>
      <div className="hero__image-wrap" aria-hidden="true">
        <img src={heroImg} alt="" className="hero__image" />
      </div>
      <div className="hero__scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
