import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [counts, setCounts] = useState({
    consultations: 0,
    customers: 0,
    products: 0
  });

  const testimonials = [
    {
      id: 1,
      quote: "The AI consultations have been incredibly helpful. I got personalized advice that actually worked for my lifestyle!",
      author: "Sarah J.",
      role: "Wellness Enthusiast",
      image: "/images/WhatsApp Image 2025-03-16 at 11.24.58_1364dc1b.jpg"
    },
    {
      id: 2,
      quote: "The product recommendations were spot-on. It's like having a personal wellness shopper who knows exactly what I need.",
      author: "Michael T.",
      role: "Fitness Coach",
      image: "/images/WhatsApp Image 2025-03-16 at 11.23.36_c6bc18e8.jpg"
    },
    {
      id: 3,
      quote: "I've tried many wellness platforms, but this one truly understands the connection between technology and health.",
      author: "Elena R.",
      role: "Healthcare Professional",
      image: "/images/WhatsApp Image 2025-03-16 at 11.34.56_37ef5c25.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    const animateStat = (target, key, duration) => {
      let start = 0;
      const increment = Math.ceil(target / (duration / 16));
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCounts(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounts(prev => ({ ...prev, [key]: start }));
        }
      }, 16);
    };

    const handleScroll = () => {
      const element = document.getElementById('trust-counters');
      if (!element) return;
      
      const position = element.getBoundingClientRect();
      if (position.top < window.innerHeight && position.bottom >= 0 && counts.consultations === 0) {
        animateStat(10000, 'consultations', 2000);
        animateStat(5000, 'customers', 2000);
        animateStat(500, 'products', 2000);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [counts.consultations]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#e8f5e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4CAF50] mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600">Real stories from people who transformed their wellness journey.</p>
        </div>

        <div className="relative max-w-4xl mx-auto mb-24">
          <div className="overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-100 relative z-10">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 p-8 md:p-16 text-center">
                  <Quote className="w-12 h-12 text-[#ff8c42]/20 mx-auto mb-8" />
                  <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed italic mb-10">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-16 h-16 rounded-full object-cover border-4 border-[#e8f5e9]"
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=' + testimonial.author.split(' ').join('+') + '&background=0a5240&color=fff';
                      }}
                    />
                    <div className="text-left">
                      <h4 className="font-bold text-[#333]">{testimonial.author}</h4>
                      <p className="text-[#4CAF50] text-sm font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white text-[#4CAF50] p-3 rounded-full shadow-lg hover:bg-[#4CAF50] hover:text-white transition-all duration-300 z-20"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 bg-white text-[#4CAF50] p-3 rounded-full shadow-lg hover:bg-[#4CAF50] hover:text-white transition-all duration-300 z-20"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-3 ${
                  currentSlide === idx ? 'w-10 bg-[#4CAF50]' : 'w-3 bg-[#4CAF50]/20 hover:bg-[#4CAF50]/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div id="trust-counters" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-4xl md:text-5xl font-bold text-[#4CAF50] mb-2">{counts.consultations.toLocaleString()}+</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide">Consultations Completed</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-4xl md:text-5xl font-bold text-[#4CAF50] mb-2">{counts.customers.toLocaleString()}+</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide">Happy Customers</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-4xl md:text-5xl font-bold text-[#4CAF50] mb-2">{counts.products.toLocaleString()}+</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide">Wellness Products</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
