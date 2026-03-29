import { testimonials } from '../constants';
import Reveal from '../../../components/Reveal';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  return (
    <section className="section section--alt">
      <div className="container">
        <Reveal>
          <div className="section-header section-header--center">
            <p className="section-label">Client Stories</p>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
        </Reveal>

        <div className="testimonials-grid">
          {testimonials.map(({ name, quote, service }, i) => (
            <Reveal key={name} delay={i * 100}>
              <div className="testimonial-card">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
