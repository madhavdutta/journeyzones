import { useState, useEffect } from 'react'
import { FiSearch, FiMapPin, FiCalendar, FiUsers, FiDollarSign, FiFilter } from 'react-icons/fi'
import { useSearch } from '../../contexts/SearchContext'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'

const destinations = [
  { value: '', label: 'All Destinations' },
  { value: 'india', label: 'India' },
  { value: 'dubai', label: 'Dubai' },
  { value: 'thailand', label: 'Thailand' },
  { value: 'vietnam', label: 'Vietnam' },
  { value: 'indonesia', label: 'Indonesia' }
]

const activities = [
  { value: 'beach', label: 'Beach & Relaxation' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'culture', label: 'Cultural' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'food', label: 'Food & Culinary' },
  { value: 'wellness', label: 'Wellness & Spa' }
]

function SearchFilters({ onSearch }) {
  const { searchParams, updateSearch } = useSearch()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [localParams, setLocalParams] = useState(searchParams)

  useEffect(() => {
    setLocalParams(searchParams)
  }, [searchParams])

  const handleInputChange = (field, value) => {
    setLocalParams(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDateChange = (dates) => {
    const [start, end] = dates
    setLocalParams(prev => ({
      ...prev,
      dateRange: {
        startDate: start,
        endDate: end
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSearch(localParams)
    if (onSearch) onSearch(localParams)
    setIsFilterOpen(false)
  }

  const handleReset = () => {
    const resetParams = {
      destination: '',
      dateRange: {
        startDate: null,
        endDate: null
      },
      travelers: 1,
      budget: [0, 5000],
      activities: []
    }
    setLocalParams(resetParams)
    updateSearch(resetParams)
    if (onSearch) onSearch(resetParams)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg mb-8">
      {/* Basic Search - Always Visible */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="destination" className="sr-only">Destination</label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Select
                id="destination"
                options={destinations}
                placeholder="Where do you want to go?"
                className="w-full"
                classNamePrefix="react-select"
                value={destinations.find(option => option.value === localParams.destination) || null}
                onChange={(option) => handleInputChange('destination', option.value)}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '48px',
                    paddingLeft: '30px'
                  })
                }}
              />
            </div>
          </div>
          
          <div className="flex-1">
            <label htmlFor="dateRange" className="sr-only">Date Range</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
              <DatePicker
                id="dateRange"
                selected={localParams.dateRange.startDate}
                onChange={handleDateChange}
                startDate={localParams.dateRange.startDate}
                endDate={localParams.dateRange.endDate}
                selectsRange
                placeholderText="When are you traveling?"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700"
              />
            </div>
          </div>
          
          <div className="md:w-48">
            <button 
              type="submit"
              className="w-full btn btn-primary py-3"
            >
              <FiSearch className="mr-2" />
              Search
            </button>
          </div>
          
          <div className="md:w-auto">
            <button 
              type="button"
              className="w-full md:w-auto btn btn-secondary py-3"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
          </div>
        </div>
        
        {/* Advanced Filters - Toggleable */}
        {isFilterOpen && (
          <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Travelers
              </label>
              <div className="relative">
                <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={localParams.travelers}
                  onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range (USD)
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={`${localParams.budget[0]}-${localParams.budget[1]}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number)
                    handleInputChange('budget', [min, max])
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700"
                >
                  <option value="0-5000">Any Budget</option>
                  <option value="0-1000">Under $1,000</option>
                  <option value="1000-2000">$1,000 - $2,000</option>
                  <option value="2000-3000">$2,000 - $3,000</option>
                  <option value="3000-5000">$3,000 - $5,000</option>
                  <option value="5000-100000">$5,000+</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activities
              </label>
              <Select
                isMulti
                options={activities}
                placeholder="Select activities"
                className="w-full"
                classNamePrefix="react-select"
                value={activities.filter(option => localParams.activities.includes(option.value))}
                onChange={(selected) => handleInputChange('activities', selected.map(item => item.value))}
              />
            </div>
            
            <div className="md:col-span-3 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary mr-3"
              >
                Reset Filters
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default SearchFilters
