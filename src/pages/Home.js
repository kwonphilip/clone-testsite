import { Link } from 'react-router-dom';
import './Home.css';

const services = [
  {
    to: '/skin-treatments',
    icon: '◈',
    label: 'Skin Treatments',
    desc: 'HydraFacials, chemical peels, microneedling, and advanced skin therapies tailored to your unique complexion.',
    color: 'rose',
  },
  {
    to: '/beauty-treatments',
    icon: '◇',
    label: 'Beauty Treatments',
    desc: 'Brow artistry, lash enhancements, permanent makeup, and precision beauty services for a polished look.',
    color: 'gold',
  },
  {
    to: '/spa-treatments',
    icon: '◉',
    label: 'Spa Treatments',
    desc: 'Full-body massages, therapeutic wraps, and restorative rituals designed to melt away stress.',
    color: 'sage',
  },
];

const features = [
  { icon: '✦', title: 'Expert Practitioners', desc: 'Our licensed specialists bring years of clinical and aesthetic training to every session.' },
  { icon: '✦', title: 'Premium Products', desc: 'We use only medical-grade and luxury formulations trusted by dermatologists worldwide.' },
  { icon: '✦', title: 'Personalized Care', desc: 'Every treatment begins with a thorough consultation to address your specific goals.' },
  { icon: '✦', title: 'Serene Environment', desc: 'Step into a sanctuary designed for deep relaxation and complete peace of mind.' },
];

const testimonials = [
  { name: 'Alexandra M.', quote: "The HydraFacial left my skin looking absolutely luminous. I've tried countless places — Rejuvi-Skin is in a class of its own.", service: 'Skin Treatment' },
  { name: 'Jordan K.', quote: 'I came in for a deep tissue massage and left feeling like a completely different person. The ambiance alone is worth the visit.', service: 'Spa Treatment' },
  { name: 'Priya S.', quote: 'My brow tinting and lash lift were done perfectly. The attention to detail here is unmatched. Already booked my next appointment!', service: 'Beauty Treatment' },
];

export default function Home() {
  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__content container">
          <p className="hero__eyebrow">Welcome to</p>
          <h1 className="hero__title">
            Rejuvi<span>-Skin</span>
          </h1>
          <p className="hero__tagline">Where Beauty Meets Wellness</p>
          <p className="hero__desc">
            Indulge in a curated collection of skin, beauty, and spa experiences
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
        <div className="hero__scroll-hint" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="section section--alt">
        <div className="container intro">
          <div className="intro__text">
            <p className="section-label">Our Philosophy</p>
            <h2 className="section-title">Beauty is a feeling,<br />not just a look.</h2>
            <p className="intro__body">
              At Rejuvi-Skin, we believe that true beauty radiates from within.
              Our approach blends the science of skin health with the art of
              aesthetic enhancement — delivering results that are as meaningful as
              they are visible.
            </p>
            <p className="intro__body">
              Whether you're seeking a transformative skin treatment, a relaxing
              spa ritual, or precision beauty services, our expert team is here to
              guide you every step of the way.
            </p>
            <Link to="/appointments" className="btn btn--secondary" style={{ marginTop: '1.5rem' }}>
              Start Your Journey
            </Link>
          </div>
          <div className="intro__visual" aria-hidden="true">
            <div className="intro__circle intro__circle--1" />
            <div className="intro__circle intro__circle--2" />
            <div className="intro__ornament">✦</div>
            <div className="intro__stat">
              <span className="intro__stat-num">1,200+</span>
              <span className="intro__stat-label">Happy Clients</span>
            </div>
            <div className="intro__stat intro__stat--2">
              <span className="intro__stat-num">98%</span>
              <span className="intro__stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <p className="section-label">What We Offer</p>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Three distinct pillars of care, each crafted with precision,
              passion, and purpose.
            </p>
          </div>

          <div className="services-grid">
            {services.map(({ to, icon, label, desc, color }) => (
              <Link key={to} to={to} className={`service-card service-card--${color}`}>
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

      {/* ── WHY CHOOSE US ── */}
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

      {/* ── TESTIMONIALS ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header section-header--center">
            <p className="section-label">Client Stories</p>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map(({ name, quote, service }) => (
              <div key={name} className="testimonial-card">
                <div className="testimonial-card__quote-mark">"</div>
                <p className="testimonial-card__text">{quote}</p>
                <div className="testimonial-card__footer">
                  <div className="testimonial-card__avatar">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="testimonial-card__name">{name}</p>
                    <p className="testimonial-card__service">{service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="cta-banner__bg" aria-hidden="true" />
        <div className="container cta-banner__content">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Ready to Begin?
          </p>
          <h2 className="cta-banner__title">
            Your transformation starts here.
          </h2>
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
    </div>
  );
}
