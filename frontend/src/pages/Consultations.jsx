import { useState, useEffect } from 'react';
import { Search, MapPin, Star, Calendar, Clock } from 'lucide-react';
import { doctorData } from '../data/Doctor';

const Consultations = () => {
  const [doctors, setDoctors] = useState([]);
  const [filterSpec, setFilterSpec] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setDoctors(doctorData);
  }, []);

  const specializations = ['All', ...new Set(doctorData.map(doc => doc.specialization))];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSpec = filterSpec === 'All' || doc.specialization === filterSpec;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpec && matchesSearch;
  });

  return (
    <div className="bg-[#f9fbfc] min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333] mb-6">Find & Book Top Doctors</h1>
          <p className="text-lg text-gray-600">Connect with specialized medical professionals for online and in-person consultations tailored to your health needs.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search doctors by name or specialty..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none text-gray-700"
            />
          </div>
          <div className="md:w-72">
            <select 
              value={filterSpec}
              onChange={(e) => setFilterSpec(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none text-gray-700 appearance-none bg-white font-medium cursor-pointer"
            >
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
                <div className="p-6 flex gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#333] mb-1">{doc.name}</h3>
                    <p className="text-[#4CAF50] font-semibold text-sm mb-2">{doc.specialization}</p>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="font-bold text-gray-700">4.8</span>
                      <span>(120+ reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Clock size={14} />
                      <span>{doc.experience} Exp.</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 flex gap-3 mt-auto">
                  <button className="flex-1 bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#e8f5e9] py-2.5 rounded-xl font-semibold transition-colors flex justify-center items-center gap-2">
                    <Calendar size={18} /> View Profile
                  </button>
                  <button onClick={() => alert(`Booking flow initiated for ${doc.name}`)} className="flex-1 bg-[#4CAF50] hover:bg-[#388E3C] text-white py-2.5 rounded-xl font-semibold transition-colors shadow-md shadow-[#4CAF50]/30 hover:shadow-lg">
                    Book Consult
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No doctors found</h3>
              <p className="text-gray-500">Try checking your spelling or using different filter criteria.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Consultations;
