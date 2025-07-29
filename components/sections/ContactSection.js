const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 text-sm text-green-400 font-medium mb-6">
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Contact 
            <span className="text-green-400"> ZeroEarth</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-white/70 leading-relaxed">
            Ready to start your decarbonisation journey? Get in touch with our team 
            to explore how our DaaS platform can transform your sustainability impact.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Address</h4>
                  <p className="text-white/60 leading-relaxed">
                    C6, L2, Dotspace Business Centre, The Cliff 3,<br />
                    TC No 24/ 1625, Market Road, Kuravankonam,<br />
                    Kowdiar, Thiruvananthapuram, Kerala, India.<br />
                    <span className="text-green-400 font-medium">PIN-695003</span>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Phone</h4>
                  <a 
                    href="tel:+917907635263" 
                    className="text-green-400 hover:text-green-300 transition-colors text-lg font-medium"
                  >
                    +91 790 763 5263
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
                  <a 
                    href="mailto:info@zeroearth.company" 
                    className="text-green-400 hover:text-green-300 transition-colors text-lg font-medium"
                  >
                    info@zeroearth.company
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="pt-8 border-t border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Business Hours</h4>
              <div className="space-y-2 text-white/60">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder:text-white/40 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder:text-white/40 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder:text-white/40 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder:text-white/40 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 transition-colors"
                  placeholder="Enter your company name"
                />
              </div>
              
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-white/80 mb-2">
                  Interest Area
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 transition-colors"
                >
                  <option value="">Select your interest</option>
                  <option value="sita-platform">SITA Platform</option>
                  <option value="muxo-dairy">MUXO Dairy Solutions</option>
                  <option value="muxo-datacenter">MUXO Datacenter</option>
                  <option value="muxo-maritime">MUXO Maritime</option>
                  <option value="muxo-highrises">MUXO High-rises</option>
                  <option value="offset-marketplace">Offset Marketplace</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder:text-white/40 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 transition-colors resize-none"
                  placeholder="Tell us about your decarbonisation needs..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-600/25"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 pt-8 border-t border-gray-700">
          <p className="text-white/60">
            All Rights Reserved. © 2024 ZeroEarth. Creating verifiable climate solutions that reduce emissions at scale.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 