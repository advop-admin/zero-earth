'use client';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "SITA Platform Integration",
      description: "Connect to our SITA platform for real-time emissions tracking and capacity building across your organization.",
      features: ["Real-time Monitoring", "Capacity Building", "Data Integration", "Platform Access"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Research-Driven Solutions",
      description: "Implement science-backed solutions like seaweed-based feed additives developed with IVRI research and field validation.",
      features: ["IVRI Research", "Field Validation", "Science-backed", "Pilot Programs"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Stakeholder Engagement",
      description: "Engage with smallholder farmers, women dairy farmers, and communities through capacity building and sustainability training.",
      features: ["Capacity Building", "Community Training", "Stakeholder Engagement", "Sustainability Education"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Verified Impact Generation",
      description: "Generate verified, traceable offsets through the SITA platform with cryptographic hashing and audit-ready documentation.",
      features: ["Cryptographic Hashing", "Audit-ready", "Traceable Offsets", "Verified Impact"],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-400 font-medium mb-6">
            <span>SITA Platform</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            How SITA Platform
            <span className="text-blue-400"> Works</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-white/70 leading-relaxed">
            Our SITA platform combines real-time emissions tracking with capacity building, 
            enabling verified impact generation across ecosystems and communities.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Step Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center space-x-4">
                  <div className="text-6xl font-bold text-blue-400/20">{step.number}</div>
                  <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
                    {step.icon}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-white/70 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-white/60 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Visual */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-400/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/20 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-white text-xl font-bold">{step.number}</div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-blue-400/30 rounded-full">
                        <div 
                          className="h-full bg-blue-400 rounded-full transition-all duration-1000"
                          style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-white/60 text-sm">
                        Step {index + 1} of {steps.length}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Connection Line to Next Step */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 mt-8">
                    <div className="w-px h-16 bg-gradient-to-b from-blue-400/50 to-transparent"></div>
                  </div>
                )}

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* SITA Platform Features */}
        <div className="mt-20 pt-16 border-t border-gray-800">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">SITA Platform Capabilities</h3>
            <p className="text-white/60">Real-time tracking and capacity building features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-700 transition-colors">
                <div className="w-8 h-8 bg-green-400 rounded"></div>
              </div>
              <p className="text-white/60 text-sm">Real-time Emissions Tracking</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-700 transition-colors">
                <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
              </div>
              <p className="text-white/60 text-sm">Capacity Building</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-700 transition-colors">
                <div className="w-8 h-8 bg-purple-400 rounded-lg"></div>
              </div>
              <p className="text-white/60 text-sm">Verified Impact Generation</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600/10 to-blue-400/5 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Scale Impact?</h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Join our pilot programs and experience the power of SITA platform for verified, 
              traceable emission reductions across India and other LMICs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-600/25 flex items-center space-x-2"
              >
                <span>Get Started with SITA</span>
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

export default HowItWorksSection;