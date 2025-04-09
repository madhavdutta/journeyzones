import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useState } from 'react'

const destinations = [
  {
    id: 1,
    name: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80',
    description: 'Discover the romance of Paris, the vineyards of Bordeaux, and the glamour of the French Riviera',
    packages: 15
  },
  {
    id: 2,
    name: 'Italy',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1086&q=80',
    description: 'Experience the art of Florence, the canals of Venice, and the ancient history of Rome',
    packages: 12
  },
  {
    id: 3,
    name: 'Spain',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Enjoy the vibrant culture of Barcelona, the beaches of Costa del Sol, and the Alhambra in Granada',
    packages: 18
  },
  {
    id: 4,
    name: 'Greece',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    description: 'Explore the ancient ruins of Athens, the white-washed villages of Santorini, and the crystal waters of Mykonos',
    packages: 14
  },
  {
    id: 5,
    name: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Discover the majestic Alps, pristine lakes, and charming villages of this Alpine paradise',
    packages: 16
  }
]

function FeaturedDestinations() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(destinations.length / itemsPerPage);
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  
  const currentDestinations = destinations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display">Popular Destinations</h2>
          <div className="flex space-x-2">
            <button 
              onClick={prevPage}
              className="p-2 rounded-full border border-gray-300 hover:bg-primary-50"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextPage}
              className="p-2 rounded-full border border-gray-300 hover:bg-primary-50"
            >
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/destinations/${destination.name.toLowerCase()}`}
                className="destination-card block h-full overflow-hidden rounded-xl shadow-lg bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white font-display">
                    {destination.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-primary-600 font-medium">
                      {destination.packages} packages available
                    </span>
                    <span className="text-primary-600 font-medium flex items-center">
                      Explore
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/packages" className="btn btn-primary">
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedDestinations
