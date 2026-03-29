import skinImg from '../../images/home-skin.jpg';
import beautyImg from '../../images/home-beauty.jpg';

export const services = [
  {
    to: '/skin-treatments',
    icon: '◈',
    label: 'Skin Treatments',
    desc: 'HydraFacials, chemical peels, microneedling, and advanced skin therapies tailored to your unique complexion.',
    color: 'rose',
    img: skinImg,
  },
  {
    to: '/beauty-treatments',
    icon: '◇',
    label: 'Beauty Treatments',
    desc: 'Brow artistry, lash enhancements, permanent makeup, and precision beauty services for a polished look.',
    color: 'gold',
    img: beautyImg,
  },
];

export const features = [
  { icon: '✦', title: 'Expert Practitioners', desc: 'Our licensed specialists bring years of clinical and aesthetic training to every session.' },
  { icon: '✦', title: 'Premium Products',     desc: 'We use only medical-grade and luxury formulations trusted by dermatologists worldwide.' },
  { icon: '✦', title: 'Personalized Care',    desc: 'Every treatment begins with a thorough consultation to address your specific goals.' },
  { icon: '✦', title: 'Serene Environment',   desc: 'Step into a sanctuary designed for deep relaxation and complete peace of mind.' },
];

export const testimonials = [
  { name: 'Alexandra M.', quote: "The HydraFacial left my skin looking absolutely luminous. I've tried countless places — Rejuvi-Skin is in a class of its own.", service: 'Skin Treatment' },
  { name: 'Jordan K.',    quote: 'The lash lift completely transformed my look — so natural yet so striking. The attention to detail from start to finish was exceptional.', service: 'Beauty Treatment' },
  { name: 'Priya S.',     quote: 'My brow tinting and lash lift were done perfectly. The attention to detail here is unmatched. Already booked my next appointment!', service: 'Beauty Treatment' },
];
