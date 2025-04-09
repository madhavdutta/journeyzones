import { useState, useEffect } from 'react'
import PackageCard from './PackageCard'
import { FiGrid, FiList, FiFilter } from 'react-icons/fi'
import { useSearch } from '../../contexts/SearchContext'

// Sample data - in a real app, this would come from your API
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
    reviews: 124,
    activities: ['culture', 'food']
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
    reviews: 98,
    activities: ['adventure', 'culture']
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
    reviews: 156,
    activities: ['beach', 'adventure']
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
    reviews: 112,
    activities: ['culture', 'food']
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
    reviews: 178,
    activities: ['beach', 'wellness']
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
    reviews: 92,
    activities: ['culture', 'wellness']
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
    reviews: 145,
    activities: ['adventure', 'wildlife']
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
    reviews: 87,
    activities: ['culture', 'food']
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
    reviews: 76,
    activities: ['culture', 'food']
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
    reviews: 104,
    activities: ['beach', 'adventure']
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
    reviews: 132,
    activities: ['culture', 'food']
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
    reviews: 89,
    activities: ['culture', 'adventure']
  }
]

function PackageList() {
  const { searchParams } = useSearch()
  const [filteredPackages, setFilteredPackages] = useState(allPackages)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('recommended')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    // Filter packages based on search parameters
    let filtered = [...allPackages]
    
    // Filter by destination
    if (searchParams.destination) {
      filtered = filtered.filter(pkg => 
        pkg.destination.toLowerCase() === searchParams.destination.toLowerCase()
      )
    }
    
    // Filter by budget
    if (searchParams.budget && searchParams.budget.length === 2) {
      const [min, max] = searchParams.budget
      filtered = filtered.filter(pkg => pkg.price >= min && pkg.price <= max)
    }
    
    // Filter by activities
    if (searchParams.activities && searchParams.activities.length > 0) {
      filtered = filtered.filter(pkg => 
        searchParams.activities.some(activity => pkg.activities.includes(activity))
      )
    }
    
    // Sort packages
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'duration':
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default: // 'recommended'
        // Keep original order
        break
    }
    
    setFilteredPackages(filtered)
  }, [searchParams, sortBy])

  return (
    <div>
      {/* Sort and View Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-gray-600 mr-2">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration">Duration</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <span className="text-gray-600 mr-2 hidden sm:inline">View:</span>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className={`px-3 py-1 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <FiGrid />
            </button>
            <button
              className={`px-3 py-1 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <FiList />
            </button>
          </div>
          
          <button
            className="ml-2 px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-600 sm:hidden"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <FiFilter />
          </button>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredPackages.length} packages
          {searchParams.destination && ` in ${searchParams.destination}`}
        </p>
      </div>
      
      {/* Package Grid/List */}
      {filteredPackages.length > 0 ? (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
          {filteredPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-2">No packages found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search filters to find more options.</p>
          <button
            onClick={() => {
              // Reset search params
              window.location.reload()
            }}
            className="btn btn-primary"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default PackageList
