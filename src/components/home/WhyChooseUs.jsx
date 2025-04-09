import { FiMapPin, FiAward, FiUsers } from 'react-icons/fi'
import { motion } from 'framer-motion'

const features = [
  {
    id: 1,
    icon: <FiMapPin className="w-8 h-8" />,
    title: 'Lost of Choices',
    description: 'Total 260+ destination we work with'
  },
  {
    id: 2,
    icon: <FiAward className="w-8 h-8" />,
    title: 'Best of Guide',
    description: 'Our tour guide with 15+ years of experience'
  },
  {
    id: 3,
    icon: <FiUsers className="w-8 h-8" />,
    title: 'Easy Booking',
    description: 'With an easy and fast ticket purchase process'
  }
]

function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Our Top Values For You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Try a variety of benefits when choosing our products and services
          </p>
        </div>

        <div className="relative">
          {/* Dotted path connecting the features */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-1 dotted-path -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="travel-card p-6 relative z-10 bg-white"
              >
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
