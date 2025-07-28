'use client';

const TeamSection = () => {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former Tesla sustainability lead with 15+ years in clean tech. PhD in Environmental Engineering from MIT.",
      image: "/assets/team/sarah-chen.jpg", // Placeholder
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder", 
      bio: "Ex-Google blockchain architect. Built carbon tracking systems for Fortune 500 companies across 3 continents.",
      image: "/assets/team/marcus-rodriguez.jpg", // Placeholder
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr. Aisha Patel",
      role: "Chief Science Officer",
      bio: "Leading climate data scientist from Stanford. Published 50+ papers on carbon accounting methodologies.",
      image: "/assets/team/aisha-patel.jpg", // Placeholder
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "James Thompson",
      role: "VP of Engineering",
      bio: "Former SpaceX systems engineer. Expert in large-scale IoT deployments and real-time data processing.",
      image: "/assets/team/james-thompson.jpg", // Placeholder
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Emily Zhang",
      role: "Head of Product",
      bio: "Ex-Stripe product leader. Specialized in building intuitive interfaces for complex data systems.",
      image: "/assets/team/emily-zhang.jpg", // Placeholder
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "David Okafor",
      role: "VP of Partnerships",
      bio: "Former McKinsey sustainability consultant. Built partnerships with 200+ organizations globally.",
      image: "/assets/team/david-okafor.jpg", // Placeholder
      linkedin: "#",
      twitter: "#"
    }
  ];

  const advisors = [
    {
      name: "Prof. Lisa Hoffman",
      role: "Climate Policy Advisor",
      company: "Former IPCC Lead Author"
    },
    {
      name: "Robert Kim",
      role: "Technology Advisor", 
      company: "Ex-CTO, Carbon Trust"
    },
    {
      name: "Maria Santos",
      role: "Business Advisor",
      company: "Former VP, Patagonia"
    }
  ];

  return (
    <section id="team" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-4 py-2 text-sm text-purple-400 font-medium mb-6">
            <span>Our Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Meet the
            <span className="text-purple-400"> Experts</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-white/70 leading-relaxed">
            Our world-class team combines decades of experience in climate science, 
            technology, and business to deliver the most advanced carbon intelligence platform.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {team.map((member, index) => (
            <div 
              key={index}
              className="group bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-400/30 transition-all duration-300 hover:bg-gray-800/30"
            >
              {/* Profile Image Placeholder */}
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600/40 to-purple-400/20 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <div className="text-center space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-purple-400 font-medium">{member.role}</p>
                </div>

                <p className="text-white/60 text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center space-x-4 pt-4">
                  <a 
                    href={member.linkedin}
                    className="w-8 h-8 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors group/social"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href={member.twitter}
                    className="w-8 h-8 bg-gray-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors group/social"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisors Section */}
        <div className="border-t border-gray-800 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Strategic Advisors</h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              Guided by industry leaders and renowned experts in climate science, technology, and business strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600/30 to-purple-400/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="text-lg font-bold text-white">
                    {advisor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">{advisor.name}</h4>
                <p className="text-purple-400 text-sm font-medium mb-1">{advisor.role}</p>
                <p className="text-white/60 text-sm">{advisor.company}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="mt-20 bg-gradient-to-r from-purple-600/10 to-purple-400/5 rounded-2xl p-8 backdrop-blur-sm border border-purple-400/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <p className="text-white/60 text-sm">Years Combined Experience</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">12</div>
              <p className="text-white/60 text-sm">PhDs & Advanced Degrees</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">200+</div>
              <p className="text-white/60 text-sm">Published Papers</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">5</div>
              <p className="text-white/60 text-sm">Patents Filed</p>
            </div>
          </div>
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">Join Our Mission</h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            We're always looking for exceptional talent to help us build the future of carbon accountability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-600/25 flex items-center space-x-2">
              <span>View Open Positions</span>
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
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group border border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition-all backdrop-blur-sm flex items-center space-x-2"
            >
              <span>Get In Touch</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;