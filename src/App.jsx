import { useState, useEffect, useRef } from 'react';
import Lottie from "lottie-react";
import { lazy, Suspense } from "react";

// Main App Component
// This component orchestrates the rendering of all other components.
function App() {
    // The main container now sets the default off-white background and dark text color.
    return (
        <div className="bg-gray-100 text-gray-900 font-sans">
            <Header />
            <main>
                <Hero />
                <Features />
                <MoreFeatures />
                <LetsGetStarted />
                <Partners />
            </main>
            <Footer />
        </div>
    );
}

// UnscrambleText Component
// This component creates a text unscrambling animation effect.
const UnscrambleText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const ref = useRef(null);
    const animationFrameRef = useRef();
    const lastTimeRef = useRef(0);
    const iterationRef = useRef(0);
    
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    const animate = (time) => {
        if (time - lastTimeRef.current < 20) { // Increased speed
            animationFrameRef.current = requestAnimationFrame(animate);
            return;
        }
        
        const newText = text
            .split('')
            .map((letter, index) => {
                if (index < iterationRef.current) {
                    return text[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
            
        setDisplayedText(newText);

        if (iterationRef.current >= text.length) {
            setDisplayedText(text);
            cancelAnimationFrame(animationFrameRef.current);
            return;
        }

        iterationRef.current += 1 / 2; // Control animation speed
        lastTimeRef.current = time;
        animationFrameRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    iterationRef.current = 0;
                    lastTimeRef.current = 0;
                    if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = requestAnimationFrame(animate);
                } else {
                    cancelAnimationFrame(animationFrameRef.current);
                    setDisplayedText('');
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [text]);

    return <h2 ref={ref} className="text-4xl md:text-6xl font-bold text-[#2FBD90] mb-2 h-16">{displayedText}</h2>;
};

// AnimatedCard Component
// This component handles the scroll-triggered animation for individual cards
const AnimatedCard = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Add a small delay for staggered animation
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully visible
            }
        );

        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [delay]);

    return (
        <div
            ref={cardRef}
            className={`transform transition-all duration-700 ease-out ${
                isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
            }`}
        >
            {children}
        </div>
    );
};

// Header Component
const Header = () => {
    return (
        <header className="absolute top-0 left-0 right-0 z-20">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="flex items-center transform hover:scale-110 transition-transform duration-300">
                   <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xl font-bold">PrizmPix</span>
                </a>
                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#" className="text-gray-300 hover:text-white">About Us</a>
                    <a href="#" className="text-gray-300 hover:text-white">Features</a>
                    <a href="#" className="text-gray-300 hover:text-white">Services</a>
                </nav>
                <a href="#contact-form" className="hidden md:block bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg border border-gray-600 transition-colors duration-700">
                    Contact Us
                </a>
            </div>
        </header>
    );
};

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(100); // initial font size in px

  useEffect(() => {
     const resizeText = () => {
      if (containerRef.current) {
    const containerWidth = containerRef.current.offsetWidth * 0.9;
    const containerHeight = containerRef.current.offsetHeight * 0.8;

    const baseFontSize = 100; // starting reference
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = `${baseFontSize}px Arial`;
    const textWidth = ctx.measureText("Custom Website Builds").width;

    const scaleByWidth = containerWidth / textWidth;
    const scaleByHeight = containerHeight / baseFontSize;

    const newFontSize = Math.min(baseFontSize * scaleByWidth, baseFontSize * scaleByHeight, 200);
    setFontSize(newFontSize);
  }
};


    resizeText(); // initial resize
    window.addEventListener("resize", resizeText);
    return () => window.removeEventListener("resize", resizeText);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center bg-black overflow-hidden px-6 md:px-12">
      {/* GIF Masked Text */}
      <div ref={containerRef} className="relative w-full max-w-7xl mx-auto" style={{ height: "50vh" }}>
        <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <mask id="text-mask" maskUnits="userSpaceOnUse">
              <text
  ref={textRef}
  x="50%"
  y="50%"
  textAnchor="middle"
  dominantBaseline="middle"
  fontWeight="bold"
  fill="white"
  style={{ 
      fontSize: `clamp(100px, ${fontSize}px, 200px)` // min 40px, max 200px
  }}
>
  Custom Website Builds
</text>
            </mask>
          </defs>

          <image
            href="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHhyNHlyZWVyMnZtY2x0aGpjMDE4cnVob3VqcTJoZTNwbjA4dnhyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jQgiGjRETNkCeY9JBS/giphy.gif"
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#text-mask)"
          />
        </svg>
      </div>

      {/* Hero content */}
      <div className="relative z-20 max-w-4xl mx-auto mt-[-3rem] px-4 text-center">
  {/* Optional negative margin to pull content closer to GIF */}
  
  {/* Subtitle between title and paragraph */}
  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
    Unique Technology
  </h3>

  <p className="text-lg md:text-xl text-gray-300 mb-6 px-4 md:px-0">
    Harness the beauty, functionality and power of PrizmPix's cutting-edge responsive websites and bring value to your customers. The web is your oyster.
  </p>

  <div className="mb-8">
    <h2 className="text-4xl md:text-3xl font-bold text-white">Unleash Web Power</h2>
    <UnscrambleText text="for humans" />
  </div>

  <button className="bg-gradient-to-r from-[#2FBD90] to-[#3BD6A2] hover:from-[#2ab584] hover:to-[#36c796] text-black font-bold py-3 px-8 rounded-lg text-lg transition-all duration-700">
    Learn More
  </button>
</div>
    </section>
  );
};


const Spline = lazy(() => import("@splinetool/react-spline"));

const Features = () => {
  return (
    <section className="pt-10 pb-3">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Features</h2>

        {/* Grid wrapper for first two cards */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Left Card - Floating 3D Spline */}
          <AnimatedCard delay={100}>
            <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col relative overflow-hidden">
              {/* Spline 3D object */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80">
                <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse" />}>
                  <Spline scene="https://prod.spline.design/OmYUREdRpX9-3fGW/scene.splinecode" />
                </Suspense>
              </div>

              {/* Card text content */}
              <div className="mt-64 md:mt-72 flex flex-col flex-1 relative z-10">
                <h3 className="text-xl font-bold mb-4">Innovative 3D Design</h3>
                <p className="text-gray-600 mb-4">
                  Experience interactive 3D objects integrated into your website that float above your content.
                </p>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors duration-700">
                  Explore
                </button>
              </div>
            </div>
          </AnimatedCard>

          {/* Right Card - Text on top, image on bottom third */}
          <AnimatedCard delay={200}>
            <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4">
                  Tailored Solutions
                </h3>
                <p className="text-gray-600 mb-4">
                  Our B2B solutions give your workflow a boost. Manage orders, analytics, and dashboards efficiently.
                </p>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors duration-700">
                  Discover
                </button>
              </div>
              <div className="mt-4 h-32 md:h-48 w-full overflow-hidden rounded-lg">
                <img
                  src="/images/feature-bottom.jpg"
                  alt="Tailored solutions"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Full-width third card */}
        <div className="md:col-span-2 mt-6">
          <AnimatedCard delay={300}>
            <div className="bg-white p-8 rounded-xl shadow-md h-full">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left side */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">Responsive Designs</h3>
                  <p className="text-gray-600 mb-6">
                    We offer responsive designs, ensuring a seamless user experience across various devices and screen sizes.
                  </p>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-700">
                    Get A Quote
                  </button>
                </div>

                {/* Right side */}
                <div className="relative">
                  <div className="bg-pink-500 p-6 rounded-lg text-center text-white font-bold text-2xl transform -rotate-3">
                    Beauty is not in the eye of the beholder
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white text-black p-2 rounded-full flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>

      </div>
    </section>
  );
};




// MoreFeatures Component - now with 4 cards including Lottie Animations
const MoreFeatures = () => {
    const features = [
        { 
            title: "Content Creation", 
            description: "Produce content that sells, allowing you to manage your services independently or leverage our expertise. We offer photography, videography, copy, visuals, and interactive content optimized for SEO and user engagement.", 
            imageUrl: "/content.webp" 
        },
        { 
            title: "Marketing Services", 
            description: "Improve your online presence with custom marketing packages from email marketing, and targeted advertising to social media marketing. We analyze and improve the performance of ads to drive brand awareness and conversions.", 
            imageUrl: "/marketing.png" 
        },
        { 
            title: "Ecommerce Solutions", 
            description: "Our ecommerce solutions are tailored to grow your business, featuring high-end and secure features. We focus on user experience and fast page loading, ensuring reliability even during peak seasons.", 
            imageUrl: "/ecommerce.jpg" 
        },
        { 
            title: "Lottie Animations", 
            description: "Bring your website to life with lightweight, high-quality animations using Lottie. Smooth vector animations enhance user engagement, reduce load times compared to GIFs, and add a modern interactive flair to your content.", 
            imageUrl: "https://lottie.host/31d9b354-8bb8-4b40-8fac-2f92f40c6072/zzlp2CK9Ti.json" 
        }
    ];
    
    return (
        <section className="py-3">
            <div className="container mx-auto px-6">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <AnimatedCard key={index} delay={index * 150}>
                            <div className="bg-white rounded-xl overflow-hidden shadow-md h-full flex flex-col">
                                <img src={feature.imageUrl} alt={feature.title} className="w-full h-48 object-cover"/>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 mb-4 flex-1">{feature.description}</p>
                                    <button className="bg-gradient-to-r from-[#2FBD90] to-[#3BD6A2] hover:from-[#2ab584] hover:to-[#36c796] text-black px-4 py-2 rounded-md transition-all duration-700 mt-auto">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </AnimatedCard>
                    ))}
                </div>
            </div>
        </section>
    );
};


// LetsGetStarted Component - Now has animation
const LetsGetStarted = () => {
    return (
        <section className="py-6">
            <div className="container mx-auto px-6">
                <AnimatedCard delay={0}>
                    <div className="bg-white rounded-xl text-center p-12 shadow-md">
                        <h2 className="text-4xl font-bold mb-6">Let's Get Started</h2>
                        <p className="max-w-3xl mx-auto text-gray-600 mb-8">Unlock the full potential of your online presence that speaks to your customers, improving engagement, conversion, and loyalty. With prizmpix's cutting-edge responsive websites, you will:</p>
                        <ul className="max-w-2xl mx-auto text-left space-y-2 text-gray-600 mb-8">
                            <li>- Captivate your audience with stunning visuals and seamless user experiences.</li>
                            <li>- Drive growth and revenue through intuitive navigation and compelling content.</li>
                            <li>- Stay ahead of the competition with a website that adapts to the latest trends and technologies.</li>
                            <li>- Get the most of your online brand image with proven marketing strategies that funnel your user's engagements.</li>
                        </ul>
                        <p className="max-w-3xl mx-auto text-gray-600 mb-8">Embark on the journey towards a truly remarkable website and uncover the riches that await you and your customers. Reach out to us today to initiate this transformative process!</p>
                        <button className="bg-gradient-to-r from-[#2FBD90] to-[#3BD6A2] hover:from-[#2ab584] hover:to-[#36c796] text-black px-6 py-3 rounded-md transition-all duration-700">About Us</button>
                    </div>
                </AnimatedCard>
            </div>
        </section>
    );
};

// Partners Component - Now has a light background
const Partners = () => {
    const partners = ["Acme Corp", "Quantum", "Echo Valley", "PULSE", "APEX", "Celestial"];
    return (
        <div className="py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {partners.map(partner => (
                        <div key={partner} className="flex items-center text-gray-500 font-bold text-lg">
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>
                            {partner}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Footer Component - Remains black
const Footer = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    return (
        <footer className="bg-black text-gray-400 py-12" id="contact-form">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-white">The Future is Now.</h2>
                        <p>Don't miss it. Reach out to us.</p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2FBD90]" 
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="block mb-1 font-medium">Company Name</label>
                            <input 
                                type="text" 
                                id="company" 
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2FBD90]" 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2FBD90]" 
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                            <textarea 
                                id="message" 
                                name="message"
                                rows="4" 
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2FBD90]"
                            ></textarea>
                        </div>
                        <button 
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-[#2FBD90] to-[#3BD6A2] hover:from-[#2ab584] hover:to-[#36c796] text-black font-bold py-3 px-6 rounded-md transition-all duration-700"
                        >
                            Send Message
                        </button>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <a href="#" className="flex items-center mb-4 transform hover:scale-110 transition-transform duration-300 w-fit">
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                                </svg>
                                <span className="text-xl font-bold text-white">PrizmPix</span>
                            </a>
                            <p className="text-sm">Copyright &copy; 2024. All rights reserved.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Quick Links</h4>
                            <ul>
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Services</a></li>
                                <li><a href="#" className="hover:text-white">Website Development</a></li>
                                <li><a href="#" className="hover:text-white">Content Creation</a></li>
                                <li><a href="#" className="hover:text-white">Marketing</a></li>
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Access</h4>
                            <ul>
                                <li><a href="#" className="hover:text-white">Request Demo</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default App;