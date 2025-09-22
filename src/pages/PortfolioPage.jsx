import React from 'react';

// We will adjust these imports in the final step
import { Testimonials, LetsGetStarted, AnimatedCard } from '../App';

// Placeholder data for your projects
const projects = [
  {
    title: 'Quantum Dynamics',
    description: 'A cutting-edge marketing website for a tech startup, featuring complex animations and a headless CMS for their blog.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=870&q=80',
    link: '#',
  },
  {
    title: 'Echo Valley Goods',
    description: 'A full-featured e-commerce platform with secure payments, inventory management, and a custom user dashboard.',
    imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=870&q=80',
    link: '#',
  },
  {
    title: 'Celestial Events',
    description: 'An elegant and responsive site for a high-end event planning company, focused on visual storytelling and user experience.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=870&q=80',
    link: '#',
  },
];

const PortfolioPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Page Header */}
      <section className="bg-zinc-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <AnimatedCard>
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat">Our Work</h1>
            <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
              We are proud of the solutions we've delivered. Here is a selection of our favorite projects.
            </p>
          </AnimatedCard>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <AnimatedCard key={index} delay={index * 150}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
                    <a href={project.link} className="text-[#2FBD90] font-bold hover:underline mt-auto">
                      View Project &rarr;
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <LetsGetStarted />
    </div>
  );
};

export default PortfolioPage;