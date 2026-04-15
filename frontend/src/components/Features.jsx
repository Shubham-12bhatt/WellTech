import { Activity, ShoppingBag, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      icon: <Activity className="w-8 h-8 text-[#4CAF50]" />,
      title: 'AI-Powered Consultation',
      description: 'Book doctor consultations, chat with our AI assistant, and receive real-time health insights.',
      action: () => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 2,
      icon: <ShoppingBag className="w-8 h-8 text-[#4CAF50]" />,
      title: 'Smart Commerce for Wellness',
      description: 'Get personalized product recommendations based on your health profile and lifestyle needs.',
      action: () => navigate('/ecommerce')
    },
    {
      id: 3,
      icon: <Heart className="w-8 h-8 text-[#4CAF50]" />,
      title: 'Lifestyle Guidance',
      description: 'Receive customized advice on nutrition, exercise, and mental wellness tailored to your goals.',
      action: () => document.getElementById('health-assessment')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4CAF50] mb-4">Our Core Features</h2>
          <p className="text-lg text-gray-600">Discover how we're revolutionizing wellness with personalized insights and AI-driven solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              onClick={feature.action}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-[#e8f5e9] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#333] mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
