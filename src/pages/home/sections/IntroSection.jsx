import { Link } from 'react-router-dom';
import philosophyImg from '../../../images/philosophy-section.jpg';
import Reveal from '../../../components/Reveal';
import './IntroSection.css';

export default function IntroSection() {
  return (
    <section className="section section--alt">
      <div className="container intro">
        <Reveal className="intro__text">
          <p className="section-label">Our Philosophy</p>
          <h2 className="section-title">Beauty is a feeling,<br />not just a look.</h2>
          <p className="intro__body">
            At Rejuvi-Skin, we believe that true beauty radiates from within.
            Our approach blends the science of skin health with the art of
            aesthetic enhancement — delivering results that are as meaningful as
            they are visible.
          </p>
          <p className="intro__body">
            Whether you're seeking a transformative skin treatment or precision
            beauty services, our expert team is here to guide you every step of the way.
          </p>
          <Link to="/appointments" className="btn btn--secondary" style={{ marginTop: '1.5rem' }}>
            Start Your Journey
          </Link>
        </Reveal>
        <Reveal delay={150} className="intro__visual">
          <img src={philosophyImg} alt="" className="intro__photo" />
          <div className="intro__stat">
            <span className="intro__stat-num">1,200+</span>
            <span className="intro__stat-label">Happy Clients</span>
          </div>
          <div className="intro__stat intro__stat--2">
            <span className="intro__stat-num">100%</span>
            <span className="intro__stat-label">Satisfaction Rate</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
