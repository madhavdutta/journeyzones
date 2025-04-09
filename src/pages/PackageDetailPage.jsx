import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiMapPin, FiClock, FiCalendar, FiUsers, FiArrowLeft } from 'react-icons/fi'
import PackageGallery from '../components/package-detail/PackageGallery'
import PackageHighlights from '../components/package-detail/PackageHighlights'
import PackageItinerary from '../components/package-detail/PackageItinerary'
import PackageInclusions from '../components/package-detail/PackageInclusions'
import PackageBookingCard from '../components/package-detail/PackageBookingCard'
import PackageReviews from '../components/package-detail/PackageReviews'
import RelatedPackages from '../components/package-detail/RelatedPackages'

// Sample data - in a real app, this would come from your API
const packageData = {
  id: 1,
  title: 'Golden Triangle Tour',
  destination: 'India',
  location: 'Delhi, Agra, Jaipur',
  duration: '6 days',
  price: 899,
  rating: 4.8,
  reviews: 124,
  description: 'Experience the rich history and vibrant culture of India with our Golden Triangle Tour. This journey takes you through the heart of India, exploring the bustling streets of Delhi, the majestic Taj Mahal in Agra, and the pink city of Jaipur. Immerse yourself in the local culture, taste authentic cuisine, and witness the architectural marvels that have stood the test of time.',
  highlights: [
    'Visit the iconic Taj Mahal at sunrise',
    'Explore the historic Red Fort in Delhi',
    'Experience the vibrant markets of Jaipur',
    'Enjoy a traditional Rajasthani dinner with folk performances',
    'Take a rickshaw ride through Old Delhi',
    'Visit the majestic Amber Fort',
    'Shop for handicrafts and textiles'
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival in Delhi',
      description: 'Arrive at Indira Gandhi International Airport, where you will be greeted by your guide and transferred to your hotel. After check-in and some rest, enjoy a welcome dinner at a local restaurant.',
      activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner'],
      meals: 'Dinner',
      accommodation: 'The Imperial New Delhi or similar'
    },
    {
      day: 2,
      title: 'Delhi City Tour',
      description: 'Spend the day exploring the contrasts of Old and New Delhi. Visit historical sites, bustling markets, and experience the vibrant culture of India\'s capital.',
      activities: ['Visit Jama Masjid', 'Rickshaw ride through Chandni Chowk', 'Explore Humayun\'s Tomb', 'See India Gate and Parliament House'],
      meals: 'Breakfast, Lunch',
      accommodation: 'The Imperial New Delhi or similar'
    },
    {
      day: 3,
      title: 'Delhi to Agra',
      description: 'After breakfast, drive to Agra (approx. 4 hours). In the afternoon, visit the magnificent Agra Fort and enjoy the sunset view of the Taj Mahal from Mehtab Bagh gardens.',
      activities: ['Drive to Agra', 'Visit Agra Fort', 'Sunset view of Taj Mahal'],
      meals: 'Breakfast, Dinner',
      accommodation: 'ITC Mughal Agra or similar'
    },
    {
      day: 4,
      title: 'Taj Mahal and Travel to Jaipur',
      description: 'Wake up early for a sunrise visit to the iconic Taj Mahal. After breakfast, drive to Jaipur (approx. 5 hours), stopping at Fatehpur Sikri along the way.',
      activities: ['Sunrise at Taj Mahal', 'Visit Fatehpur Sikri', 'Drive to Jaipur'],
      meals: 'Breakfast, Lunch',
      accommodation: 'Taj Jai Mahal Palace or similar'
    },
    {
      day: 5,
      title: 'Jaipur Exploration',
      description: 'Full day exploring the Pink City of Jaipur. Visit the Amber Fort, City Palace, Hawa Mahal, and the local markets. In the evening, enjoy a traditional Rajasthani dinner with folk performances.',
      activities: ['Visit Amber Fort', 'Explore City Palace and Jantar Mantar', 'Shopping at local markets', 'Cultural dinner with performances'],
      meals: 'Breakfast, Dinner',
      accommodation: 'Taj Jai Mahal Palace or similar'
    },
    {
      day: 6,
      title: 'Departure from Jaipur',
      description: 'After breakfast, transfer to Jaipur International Airport for your departure flight. End of services.',
      activities: ['Airport transfer'],
      meals: 'Breakfast',
      accommodation: 'N/A'
    }
  ],
  inclusions: [
    '5 nights accommodation in 5-star hotels',
    'Daily breakfast and select meals as per itinerary',
    'All transportation in private air-conditioned vehicle',
    'Professional English-speaking guide throughout the tour',
    'All sightseeing and entrance fees as per itinerary',
    'Welcome dinner with cultural performance',
    'Sunrise visit to Taj Mahal',
    'Rickshaw ride in Old Delhi',
    'Bottled water during sightseeing',
    '24/7 customer support'
  ],
  exclusions: [
    'International or domestic flights',
    'Visa fees',
    'Travel insurance',
    'Personal expenses (laundry, phone calls, etc.)',
    'Camera fees at monuments',
    'Tips for guides and drivers',
    'Meals not mentioned in the itinerary',
    'Any activities not mentioned in the inclusions'
  ],
  images: [
    {
      url: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
      alt: 'Taj Mahal at sunrise'
    },
    {
      url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      alt: 'Amber Fort in Jaipur'
    },
    {
      url: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      alt: 'Streets of Old Delhi'
    },
    {
      url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      alt: 'Red Fort in Delhi'
    },
    {
      url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      alt: 'Hawa Mahal in Jaipur'
    }
  ],
  reviewsData: [
    {
      id: 1,
      userName: 'Michael Chen',
      userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      title: 'Unforgettable experience!',
      comment: 'The Golden Triangle tour exceeded all our expectations. The guides were knowledgeable, the hotels were excellent, and the itinerary was perfectly balanced. Seeing the Taj Mahal at sunrise was a truly magical experience that we will never forget.',
      date: 'June 15, 2023',
      helpfulCount: 12
    },
    {
      id: 2,
      userName: 'Sarah Johnson',
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      title: 'Amazing cultural journey',
      comment: 'This tour was the perfect introduction to India. We loved every moment, from the bustling streets of Delhi to the serene beauty of the Taj Mahal. Our guide Raj was exceptional - knowledgeable, friendly, and attentive to our needs. The accommodations were luxurious and the food was delicious.',
      date: 'May 3, 2023',
      helpfulCount: 8,
      response: 'Thank you for your kind words, Sarah! We\'re delighted that you enjoyed your Golden Triangle tour and appreciated Raj\'s expertise. We hope to welcome you back to India for another adventure soon!'
    },
    {
      id: 3,
      userName: 'David Wilson',
      userAvatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      rating: 4,
      title: 'Great tour with minor hiccups',
      comment: 'Overall, this was an excellent tour. The sights were breathtaking and our guide was very informative. The only reason I\'m giving 4 stars instead of 5 is because of some transportation delays and one hotel that wasn\'t up to the standard of the others. Still, I would recommend this tour to anyone interested in experiencing India\'s rich culture and history.',
      date: 'April 18, 2023',
      helpfulCount: 5
    },
    {
      id: 4,
      userName: 'Emma Rodriguez',
      userAvatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      rating: 5,
      title: 'Perfect family adventure',
      comment: 'We took this tour with our two teenage children and it was perfect for the whole family. The pace was good, with enough downtime between activities. The kids especially loved the elephant ride at Amber Fort and the rickshaw tour through Old Delhi. Our guide was patient and made sure everyone\'s interests were addressed.',
      date: 'March 22, 2023',
      helpfulCount: 7
    },
    {
      id: 5,
      userName: 'James Thompson',
      userAvatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      rating: 5,
      title: 'Photography dream tour',
      comment: 'As an amateur photographer, this tour was a dream come true. The sunrise at the Taj Mahal provided incredible lighting, and the colorful markets of Jaipur offered endless photo opportunities. Our guide even showed us some hidden spots for the best shots. The accommodations were comfortable and the food was authentic and delicious.',
      date: 'February 10, 2023',
      helpfulCount: 10
    }
  ]
}

// Sample related packages
const relatedPackages = [
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
    id: 11,
    title: 'Rajasthan Royal Tour',
    destination: 'India',
    location: 'Jaipur, Udaipur, Jodhpur, Jaisalmer',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    duration: '9 days',
    price: 1399,
    rating: 4.8,
    reviews: 132
  }
]

function PackageDetailPage() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  
  // In a real app, you would fetch the package data based on the ID
  // For this example, we'll just use the sample data
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 500)
    
    document.title = `${packageData.title} | Journey Zones`
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [id])
  
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

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/packages" className="inline-flex items-center text-primary-600 hover:text-primary-700">
            <FiArrowLeft className="mr-2" />
            <span>Back to Packages</span>
          </Link>
        </div>
        
        {/* Package Title and Basic Info */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display">{packageData.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 gap-x-6 gap-y-2">
            <div className="flex items-center">
              <FiMapPin className="mr-1" />
              <span>{packageData.location}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-1" />
              <span>{packageData.duration}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span>{packageData.rating} ({packageData.reviews} reviews)</span>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Package Details */}
          <div className="lg:col-span-2">
            {/* Package Gallery */}
            <PackageGallery images={packageData.images} />
            
            {/* Tabs Navigation */}
            <div className="mt-8 border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'itinerary'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('itinerary')}
                >
                  Itinerary
                </button>
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'inclusions'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('inclusions')}
                >
                  Inclusions
                </button>
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'reviews'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="mt-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">{packageData.description}</p>
                  
                  <PackageHighlights highlights={packageData.highlights} />
                </div>
              )}
              
              {/* Itinerary Tab */}
              {activeTab === 'itinerary' && (
                <PackageItinerary itinerary={packageData.itinerary} />
              )}
              
              {/* Inclusions Tab */}
              {activeTab === 'inclusions' && (
                <PackageInclusions 
                  inclusions={packageData.inclusions} 
                  exclusions={packageData.exclusions} 
                />
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <PackageReviews 
                  reviews={packageData.reviewsData} 
                  averageRating={packageData.rating} 
                  totalReviews={packageData.reviews} 
                />
              )}
            </div>
          </div>
          
          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <PackageBookingCard packageData={packageData} />
          </div>
        </div>
        
        {/* Related Packages */}
        <div className="mt-20">
          <RelatedPackages packages={relatedPackages} currentPackageId={packageData.id} />
        </div>
      </div>
    </div>
  )
}

export default PackageDetailPage
