import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiGlobe, FiAward, FiHeart } from 'react-icons/fi'

function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | Journey Zones'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">About Journey Zones</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about creating unforgettable travel experiences that connect you with the world's most breathtaking destinations.
          </p>
        </div>
        
        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6 font-display">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Journey Zones was founded in 2015 by a group of passionate travelers who believed that exploring the world should be accessible, authentic, and transformative. What started as a small team operating out of a tiny office has grown into a trusted travel company with a global presence.
            </p>
            <p className="text-gray-600 mb-4">
              Our journey began with a simple mission: to create travel experiences that go beyond the ordinary tourist attractions and connect travelers with the heart and soul of each destination. We believe that travel has the power to broaden perspectives, foster understanding, and create lasting memories.
            </p>
            <p className="text-gray-600">
              Today, we continue to be driven by our passion for exploration and our commitment to responsible tourism. We work closely with local communities to ensure that our tours not only provide exceptional experiences for our travelers but also contribute positively to the destinations we visit.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" 
              alt="Journey Zones team" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center font-display">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-primary-600 rounded-full mb-4">
                <FiUsers className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer First</h3>
              <p className="text-gray-600">
                We prioritize your needs and preferences, crafting personalized experiences that exceed expectations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-primary-600 rounded-full mb-4">
                <FiGlobe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Responsible Tourism</h3>
              <p className="text-gray-600">
                We're committed to sustainable practices that respect local cultures and protect the environment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-primary-600 rounded-full mb-4">
                <FiAward className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, from planning to execution.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-primary-600 rounded-full mb-4">
                <FiHeart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Passion</h3>
              <p className="text-gray-600">
                Our love for travel drives us to create authentic experiences that inspire and transform.
              </p>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-xl p-8 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center font-display">Why Choose Journey Zones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Expertly Crafted Itineraries</h3>
              <p className="text-gray-600 mb-6">
                Our travel experts have extensive knowledge of each destination and carefully design each itinerary to include must-see attractions as well as hidden gems that most tourists miss.
              </p>
              
              <h3 className="text-xl font-bold mb-4">Local Experiences</h3>
              <p className="text-gray-600 mb-6">
                We believe that the best way to experience a destination is through its people. Our tours include authentic local experiences, from cooking classes to homestays, that provide a deeper understanding of the local culture.
              </p>
              
              <h3 className="text-xl font-bold mb-4">Personalized Service</h3>
              <p className="text-gray-600">
                We understand that every traveler is unique. That's why we offer customizable packages and provide personalized recommendations based on your interests and preferences.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quality Accommodations</h3>
              <p className="text-gray-600 mb-6">
                We carefully select accommodations that offer comfort, character, and excellent service. From boutique hotels to luxury resorts, we ensure that your stay enhances your overall travel experience.
              </p>
              
              <h3 className="text-xl font-bold mb-4">Responsible Travel</h3>
              <p className="text-gray-600 mb-6">
                We're committed to sustainable tourism practices that minimize environmental impact and support local communities. We work with local suppliers and encourage responsible behavior among our travelers.
              </p>
              
              <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Your safety and satisfaction are our top priorities. Our dedicated support team is available 24/7 to assist you with any questions or concerns during your journey.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center font-display">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="John Smith" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">John Smith</h3>
                <p className="text-primary-600 mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  With over 15 years of experience in the travel industry and having visited 60+ countries, John leads our team with passion and expertise.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Sarah Johnson" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                <p className="text-primary-600 mb-3">Head of Operations</p>
                <p className="text-gray-600 text-sm">
                  Sarah ensures that every journey runs smoothly, from planning to execution, with her meticulous attention to detail.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/men/75.jpg" 
                alt="David Wilson" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">David Wilson</h3>
                <p className="text-primary-600 mb-3">Travel Expert - Asia</p>
                <p className="text-gray-600 text-sm">
                  Having lived in Thailand for 5 years, David brings deep knowledge and authentic insights to our Asian tour packages.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/women/63.jpg" 
                alt="Emma Rodriguez" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Emma Rodriguez</h3>
                <p className="text-primary-600 mb-3">Customer Experience Manager</p>
                <p className="text-gray-600 text-sm">
                  Emma is dedicated to ensuring that every traveler has an exceptional experience from the first inquiry to the journey's end.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary-600 text-white rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4 font-display">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you create unforgettable travel memories. Browse our packages or contact us for a personalized itinerary.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/packages" className="btn bg-white text-primary-600 hover:bg-primary-50">
              Explore Packages
            </Link>
            <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
