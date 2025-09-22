import React from 'react';

// We will adjust these imports in the final step
import { Features, MoreFeatures, LetsGetStarted, AnimatedCard } from '../App';

const ServicesPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Page Header */}
      <section className="bg-zinc-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <AnimatedCard>
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat">Our Services</h1>
            <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
              We build high-performance digital experiences, from stunning marketing websites to complex web applications.
            </p>
          </AnimatedCard>
        </div>
      </section>

      {/* Reusing existing components */}
      <Features />
      <MoreFeatures />
      <LetsGetStarted />
    </div>
  );
};

export default ServicesPage;