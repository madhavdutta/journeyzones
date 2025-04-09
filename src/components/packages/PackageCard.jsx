import { Link } from 'react-router-dom'
import { FiClock, FiMapPin, FiStar, FiUsers } from 'react-icons/fi'

function PackageCard({ pkg }) {
  return (
    <Link 
      to={`/packages/${pkg.id}`}
      className="block h-full rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:shadow-xl"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
          ${pkg.price}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FiMapPin className="mr-1" />
          <span>{pkg.location}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm">
            <FiClock className="mr-1 text-primary-600" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center text-sm">
            <FiStar className="mr-1 text-yellow-500" />
            <span>{pkg.rating} ({pkg.reviews} reviews)</span>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-primary-600 font-medium">View Details</span>
          <div className="flex items-center text-gray-500 text-sm">
            <FiUsers className="mr-1" />
            <span>Group Tour</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PackageCard
