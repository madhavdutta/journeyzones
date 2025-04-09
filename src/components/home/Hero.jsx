import { Link } from 'react-router-dom'
import { FiMap, FiCalendar, FiUsers, FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import { useSearch } from '../../contexts/SearchContext'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const { updateSearch } = useSearch()
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  
  const handleSearch = (e) => {
    e.preventDefault()
    updateSearch({ destination })
    navigate('/packages')
  }

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden hero-gradient">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element floating-element-1">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="#2570e9" fillOpacity="0.2"/>
          </svg>
        </div>
        <div className="floating-element floating-element-2">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#d4af37" fillOpacity="0.2"/>
          </svg>
        </div>
        <div className="floating-element floating-element-3">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16V8.00004C21 6.34315 19.6569 5.00004 18 5.00004H17.9983C16.3414 5.00004 14.9983 6.34315 14.9983 8.00004V16C14.9983 17.6569 16.3414 19 17.9983 19H18C19.6569 19 21 17.6569 21 16Z" fill="#2570e9" fillOpacity="0.2"/>
            <path d="M9 16V8.00004C9 6.34315 7.65685 5.00004 6 5.00004H5.99828C4.34139 5.00004 2.99828 6.34315 2.99828 8.00004V16C2.99828 17.6569 4.34139 19 5.99828 19H6C7.65685 19 9 17.6569 9 16Z" fill="#2570e9" fillOpacity="0.2"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight">
              Life is short and<br />the world is <span className="text-primary-600">wide</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-xl mb-8">
              Take the unique chance to get the most unforgettable experience. These are the emotions you'll never forget!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/packages" className="btn btn-primary">
                Plan your trip
              </Link>
              <Link to="/about" className="btn btn-secondary flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
                </svg>
                See your journey
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Travelers enjoying Europe" 
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Search Box */}
        <div className="search-box mt-12 max-w-5xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row">
              <div className="search-box-item flex-1">
                <div className="mr-3 text-primary-600">
                  <FiMap size={24} />
                </div>
                <div className="flex-1">
                  <label htmlFor="location" className="block text-xs text-gray-500 font-medium">Location</label>
                  <input 
                    type="text" 
                    id="location" 
                    placeholder="Where are you going?"
                    className="w-full border-none p-0 focus:ring-0 text-gray-800"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="search-box-item flex-1">
                <div className="mr-3 text-primary-600">
                  <FiCalendar size={24} />
                </div>
                <div className="flex-1">
                  <label htmlFor="date" className="block text-xs text-gray-500 font-medium">Date</label>
                  <input 
                    type="text" 
                    id="date" 
                    placeholder="When are you going?"
                    className="w-full border-none p-0 focus:ring-0 text-gray-800"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="md:pl-4 mt-4 md:mt-0">
                <button type="submit" className="w-full btn btn-primary flex items-center">
                  <FiSearch className="mr-2" />
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Hero
