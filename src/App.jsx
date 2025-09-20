import { useState, useEffect, useRef } from 'react';
import Lottie from "lottie-react";
import rocketAnimation from "./animations/rocket-animation.json";

// 1. ALL CHILD/HELPER COMPONENTS ARE DEFINED FIRST

const UnscrambleText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const ref = useRef(null);
    const animationFrameRef = useRef();
    const lastTimeRef = useRef(0);
    const iterationRef = useRef(0);
    
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    const animate = (time) => {
        if (time - lastTimeRef.current < 20) { 
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

        iterationRef.current += 1 / 2; 
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

    return <h2 ref={ref} className="text-4xl md:text-4xl font-bold font-dmserif text-[#2FBD90] mb-2 h-16">{displayedText}</h2>;
};

const AnimatedCard = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
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
  const [fontSize, setFontSize] = useState(100); 

  useEffect(() => {
     const resizeText = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth * 0.9;
        const containerHeight = containerRef.current.offsetHeight * 0.8;
        const baseFontSize = 100; 
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.font = `bold ${baseFontSize}px Montserrat`;
        const textWidth = ctx.measureText("Custom Website Builds").width;
        const scaleByWidth = containerWidth / textWidth;
        const scaleByHeight = containerHeight / baseFontSize;
        const newFontSize = Math.min(baseFontSize * scaleByWidth, baseFontSize * scaleByHeight, 200);
        setFontSize(newFontSize);
      }
    };

    resizeText();
    window.addEventListener("resize", resizeText);
    return () => window.removeEventListener("resize", resizeText);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center bg-black overflow-hidden px-6 md:px-12">
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
                className="font-montserrat"
                style={{ fontSize: `clamp(100px, ${fontSize}px, 200px)` }}
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
      <div className="relative z-20 max-w-4xl mx-auto mt-[-3rem] px-4 text-center">
        <h3 className="text-2xl md:text-sm font-pressstart text-white mb-4">
          Unique Technology
        </h3>
        <p className="text-lg md:text-xl text-gray-300 mb-6 px-4 md:px-0">
          Harness the beauty, functionality and power of PrizmPix's cutting-edge responsive websites and bring value to your customers. The web is your oyster.
        </p>
        <div className="mb-8">
          <h2 className="text-4xl md:text-4xl font-bold font-montserrat text-white">Unleash Web Power</h2>
          <UnscrambleText text="for humans" />
        </div>
        <button className="bg-gradient-to-r from-[#2FBD90] to-[#3BD6A2] hover:from-[#2ab584] hover:to-[#36c796] text-black font-bold py-3 px-8 rounded-lg text-lg transition-all duration-700">
          Learn More
        </button>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="pt-10 pb-3">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center font-montserrat mb-10">Features</h2>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <AnimatedCard delay={100}>
            <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col relative">
                <div className="absolute top-4 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-56 md:h-56">
                <img 
                    src="/star.png.webp"
                    alt="Floating star object" 
                    className="w-full h-full object-contain animate-hover-float"
                />
                </div>
                <div className="absolute top-10 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-48 md:h-48">
                <img 
                    src="/lightning.png.webp"
                    alt="Floating lightning bolt" 
                    className="w-full h-full object-contain animate-hover-float-delay"
                />
                </div>
                <div className="mt-40 md:mt-48 flex flex-col flex-1 relative z-10">
                <h3 className="text-xl font-bold mb-4">Innovative Website Designs for Business-to-Customer Clients</h3>
                <p className="text-gray-600 mb-4">
                    We build eye-catching websites designed to engage users and drive conversions. Our solutions are fully optimized for performance, SEO, and user experience, ensuring your business stands out online.
                </p>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors duration-700">
                    Explore
                </button>
                </div>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={200}>
            <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4">
                  Tailored Website Solutions for Business-to-Business Clients
                </h3>
                <p className="text-gray-600 mb-4">
                  Streamline your business with our advanced search, product customization, and secure payment solutions. Efficiently manage orders, track inventory, and access analytics to drive growth. Simplify your operations and boost productivity
                </p>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors duration-700">
                  Discover
                </button>
              </div>
              <div className="mt-4 h-32 md:h-48 w-full overflow-hidden rounded-lg">
                <img
                  src="/B2B-2.jpg"
                  alt="Business-to-Business tailored solutions"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </AnimatedCard>
        </div>
        <div className="md:col-span-2 mt-6">
          <AnimatedCard delay={300}>
            <div className="relative bg-gradient-to-r from-[#E349C6] opacity-75 to-[#02FF96] opacity-75 rounded-xl shadow-lg h-full p-6 overflow-hidden min-h-[500px] md:min-h-[450px]">
                <div className="absolute top-8 left-48 md:left-32 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl w-64 md:w-80 z-10">
                    <h3 className="text-xl font-bold mb-2">Responsive Designs</h3>
                    <p className="text-gray-700 text-sm">
                        We offer responsive designs, ensuring a seamless user experience across various devices and screen sizes.
                    </p>
                </div>
                <div className="absolute top-1/2 left-1/2 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-xl animate-float-left z-10">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
                            <img src="/prof1.png" alt="avatar" className="rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full"></div>
                            <div className="w-16 h-2 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-12 left-1/2 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-xl animate-float-right z-10">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
                            <img src="/prof2.png" alt="avatar" className="rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
                             <div className="w-12 h-2 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-14rem] md:bottom-[-16rem] w-80 h-[40rem] bg-white rounded-t-3xl shadow-2xl p-4 border border-white">
                    <div className="relative w-full h-full bg-white rounded-2xl p-4 flex flex-col items-center space-y-4">
                        <div className="w-full flex justify-end items-center">
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </div>
                        <div className="w-full bg-gray-100 rounded-lg p-2 flex items-center space-x-2">
                            <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                            <div className="w-1/2 h-2 bg-gray-200 rounded-full"></div>
                        </div>
                        <a href="#contact-form" className="bg-gradient-to-r from-[#2FBD90] to-[#3BD6A2] hover:from-[#2ab584] hover:to-[#36c796] text-black font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md">
                            Get A Quote
                        </a>
                        <div className="relative w-full h-56 rounded-2xl overflow-hidden mt-2">
                            <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=870&q=80" alt="Abstract background" className="w-full h-full object-cover opacity-75" />
                            <div className="absolute inset-0 bg-black/30 p-4 flex items-center justify-center">
                                <h2 className="text-white text-center font-bold text-2xl">
                                    Beauty is not in the eye of the beholder
                                </h2>
                            </div>
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

const MoreFeatures = () => {
    const features = [
        { 
            title: "Content Creation", 
            description: "Produce content that sells, allowing you to manage your services independently or leverage our expertise.", 
            imageUrl: "/content.webp" 
        },
        { 
            title: "Marketing Services", 
            description: "Improve your online presence with custom marketing packages from email marketing, and targeted advertising to social media marketing.", 
            imageUrl: "/marketing.png" 
        },
        { 
            title: "Ecommerce Solutions", 
            description: "Our ecommerce solutions are tailored to grow your business, featuring high-end and secure features.", 
            imageUrl: "/ecommerce.jpg" 
        },
        { 
            title: "Animations", 
            description: "Bring your website to life with lightweight, high-quality animations using Lottie.", 
            imageUrl: rocketAnimation 
        }
    ];
    
    return (
        <section className="py-3">
            <div className="container mx-auto px-6">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <AnimatedCard key={index} delay={index * 150}>
                            <div className="bg-white rounded-xl overflow-hidden shadow-md h-full flex flex-col">
                                {feature.title === "Animations" ? (
                                    <Lottie animationData={feature.imageUrl} className="w-full h-56 object-cover"/>
                                ) : (
                                    <img src={feature.imageUrl} alt={feature.title} className="w-full h-48 object-cover"/>
                                )}
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

const LetsGetStarted = () => {
    return (
        <section className="py-6">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold font-montserrat text-center mb-12">Let's Get Started</h2>
                <AnimatedCard delay={0}>
                    {/* Changed background to dark grey */}
                    <div className="relative overflow-hidden bg-zinc-900 rounded-xl p-12 shadow-md static-bg">
                        
                        {/* This div lifts the content above the static background */}
                        <div className="relative z-10 text-center">
                            {/* Changed text color to light grey */}
                            <p className="max-w-3xl mx-auto text-gray-200 mb-8 text-left">Unlock the full potential of your online presence that speaks to your customers, improving engagement, conversion, and loyalty. With prizmpix's cutting-edge responsive websites, you will:</p>
                            
                            {/* Changed text color to light grey */}
                            <ul className="max-w-2xl mx-auto text-left space-y-2 text-gray-200 mb-8">
                                <li>- Captivate your audience with stunning visuals and seamless user experiences.</li>
                                <li>- Drive growth and revenue through intuitive navigation and compelling content.</li>
                                <li>- Stay ahead of the competition with a website that adapts to the latest trends and technologies.</li>
                                <li>- Get the most of your online brand image with proven marketing strategies that funnel your user's engagements.</li>
                            </ul>

                            {/* Changed text color to light grey */}
                            <p className="max-w-3xl mx-auto text-gray-200 mb-8 text-left">Embark on the journey towards a truly remarkable website and uncover the riches that await you and your customers. Reach out to us today to initiate this transformative process!</p>
                            
                            <a href="#contact-form" className="inline-block bg-gradient-to-r from-[#2FBD90] to-[#3BD6A2] hover:from-[#2ab584] hover:to-[#36c796] text-black px-6 py-3 rounded-md transition-all duration-700 font-bold font-montserrat">
                                Start Your Project
                            </a>
                        </div>

                    </div>
                </AnimatedCard>
            </div>
        </section>
    );
};

const Testimonials = () => {
    const testimonials = [
        {
            quote: "PrizmPix transformed our online presence. Their attention to detail and creative vision resulted in a website that not only looks stunning but also drives significant traffic and conversions. Highly recommended!",
            name: "Sarah Johnson",
            title: "CEO of Innovate Inc.",
            avatar: "https://i.pravatar.cc/48?img=3"
        },
        {
            quote: "Working with the PrizmPix team was a seamless experience from start to finish. They are true professionals who listen to your needs and deliver exceptional results ahead of schedule.",
            name: "Michael Chen",
            title: "Marketing Director, Tech Solutions",
            avatar: "https://i.pravatar.cc/48?img=4"
        },
        {
            quote: "The new ecommerce platform they built for us is fast, secure, and incredibly user-friendly. Our sales have increased by 40% since launch. We couldn't be happier with the outcome.",
            name: "Jessica Rodriguez",
            title: "Founder of The Style Hub",
            avatar: "https://i.pravatar.cc/48?img=5"
        }
    ];

    return (
        <section className="py-6">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold font-montserrat text-center mb-12">What Our Clients Say</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <AnimatedCard key={index} delay={index * 150}>
                            <div className="bg-white rounded-xl shadow-md p-8 h-full flex flex-col">
                                <svg className="w-8 h-8 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 3a1 1 0 012 0v2a1 1 0 11-2 0V3zM3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zM3 14a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                <p className="text-gray-600 italic flex-1">"{testimonial.quote}"</p>
                                <div className="mt-6 flex items-center">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                                    <div>
                                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

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

const Footer = () => {
    const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
    const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
    const handleSubmit = (e) => { e.preventDefault(); console.log('Form submitted:', formData); };

    return (
        <footer className="bg-black text-gray-400 py-12" id="contact-form">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold font-montserrat text-white">The Future is Now.</h2>
                        <p>Don't miss it. Reach out to us.</p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2FBD90]" />
                        </div>
                        <div>
                            <label htmlFor="company" className="block mb-1 font-medium">Company Name</label>
                            <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2FBD90]" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2FBD90]" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                            <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleInputChange} className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2FBD90]"></textarea>
                        </div>
                        <button type="button" onClick={handleSubmit} className="w-full bg-gradient-to-r from-[#2FBD90] to-[#3BD6A2] hover:from-[#2ab584] hover:to-[#36c796] text-black font-bold py-3 px-6 rounded-md transition-all duration-700">
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


// 2. MAIN APP COMPONENT IS DEFINED LAST
function App() {
    return (
        <div className="bg-gray-100 text-gray-900 font-sans">
            <Header />
            <main>
                <Hero />
                <Features />
                <MoreFeatures />
                <LetsGetStarted />
                <Testimonials />
                <Partners />
            </main>
            <Footer />
        </div>
    );
}

// 3. EXPORT THE APP COMPONENT
export default App;