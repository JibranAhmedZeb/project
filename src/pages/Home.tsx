import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import AIEngines from '../components/AIEngines';
import DemoSection from '../components/DemoSection';
import Testimonials from '../components/Testimonials';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <AIEngines />
      <DemoSection />
      <Testimonials />
    </>
  );
};

export default Home;