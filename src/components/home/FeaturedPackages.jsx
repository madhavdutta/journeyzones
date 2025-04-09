import { Link } from 'react-router-dom'
import { FiClock, FiMapPin, FiStar, FiUsers } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const featuredPackages = [
  {
    id: 1,
    title: 'Paris & French Riviera',
    destination: 'France',
    location: 'Paris, Nice, Cannes, Monaco',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    duration: '8 days',
    price: 2899,
    rating: 4.9,
    reviews: 124
  },
  {
    id: 2,
    title: 'Italian Renaissance Tour',
    destination: 'Italy',
    location: 'Rome, Florence, Venice',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1083&q=80',
    duration: '10 days',
    price: 3299,
    rating: 4.9,
    reviews: 98
  },
  {
    id: 3,
    title: 'Greek Islands Luxury Cruise',
    destination: 'Greece',
    location: 'Athens, Santorini, Mykonos, Crete',
    image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    duration: '12 days',
    price: 4099,
    rating: 4.8,
    reviews: 156
  },
  {
    id: 4,
    title: 'Swiss Alps Adventure',
    destination: 'Switzerland',
    location: 'Zurich, Lucerne, Interlaken, Zermatt',
    image: 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    duration: '7 days',
    price: 3449,
    rating: 4.7,
    reviews: 112
  },
  {
    id: 5,
    title: 'Spanish Splendor',
    destination: 'Spain',
    location: 'Barcelona, Madrid, Seville, Granada',
    image: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
    duration: '9 days',
    price: 2999,
    rating: 4.9,
    reviews: 178
  }
]

function FeaturedPackages() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <p className="luxury-title">Curated Experiences</p>
        <h2 className="section-title">Luxury Packages</h2>
        <p className="section-subtitle">
          Indulge in our collection of premium European travel experiences crafted for the discerning traveler
        </p>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mt-12 pb-12"
        >
          {featuredPackages.map((pkg) => (
            <SwiperSlide key={pkg.id}>
              <Link 
                to={`/packages/${pkg.id}`}
                className="block h-full rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:shadow-xl luxury-shadow"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-luxury-gold text-white text-sm font-bold px-3 py-1 rounded-full">
                    €{pkg.price}
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
                    <span className="text-luxury-burgundy font-medium">View Details</span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiUsers className="mr-1" />
                      <span>Luxury Tour</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-8">
          <Link to="/packages" className="btn btn-luxury">
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPackages
