import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import PackageCard from '../components/packages/PackageCard'

// Sample data - in a real app, this would come from your API
const destinationsData = {
  india: {
    name: 'India',
    title: 'Discover the Magic of India',
    description: 'Experience the vibrant colors, rich history, and diverse landscapes of incredible India. From the majestic Taj Mahal to the serene backwaters of Kerala, India offers a tapestry of unforgettable experiences.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    highlights: [
      'Visit the iconic Taj Mahal in Agra',
      'Explore the vibrant markets of Jaipur',
      'Cruise the serene backwaters of Kerala',
      'Experience spiritual Varanasi on the Ganges',
      'Discover the beaches and cuisine of Goa'
    ],
    bestTimeToVisit: 'October to March',
    currency: 'Indian Rupee (INR)',
    language: 'Hindi, English, and many regional languages',
    packages: [1, 6, 11]
  },
  dubai: {
    name: 'Dubai',
    title: 'Experience Luxury in Dubai',
    description: 'Discover the perfect blend of modern marvels and Arabian heritage in Dubai. From the world\'s tallest building to vast desert landscapes, Dubai offers luxury, adventure, and cultural experiences like nowhere else.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    highlights: [
      'Visit the iconic Burj Khalifa',
      'Shop at the Dubai Mall and Gold Souk',
      'Experience a desert safari with dune bashing',
      'Explore the historic Al Fahidi district',
      'Enjoy luxury dining and entertainment'
    ],
    bestTimeToVisit: 'November to March',
    currency: 'United Arab Emirates Dirham (AED)',
    language: 'Arabic, English',
    packages: [2, 7, 12]
  },
  thailand: {
    name: 'Thailand',
    title: 'Explore the Wonders of Thailand',
    description: 'From bustling Bangkok to serene island paradises, Thailand captivates with its perfect blend of vibrant city life, rich cultural heritage, and stunning natural beauty. Experience warm hospitality, delicious cuisine, and unforgettable adventures.',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1139&q=80',
    highlights: [
      'Explore the temples and markets of Bangkok',
      'Relax on the beautiful beaches of Phuket',
      'Visit the historic city of Chiang Mai',
      'Experience the famous Full Moon Party on Koh Phangan',
      'Discover the stunning Phi Phi Islands'
    ],
    bestTimeToVisit: 'November to March',
    currency: 'Thai Baht (THB)',
    language: 'Thai, English in tourist areas',
    packages: [3, 8]
  },
  vietnam: {
    name: 'Vietnam',
    title: 'Journey Through Vietnam',
    description: 'Vietnam offers a captivating mix of bustling cities, breathtaking landscapes, rich history, and delicious cuisine. From the terraced rice fields of Sapa to the limestone karsts of Halong Bay, Vietnam is a country of extraordinary beauty and cultural depth.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    highlights: [
      'Cruise through the stunning Halong Bay',
      'Explore the historic streets of Hoi An',
      'Experience the vibrant city life of Hanoi and Ho Chi Minh City',
      'Discover the Mekong Delta\'s floating markets',
      'Trek through the terraced rice fields of Sapa'
    ],
    bestTimeToVisit: 'February to April and August to October',
    currency: 'Vietnamese Dong (VND)',
    language: 'Vietnamese, English in tourist areas',
    packages: [4, 9]
  },
  indonesia: {
    name: 'Indonesia',
    title: 'Discover Paradise in Indonesia',
    description: 'Indonesia, an archipelago of over 17,000 islands, offers endless adventures from the spiritual heart of Bali to the ancient temples of Java and the untouched wilderness of Sumatra. Experience diverse cultures, stunning landscapes, and warm hospitality.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80',
    highlights: [
      'Explore the cultural heart of Bali in Ubud',
      'Visit the ancient Borobudur Temple in Java',
      'Relax on the pristine beaches of the Gili Islands',
      'Discover the unique wildlife of Komodo National Park',
      'Experience the vibrant underwater world while diving in Raja Ampat'
    ],
    bestTimeToVisit: 'April to October',
    currency: 'Indonesian Rupiah (IDR)',
    language: 'Indonesian, English in tourist areas',
    packages: [5, 10]
  }
}

// Sample packages data
const allPackages = [
  {
    id: 1,
    title: 'Golden Triangle Tour',
    destination: 'India',
    location: 'Delhi, Agra, Jaipur',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
    duration: '6 days',
    price: 899,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    title: 'Dubai City Explorer',
    destination: 'Dubai',
    location: 'Dubai, Abu Dhabi',
    image: 'https://images.unsplash.com/photo-1582672752950-8b5622a7d651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    duration: '5 days',
    price: 1299,
    rating: 4.9,
    reviews: 98
  },
  {
    id: 3,
    title: 'Thailand Island Hopping',
    destination: 'Thailand',
    location: 'Bangkok, Phuket, Phi Phi Islands',
    image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    duration: '8 days',
    price: 1099,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    title: 'Vietnam Heritage Tour',
    destination: 'Vietnam',
    location: 'Hanoi, Ha Long Bay, Hoi An',
    image: 'https://images.unsplash.com/photo-1573270689103-d7a4e42b609a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    duration: '7 days',
    price: 949,
    rating: 4.6,
    reviews: 112
  },
  {
    id: 5,
    title: 'Bali Paradise Escape',
    destination: 'Indonesia',
    location: 'Bali, Ubud, Seminyak',
    image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    duration: '6 days',
    price: 999,
    rating: 4.9,
    reviews: 178
  },
  {
    id: 6,
    title: 'Kerala Backwaters Cruise',
    destination: 'India',
    location: 'Kochi, Alleppey, Kumarakom',
    image: 'https://images.unsplash.com/photo-1602301413679-62c2dbd6b29b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    duration: '5 days',
    price: 799,
    rating: 4.7,
    reviews: 92
  },
  {
    id: 7,
    title: 'Dubai Desert Safari',
    destination: 'Dubai',
    location: 'Dubai Desert Conservation Reserve',
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    duration: '3 days',
    price: 699,
    rating: 4.8,
    reviews: 145
  },
  {
    id: 8,
    title: 'Chiang Mai Explorer',
    destination: 'Thailand',
    location: 'Chiang Mai, Chiang Rai',
    image: 'https://images.unsplash.com/photo-1569760142069-bc6838de16c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    duration: '5 days',
    price: 849,
    rating: 4.6,
    reviews: 87
  },
  {
    id: 9,
    title: 'Mekong Delta Journey',
    destination: 'Vietnam',
    location: 'Ho Chi Minh City, Can Tho, My Tho',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    duration: '4 days',
    price: 699,
    rating: 4.5,
    reviews: 76
  },
  {
    id: 10,
    title: 'Lombok Island Retreat',
    destination: 'Indonesia',
    location: 'Lombok, Gili Islands',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    duration: '7 days',
    price: 1199,
    rating: 4.9,
    reviews: 104
  },
  {
    id: 11,
    title: 'Rajasthan Royal Tour',
    destination: 'India',
    location: 'Jaipur, Udaipur, Jodhpur, Jaisalmer',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    duration: '9 days',
    price: 1399,
    rating: 4.8,
    reviews: 132
  },
  {
    id: 12,
    title: 'Abu Dhabi Discovery',
    destination: 'Dubai',
    location: 'Abu Dhabi, Al Ain',
    image: 'https://images.unsplash.com/photo-1626602411112-10742f9a3ab8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    duration: '4 days',
    price: 899,
    rating: 4.7,
    reviews: 89
  }
]

function DestinationPage() {
  const { country } = useParams()
  const [loading, setLoading] = useState(true)
  const [destination, setDestination] = useState(null)
  const [packages, setPackages] = useState([])
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const destinationData = destinationsData[country.toLowerCase()]
      
      if (destinationData) {
        setDestination(destinationData)
        
        // Get packages for this destination
        const destinationPackages = allPackages.filter(pkg => 
          destinationData.packages.includes(pkg.id)
        )
        
        setPackages(destinationPackages)
      }
      
      setLoading(false)
    }, 500)
    
    // Set page title
    if (destinationsData[country.toLowerCase()]) {
      document.title = `${destinationsData[country.toLowerCase()].name} | Journey Zones`
    } else {
      document.title = 'Destination | Journey Zones'
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [country])
  
  if (loading) {
    return (
      <div className="pt-24 pb-20">
        <div className="container">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!destination) {
    return (
      <div className="pt-24 pb-20">
        <div className="container">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
            <p className="text-gray-600 mb-8">Sorry, we couldn't find information about this destination.</p>
            <Link to="/packages" className="btn btn-primary">
              Browse All Packages
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] flex items-center justify-center"
        style={{ 
          backgroundImage: `url(${destination.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
            {destination.name}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {destination.title}
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-16">
        <div className="container">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/packages" className="inline-flex items-center text-primary-600 hover:text-primary-700">
              <FiArrowLeft className="mr-2" />
              <span>Back to All Destinations</span>
            </Link>
          </div>
          
          {/* Destination Info */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 font-display">About {destination.name}</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-4xl">
              {destination.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {/* Highlights */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Highlights</h3>
                <ul className="space-y-2">
                  {destination.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Travel Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Travel Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Best Time to Visit</h4>
                    <p>{destination.bestTimeToVisit}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Currency</h4>
                    <p>{destination.currency}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Language</h4>
                    <p>{destination.language}</p>
                  </div>
                </div>
              </div>
              
              {/* Quick Facts */}
              <div className="bg-primary-50 rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Why Visit {destination.name}</h3>
                <p className="mb-4">
                  {destination.name} offers a perfect blend of cultural experiences, natural beauty, and unforgettable adventures for every type of traveler.
                </p>
                <Link to="/contact" className="btn btn-primary w-full">
                  Get a Custom Itinerary
                </Link>
              </div>
            </div>
          </div>
          
          {/* Packages */}
          <div>
            <h2 className="text-3xl font-bold mb-6 font-display">
              Travel Packages in {destination.name}
            </h2>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Explore our handcrafted travel packages for {destination.name}. Each package is designed to provide you with an authentic and memorable experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
            
            {packages.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-2">No packages available</h3>
                <p className="text-gray-600 mb-6">We're currently updating our packages for this destination.</p>
                <Link to="/contact" className="btn btn-primary">
                  Contact Us for Custom Tour
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationPage
