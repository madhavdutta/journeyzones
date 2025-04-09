import Hero from '../components/home/Hero'
import FeaturedDestinations from '../components/home/FeaturedDestinations'
import FeaturedPackages from '../components/home/FeaturedPackages'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Testimonials from '../components/home/Testimonials'
import Newsletter from '../components/home/Newsletter'

function HomePage() {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
      <FeaturedDestinations />
      <FeaturedPackages />
      <Testimonials />
      <Newsletter />
    </div>
  )
}

export default HomePage
