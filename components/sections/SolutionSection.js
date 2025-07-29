'use client';

const SolutionSection = () => {
  const muxoSolutions = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "MUXO Dairy",
      description: "Seaweed-based feed additives with IVRI research, piloted with smallholder women dairy farmers in Tamil Nadu, combining capacity building with real-time emissions tracking via SITA platform."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: "MUXO Datacenter",
      description: "Net Compute Offsets (NCOs) through intelligent, real-time optimisation of digital infrastructure. Up to 70% of offset earnings shared back with operators, aligned with ISO 14064-3, ISAE 3000, and SBTi frameworks."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "MUXOnautic",
      description: "Maritime decarbonisation strategies combining geospatial tracking, marine route optimisation, and verified natural carbon sinks. Aligned with IMO decarbonisation goals and global offset protocols."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "MUXOrise",
      description: "Net Built Offsets (NBOs) for vertical urban infrastructure using material lifecycle assessments and AI-based optimisation agents. Enables real estate developers to earn and trade verified sustainability credits."
    }
  ];

  const offsetTypes = [
    {
      title: "Digital Dairy Offset",
      features: [
        "Digital twin of animal",
        "Location Data",
        "Activity Data Repository",
        "Traceable to Emitter & Investor",
        "Quantified Impact",
        "Social Priced",
        "Fair Trade Price",
        "Digitised Emission Reduction"
      ]
    },
    {
      title: "Net Compute Offset",
      features: [
        "Energy-efficient computing practices",
        "Workload consolidation",
        "Virtualization",
        "Optimized resource utilization",
        "Emission capture and digitised"
      ]
    }
  ];

  return (
    <section id="solution" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 text-sm text-green-400 font-medium mb-6">
            <span>Our Solution</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Decarbonisation-As-A-Service 
            <span className="text-green-400"> Platform</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-white/70 leading-relaxed">
            ZeroEarth operates at the intersection of science, technology & financial innovation, 
            transforming emission reduction into simplified, digitised & accountable processes.
          </p>
        </div>

        {/* Main Solution Overview */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Solution Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-600/20 to-green-400/10 rounded-2xl p-8 backdrop-blur-sm border border-green-400/20">
                <div className="space-y-6">
                  {/* Central Node */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">ZeroEarth DaaS Platform</h3>
                  </div>
                  
                  {/* Connected Features */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                      <div className="w-8 h-8 bg-green-400/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <p className="text-white/80 text-sm font-medium">Simplify</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                      <div className="w-8 h-8 bg-green-400/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <p className="text-white/80 text-sm font-medium">Quantify</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                      <div className="w-8 h-8 bg-green-400/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <p className="text-white/80 text-sm font-medium">Digitise</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                      <div className="w-8 h-8 bg-green-400/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <p className="text-white/80 text-sm font-medium">Account</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-600/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-400/10 rounded-full blur-xl"></div>
            </div>

            {/* Solution Benefits */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Ecosystem Connection</h3>
                    <p className="text-white/60">
                      Emitters, mitigators & investors intersect on our proprietary platform, 
                      providing streamlined complex climate problems into actionable solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Verified Offsets</h3>
                    <p className="text-white/60">
                      Cryptographically hashed, audit-ready, and traceable offsets aligned with 
                      ISO 14064-3, ISAE 3000, and SBTi emission reduction frameworks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Revenue Generation</h3>
                    <p className="text-white/60">
                      Transform sustainability into revenue with up to 70% of offset earnings 
                      shared back with operators, turning efficiency into economic value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MUXO Solutions Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">MUXO Platform Solutions</h3>
            <p className="text-white/60">Sector-specific decarbonisation strategies</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {muxoSolutions.map((solution, index) => (
              <div 
                key={index}
                className="group p-6 bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-green-400/30 transition-all duration-300 hover:bg-gray-800/30"
              >
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center text-green-400 group-hover:bg-green-600/30 transition-colors mb-4">
                  {solution.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Offset Marketplace */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-600/10 to-green-400/5 rounded-2xl p-8 backdrop-blur-sm border border-green-400/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Offset Marketplace - Coming Soon</h3>
              <p className="text-white/70 max-w-3xl mx-auto">
                A digital hub for verified, traceable, and science-backed carbon offsets. 
                From Digital Dairy Offsets to MUXO Gains, every credit is rooted in real impact and audited performance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offsetTypes.map((type, index) => (
                <div key={index} className="bg-black/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">{type.title}</h4>
                  <ul className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-white/60 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600/10 to-green-400/5 rounded-2xl p-8 backdrop-blur-sm border border-green-400/20">
            <h3 className="text-2xl font-bold text-white mb-4">Experience the Future of Carbon Accounting</h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Designed for buyers who demand integrity and sellers who deliver measurable change, 
              our marketplace turns emissions into opportunities — one verified offset at a time.
            </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-600/25 flex items-center space-x-2"
                >
                  <span>Learn About SITA Platform</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button
                  onClick={() => window.open('https://muxo.zeroearth.company', '_blank')}
                  className="group border border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition-all backdrop-blur-sm flex items-center space-x-2"
                >
                  <span>Explore MUXO Solutions</span>
                </button>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;