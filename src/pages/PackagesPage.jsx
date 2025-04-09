import { useEffect } from 'react'
import SearchFilters from '../components/packages/SearchFilters'
import PackageList from '../components/packages/PackageList'

function PackagesPage() {
  useEffect(() => {
    document.title = 'Travel Packages | Journey Zones'
  }, [])

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display">Travel Packages</h1>
          <p className="text-gray-600 max-w-3xl">
            Discover our handcrafted travel packages to the world's most breathtaking destinations. 
            Filter by location, budget, and activities to find your perfect journey.
          </p>
        </div>
        
        <SearchFilters />
        <PackageList />
      </div>
    </div>
  )
}

export default PackagesPage
