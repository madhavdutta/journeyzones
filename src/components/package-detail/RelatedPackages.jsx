import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import PackageCard from '../packages/PackageCard'

function RelatedPackages({ packages, currentPackageId }) {
  // Filter out the current package
  const filteredPackages = packages.filter(pkg => pkg.id !== currentPackageId)

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">You Might Also Like</h3>
      
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
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
        modules={[Pagination, Navigation]}
        className="pb-12"
      >
        {filteredPackages.map((pkg) => (
          <SwiperSlide key={pkg.id}>
            <PackageCard pkg={pkg} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default RelatedPackages
