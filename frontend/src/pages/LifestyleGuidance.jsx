import { useState, useEffect } from 'react';
import { Heart, Apple, Moon, Wind, Info, Activity } from 'lucide-react';
import { lifestyleData } from '../data/Lifestyle';

const LifestyleGuidance = () => {
  const [selectedDisease, setSelectedDisease] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const keys = Object.keys(lifestyleData);
    if (keys.length > 0) {
      setSelectedDisease(keys[0]);
    }
  }, []);

  const diseases = Object.keys(lifestyleData);
  const data = selectedDisease ? lifestyleData[selectedDisease] : null;

  return (
    <div className="bg-[#f9fbfc] min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="w-16 h-16 bg-[#e8f5e9] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#4CAF50]">
            <Heart size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#333] mb-6">Lifestyle Guidance</h1>
          <p className="text-lg text-gray-600">Access personalized tips, diet recommendations, and daily routines categorized by specific health conditions to improve your overall wellness.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-28">
              <h3 className="text-lg font-bold text-gray-800 mb-4 px-2 flex items-center gap-2">
                <Activity size={18} className="text-[#4CAF50]" /> Conditions
              </h3>
              <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {diseases.map(disease => (
                  <button
                    key={disease}
                    onClick={() => setSelectedDisease(disease)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      selectedDisease === disease 
                        ? 'bg-[#4CAF50] text-white shadow-md' 
                        : 'text-gray-600 hover:bg-[#e8f5e9] hover:text-[#4CAF50]'
                    }`}
                  >
                    {disease.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            {data ? (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-3xl font-bold text-[#333] mb-8 pb-4 border-b border-gray-100">
                  {selectedDisease.replace(/_/g, ' ')} Guidance
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <div className="bg-[#f0f9ff] p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Info size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900">General Tips</h3>
                    </div>
                    <ul className="space-y-3">
                      {data.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-blue-800">
                          <span className="text-blue-500 mt-1">•</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#e8f5e9] p-6 rounded-2xl border border-green-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700">
                        <Apple size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-green-900">Recommended Diet</h3>
                    </div>
                    <ul className="space-y-3">
                      {data.diet.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-green-800">
                          <span className="text-green-500 mt-1">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#fef3c7] p-6 rounded-2xl border border-yellow-100 md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700">
                        <Wind size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-yellow-900">Daily Routine</h3>
                    </div>
                    <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                      {data.routine.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-yellow-800">
                          <span className="text-yellow-600 mt-1">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center h-full flex flex-col items-center justify-center">
                <Activity size={48} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-500">Select a condition from the left to view guidance</h3>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default LifestyleGuidance;
