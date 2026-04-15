import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#e8f5e9] text-[#333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#4CAF50]">WellTech</h2>
            <p className="text-gray-600">Transforming Wellness Through Innovation</p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="font-semibold text-gray-400 hover:text-[#4CAF50] transition-colors">
                Fb
              </a>
              <a href="#" className="font-semibold text-gray-400 hover:text-[#4CAF50] transition-colors">
                Tw
              </a>
              <a href="#" className="font-semibold text-gray-400 hover:text-[#4CAF50] transition-colors">
                Ig
              </a>
              <a href="#" className="font-semibold text-gray-400 hover:text-[#4CAF50] transition-colors">
                In
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#4CAF50] mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-[#ff8c42] transition-colors">AI Consultations</Link></li>
              <li><Link to="/ecommerce" className="text-gray-600 hover:text-[#ff8c42] transition-colors">Wellness Products</Link></li>
              <li><Link to="/#health-assessment" className="text-gray-600 hover:text-[#ff8c42] transition-colors">Health Assessment</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#ff8c42] transition-colors">Lifestyle Guidance</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#4CAF50] mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-[#ff8c42] transition-colors">About Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#ff8c42] transition-colors">Our Team</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#ff8c42] transition-colors">Careers</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#ff8c42] transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#4CAF50] mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-[#ff8c42] transition-colors">FAQs</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#ff8c42] transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#ff8c42] transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#ff8c42] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-sm mb-8">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-[#4CAF50]">Stay Updated</h3>
              <p className="text-gray-600">Subscribe to our newsletter for the latest wellness tips and updates.</p>
            </div>
            <form className="flex w-full md:w-auto max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                required
              />
              <button 
                type="submit" 
                className="bg-[#ff8c42] text-white px-6 py-2 rounded-md font-medium hover:bg-[#e0742f] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} WellTech. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
