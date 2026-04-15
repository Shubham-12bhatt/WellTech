import { useState, useRef, useEffect } from 'react';
import { symptomCategories } from '../data/symptoms';
import { Search, CheckCircle, ChevronRight, ChevronLeft, Activity, ListFilter, ArrowRight } from 'lucide-react';

const HealthAssessment = () => {
  const [isAssessing, setIsAssessing] = useState(false);
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(symptomCategories[0].id);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [duration, setDuration] = useState('');

  const sectionRef = useRef(null);

  useEffect(() => {
    if (isAssessing && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isAssessing, step]);

  const formatText = (text) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const handleToggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const resetAssessment = () => {
    setIsAssessing(false);
    setStep(1);
    setSearchQuery('');
    setSelectedCategory(symptomCategories[0].id);
    setSelectedSymptoms([]);
    setDuration('');
  };

  const submitAssessment = () => {
    console.log({ symptoms: selectedSymptoms, duration });
    alert("Assessment Submitted! (Simulated backend processing)");
    resetAssessment();
  };

  let displayedSymptoms = [];
  if (searchQuery.trim() !== '') {
    displayedSymptoms = symptomCategories.flatMap((c) =>
      c.symptoms.filter((s) => s.toLowerCase().replace(/_/g, ' ').includes(searchQuery.toLowerCase()))
    );
    displayedSymptoms = [...new Set(displayedSymptoms)];
  } else {
    const category = symptomCategories.find((c) => c.id === selectedCategory);
    if (category) displayedSymptoms = category.symptoms;
  }

  return (
    <section className="py-20 bg-[#f9fbfc]" id="health-assessment" ref={sectionRef}>
      {!isAssessing ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">AI Symptom Checker</h2>
          <p className="text-lg text-gray-600 mb-12">Identify potential causes for your symptoms and receive wellness recommendations.</p>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl mx-auto border border-gray-100">
            <div className="w-20 h-20 bg-[#e8f5e9] rounded-full flex items-center justify-center mx-auto mb-6 text-[#4CAF50]">
              <Activity size={40} />
            </div>
            <h3 className="text-2xl font-bold text-[#333] mb-4">Check Your Symptoms</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Select your symptoms from our comprehensive database and tell us how long you've been experiencing them.
            </p>

            <ul className="text-left space-y-3 mb-10 max-w-sm mx-auto">
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-[#28a745] mr-3" size={20} /> Extensive symptom database
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-[#28a745] mr-3" size={20} /> Intelligent categorization
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="text-[#28a745] mr-3" size={20} /> Fast and secure
              </li>
            </ul>

            <button onClick={() => setIsAssessing(true)} className="btn-primary w-full md:w-auto text-lg px-8 py-4 inline-block shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              Start Assessment
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4 animate-fadeInUp">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-[#333] mb-4 flex items-center justify-center gap-4">
              <Activity className="text-[#4CAF50]" size={40} />
              Symptom Assessment
            </h2>
            <p className="text-gray-600 text-lg">Detailed analysis for accurate wellness recommendations</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[650px] border border-gray-100">
            
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100 bg-white z-10 relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#e8f5e9] rounded-xl hidden sm:flex items-center justify-center text-[#4CAF50] font-bold text-xl">
                  {step}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#333]">Step {step} of 2</h2>
                  <p className="text-sm text-gray-500 font-medium">{step === 1 ? 'Select Symptoms' : 'Duration'}</p>
                </div>
              </div>
              <button onClick={resetAssessment} className="text-gray-400 hover:text-gray-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors">
                Cancel
              </button>
            </div>

            <div className="flex-1 bg-gray-50 relative overflow-hidden flex flex-col min-h-[500px]">
              
              {/* Step 1 */}
              <div className={`absolute inset-0 w-full h-full flex flex-col transition-transform duration-500 ease-in-out ${
                step === 1 ? 'translate-x-0 relative' : '-translate-x-full opacity-0 pointer-events-none'
              }`}>
                <div className="p-6 md:p-8 flex-1 flex flex-col overflow-hidden">
                  
                  {/* Search Bar & Selected Tokens */}
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                    <div className="relative w-full md:w-3/5">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search symptoms..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10 outline-none transition-all bg-white shadow-sm text-lg"
                      />
                    </div>
                    <div className="w-full md:w-auto bg-[#e8f5e9] text-[#4CAF50] px-6 py-3.5 rounded-2xl font-bold text-center border border-[#4CAF50]/20 whitespace-nowrap shadow-sm text-lg flex items-center gap-2 justify-center">
                      <ListFilter size={20} />
                      {selectedSymptoms.length} Selected
                    </div>
                  </div>

                  {/* Body: Sidebar + Main Grid */}
                  <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
                    
                    {/* Sidebar Categories */}
                    {!searchQuery && (
                      <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-2 overflow-y-auto pr-2 pb-4 scrollbar-hide">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2 flex items-center gap-2">
                          Categories
                        </div>
                        {symptomCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full text-left px-5 py-3.5 rounded-2xl text-[15px] font-semibold transition-all duration-300 ${
                              selectedCategory === category.id
                                ? 'bg-[#4CAF50] text-white shadow-lg shadow-[#4CAF50]/30 transform md:translate-x-1'
                                : 'bg-white text-gray-600 hover:bg-white hover:text-[#4CAF50] border border-gray-100 hover:border-[#4CAF50]/30 hover:shadow-md'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Symptoms Grid */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 md:p-6 flex-1 overflow-y-auto min-h-[300px]">
                      {displayedSymptoms.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                          {displayedSymptoms.map((symptom) => {
                            const isSelected = selectedSymptoms.includes(symptom);
                            return (
                              <label
                                key={symptom}
                                className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 group ${
                                  isSelected 
                                    ? 'border-[#4CAF50] bg-[#4CAF50]/10 shadow-[0_0_15px_rgba(76,175,80,0.15)]' 
                                    : 'border-gray-50 bg-gray-50 hover:border-[#4CAF50]/30 hover:bg-white hover:shadow-md'
                                }`}
                              >
                                <div className="relative mr-4 flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    className="w-5 h-5 opacity-0 absolute cursor-pointer"
                                    checked={isSelected}
                                    onChange={() => handleToggleSymptom(symptom)}
                                  />
                                  <div
                                    className={`w-6 h-6 rounded-[6px] border-[2px] flex items-center justify-center transition-colors ${
                                      isSelected ? 'bg-[#4CAF50] border-[#4CAF50]' : 'border-gray-300 group-hover:border-[#4CAF50]/50'
                                    }`}
                                  >
                                    {isSelected && <CheckCircle size={16} className="text-white" strokeWidth={3} />}
                                  </div>
                                </div>
                                <span className={`text-[15px] ${isSelected ? 'font-bold text-[#2e7d32]' : 'font-medium text-gray-600 group-hover:text-gray-900'}`}>
                                  {formatText(symptom)}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 py-12">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search size={32} className="text-gray-400" />
                          </div>
                          <p className="text-lg font-medium">No symptoms found matching "{searchQuery}"</p>
                          <p className="text-sm text-gray-400 mt-2">Try checking for typos or searching a broader term.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`absolute inset-0 w-full h-full flex flex-col justify-center p-6 md:p-8 transition-transform duration-500 ease-in-out ${
                step === 2 ? 'translate-x-0 relative' : 'translate-x-full opacity-0 pointer-events-none'
              }`}>
                <div className="max-w-2xl mx-auto w-full">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#333] mb-8 text-center">How long have you been experiencing these symptoms?</h3>
                  <div className="space-y-5">
                    {['1-2 days', '3-5 days', 'More than 5 days'].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center p-6 md:p-8 rounded-3xl border-2 cursor-pointer transition-all ${
                          duration === option
                            ? 'border-[#4CAF50] bg-[#e8f5e9] shadow-lg scale-[1.02]'
                            : 'border-gray-100 hover:border-[#4CAF50]/30 hover:bg-white bg-white hover:scale-[1.01] hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          name="duration"
                          value={option}
                          checked={duration === option}
                          onChange={() => setDuration(option)}
                          className="hidden"
                        />
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-6 flex-shrink-0 transition-colors ${
                            duration === option ? 'border-[#4CAF50]' : 'border-gray-300'
                          }`}
                        >
                          {duration === option && <div className="w-4 h-4 rounded-full bg-[#4CAF50] animate-pulse"></div>}
                        </div>
                        <span className={`text-xl md:text-2xl ${duration === option ? 'font-bold text-[#4CAF50]' : 'font-semibold text-gray-700'}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div className="p-5 md:p-8 bg-white border-t border-gray-100 flex justify-between items-center z-10 relative">
              {step === 1 ? (
                <>
                  <div></div>
                  <button
                    onClick={() => setStep(2)}
                    disabled={selectedSymptoms.length === 0}
                    className={`group flex items-center justify-center text-lg px-10 py-4 font-bold rounded-[2rem] transition-all duration-300 ${
                      selectedSymptoms.length === 0 
                      ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500 shadow-none' 
                      : 'bg-[#4CAF50] text-white shadow-[0_8px_20px_rgb(76,175,80,0.3)] hover:shadow-[0_12px_25px_rgb(76,175,80,0.4)] hover:-translate-y-[2px]'
                    }`}
                  >
                    Continue
                    <span className={`ml-3 p-1 rounded-full bg-white/20 transition-transform duration-300 ${selectedSymptoms.length > 0 ? 'group-hover:translate-x-1 group-hover:bg-white/30' : ''}`}>
                      <ArrowRight size={20} strokeWidth={3} className={selectedSymptoms.length === 0 ? "text-gray-400" : "text-white"} />
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center text-gray-500 hover:text-[#4CAF50] font-bold px-6 py-4 transition-colors text-lg"
                  >
                    <ChevronLeft size={22} className="mr-2" /> Back
                  </button>
                  <button
                    onClick={submitAssessment}
                    disabled={!duration}
                    className={`btn-primary text-lg px-10 py-4 rounded-2xl ${!duration ? 'opacity-50 cursor-not-allowed bg-gray-400 shadow-none' : 'shadow-lg shadow-[#4CAF50]/40 hover:shadow-xl hover:-translate-y-1 transition-all'}`}
                  >
                    Complete Assessment
                  </button>
                </>
              )}
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
};

export default HealthAssessment;
