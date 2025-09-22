import React from 'react';

// We will adjust these imports in the final step
import { Testimonials, LetsGetStarted, AnimatedCard } from '../App';
import Lottie from "lottie-react";
import rocketAnimation from '../animations/rocket-animation.json';


const AboutUsPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Page Header */}
      <section className="bg-zinc-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <AnimatedCard>
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat">About PrizmPix</h1>
            <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
              We are a passionate team of developers and designers dedicated to building the future of the web.
            </p>
          </AnimatedCard>
        </div>
      </section>

      {/* About Us Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <AnimatedCard>
                <div>
                  <h2 className="text-3xl font-bold font-montserrat mb-4">Our Mission</h2>
                  <p className="text-gray-600 mb-4">
                    At PrizmPix, our mission is to empower businesses by creating beautiful, functional, and high-performance web experiences. We believe a great website is more than just code; it's a powerful tool for growth, engagement, and success.
                  </p>
                  <p className="text-gray-600">
                    We combine cutting-edge technology with human-centered design to craft digital solutions that not only look stunning but also deliver tangible results for our clients. The web is your oyster, and we're here to help you find the pearl.
                  </p>
                </div>
              </AnimatedCard>
              <AnimatedCard delay={200}>
                 <div className="max-w-sm mx-auto">
                    <Lottie animationData={rocketAnimation} />
                 </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <LetsGetStarted />
    </div>
  );
};

export default AboutUsPage;