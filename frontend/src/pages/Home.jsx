import Hero from '../components/Hero';
import Features from '../components/Features';
import HealthAssessment from '../components/HealthAssessment';
import Chatbot from '../components/Chatbot';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <HealthAssessment />
      <Features />
      <Chatbot />
      <Testimonials />
    </div>
  );
};

export default Home;
