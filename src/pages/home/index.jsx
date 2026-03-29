import HeroSection from './sections/HeroSection';
import IntroSection from './sections/IntroSection';
import ServicesSection from './sections/ServicesSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CtaBanner from './sections/CtaBanner';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaBanner />
    </div>
  );
}
