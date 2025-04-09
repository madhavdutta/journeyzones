import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { FiStar } from 'react-icons/fi'

const testimonials = [
  {
    id: 1,
    name: 'Sophie Laurent',
    location: 'London, UK',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'Our trip to the French Riviera was absolutely divine! Journey Zones arranged everything perfectly, from our luxury accommodations to private tours. The yacht day in Monaco was the highlight of our vacation. We will definitely book with them again!',
    destination: 'France'
  },
  {
    id: 2,
    name: 'Alessandro Ricci',
    location: 'New York, USA',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'The Italian Renaissance tour exceeded all our expectations. The private access to galleries in Florence, the exclusive wine tasting in Tuscany, and the luxury hotel in Venice with canal views were simply magnificent. Journey Zones created memories we\'ll cherish forever.',
    destination: 'Italy'
  },
  {
    id: 3,
    name: 'Charlotte Wilson',
    location: 'Sydney, Australia',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 5,
    text: 'Our Swiss Alps adventure was perfection from start to finish. The first-class train journeys through breathtaking mountain scenery, the luxury chalet in Zermatt, and the private chocolate making workshop in Zurich were all incredible experiences.',
    destination: 'Switzerland'
  },
  {
    id: 4,
    name: 'Miguel Fernandez',
    location: 'Toronto, Canada',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 5,
    text: 'The Spanish Splendor tour was exceptional! From the private flamenco performance in Seville to the exclusive Gaudi tour in Barcelona, every detail was thoughtfully arranged. The boutique hotels were exquisite and the culinary experiences were outstanding.',
    destination: 'Spain'
  },
  {
    id: 5,
    name: 'Elizabeth Bennett',
    location: 'Melbourne, Australia',
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
    rating: 5,
    text: 'Our Greek Islands cruise was absolute luxury! The private yacht, the exclusive beach access on Mykonos, and the sunset dinner in Santorini overlooking the caldera were all magical experiences. Journey Zones truly understands luxury travel.',
    destination: 'Greece'
  }
]

function Testimonials() {
  return (
    <section className="py-20 luxury-gradient">
      <div className="container">
        <p className="luxury-title">Client Experiences</p>
        <h2 className="section-title">What Our Travelers Say</h2>
        <p className="section-subtitle">
          Read authentic reviews from travelers who have experienced our luxury European journeys
        </p>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 6000,
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
          modules={[Pagination, Autoplay]}
          className="mt-12 pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col luxury-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    Trip to {testimonial.destination}
                  </span>
                </div>
                
                <p className="text-gray-600 flex-grow">"{testimonial.text}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials
