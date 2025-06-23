import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import AIEngines from './components/AIEngines';
import DemoSection from './components/DemoSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <Hero />
      <HowItWorks />
      <AIEngines />
      <DemoSection />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;