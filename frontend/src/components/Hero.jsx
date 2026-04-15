const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-[#e8f5e9] to-[#e1f5fe] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1b5e20] via-[#4CAF50] to-[#0d47a1] leading-tight pb-2 drop-shadow-sm">
              Transforming Wellness Through Innovation
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Experience the future of healthcare with AI-powered consultations and personalized wellness solutions tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#health-assessment" className="btn-primary text-center">
                Get Started Now
              </a>
              <a href="/ecommerce" className="btn-tertiary text-center">
                Explore Products
              </a>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200">
                  <img className="w-full h-full rounded-full object-cover" src="/images/user1.jpg" alt="User 1" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300">
                  <img className="w-full h-full rounded-full object-cover" src="/images/user2.jpg" alt="User 2" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400">
                  <img className="w-full h-full rounded-full object-cover" src="/images/user3.jpg" alt="User 3" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#4CAF50] flex items-center justify-center text-xs text-white font-bold">+2k</div>
              </div>
              <p className="text-sm text-gray-500 font-medium tracking-wide">TRUSTED BY THOUSANDS</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4CAF50]/20 to-transparent rounded-full filter blur-3xl transform -translate-x-10 translate-y-10"></div>
            <img 
              src="/images/hero.webp" 
              alt="Tech-powered wellness journey" 
              className="relative w-[90%] md:w-[85%] mx-auto block h-auto rounded-2xl shadow-2xl object-cover transform scale-[1.03] -translate-y-3 md:scale-[1.12] md:-translate-y-8 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
              }}
            />
            
            {/* Floating badge */}
            {/* <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce hover:animate-none transition-all duration-300">
              {/* <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div> */}
              {/* <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">AI Assistant</p>
                <p className="font-bold text-[#4CAF50]">24/7 Available</p>
              </div> */}
            {/* </div> */}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
