import { testimonials } from '../constants';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  return (
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
  );
}
