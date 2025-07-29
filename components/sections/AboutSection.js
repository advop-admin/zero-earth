const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 text-sm text-green-400 font-medium">
                <span>About Zero Earth</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Transforming Carbon 
                <span className="text-green-400"> Accountability</span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                We believe every carbon emission should tell a story of progress, 
                responsibility, and positive impact. Our platform revolutionizes 
                how organizations track, verify, and communicate their environmental journey.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Transparent Tracking</h3>
                  <p className="text-white/60">
                    Real-time monitoring of carbon emissions with blockchain-verified authenticity 
                    and complete audit trails.
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
                  <h3 className="text-xl font-semibold text-white mb-2">Smart Insights</h3>
                  <p className="text-white/60">
                    AI-powered analytics that turn raw data into actionable insights 
                    for sustainable decision-making.
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
                  <h3 className="text-xl font-semibold text-white mb-2">Stakeholder Engagement</h3>
                  <p className="text-white/60">
                    Connect with partners, investors, and communities through 
                    compelling sustainability narratives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="glass rounded-2xl p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">2019</div>
                  <p className="text-white/60">Founded with a vision</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-white mb-1">500+</div>
                    <p className="text-white/60 text-sm">Organizations</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-white mb-1">50M+</div>
                    <p className="text-white/60 text-sm">Tons CO₂ Tracked</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">45</div>
                  <p className="text-white/60">Countries worldwide</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-600/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-400/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;