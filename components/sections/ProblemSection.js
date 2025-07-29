'use client';

const ProblemSection = () => {
  const problems = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Dairy Methane Emissions",
      description: "Enteric methane from dairy farming is notoriously difficult to measure and mitigate. Traditional methods lack real-time tracking and verifiable reduction proof."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: "Data Center Inefficiency",
      description: "Digital infrastructure consumes massive energy with idle GPUs, inefficient cooling systems, and unoptimized workloads creating unnecessary emissions."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Maritime Route Optimization",
      description: "Shipping emissions are hard to measure and mitigate. Complex maritime routes, varying fuel consumption, and lack of real-time optimization create significant carbon footprints."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Urban Infrastructure Emissions",
      description: "High-rise buildings and urban development lack comprehensive lifecycle assessments and AI-based optimization for construction and operational emissions."
    }
  ];

  return (
    <section id="problem" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-600/20 backdrop-blur-sm border border-red-400/30 rounded-full px-4 py-2 text-sm text-red-400 font-medium mb-6">
            <span>The Challenge</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Complex Climate Problems Need 
            <span className="text-red-400"> Smart Solutions</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-white/70 leading-relaxed">
            Across ecosystems, enterprises, and economies, emission reduction challenges 
            require innovative, science-backed approaches with verifiable impact.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-red-400/30 transition-all duration-300 hover:bg-gray-800/50"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center text-red-400 group-hover:bg-red-600/30 transition-colors">
                  {problem.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Statistics */}
        <div className="bg-gradient-to-r from-red-600/10 to-red-400/5 rounded-2xl p-8 backdrop-blur-sm border border-red-400/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">The Scale of the Challenge</h3>
            <p className="text-white/60">Real impact across multiple sectors</p>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">14.5%</div>
              <p className="text-white/60 text-sm">
                Of global emissions from livestock (enteric methane)
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">2.5%</div>
              <p className="text-white/60 text-sm">
                Of global emissions from data centers and digital infrastructure
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">3%</div>
              <p className="text-white/60 text-sm">
                Of global emissions from international shipping
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-xl text-white/80 mb-8">
            Ready for <span className="text-green-400 font-semibold">verifiable solutions</span>?
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => document.querySelector('#solution')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-600/25 flex items-center space-x-2"
            >
              <span>Discover Our DaaS Platform</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;