import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar, FiUsers, FiClock, FiCheck } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function PackageBookingCard({ packageData }) {
  const [startDate, setStartDate] = useState(null)
  const [travelers, setTravelers] = useState(2)
  const [totalPrice, setTotalPrice] = useState(packageData.price * 2)

  const handleDateChange = (date) => {
    setStartDate(date)
  }

  const handleTravelersChange = (e) => {
    const count = parseInt(e.target.value)
    setTravelers(count)
    setTotalPrice(packageData.price * count)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="block text-sm text-gray-500">Starting from</span>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-primary-600">${packageData.price}</span>
            <span className="text-gray-500 ml-1">/ person</span>
          </div>
        </div>
        <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          <FiCheck className="mr-1" />
          <span>Best Value</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Travel Date
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              minDate={new Date()}
              placeholderText="Select your travel date"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Travelers
          </label>
          <div className="relative">
            <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={travelers}
              onChange={handleTravelersChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between mb-2">
          <span>Package Price</span>
          <span>${packageData.price} x {travelers}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Taxes & Fees</span>
          <span>Included</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      <Link
        to={startDate ? `/booking/${packageData.id}?date=${startDate.toISOString()}&travelers=${travelers}` : '#'}
        className={`btn w-full ${startDate ? 'btn-primary' : 'bg-gray-300 cursor-not-allowed'}`}
        onClick={(e) => !startDate && e.preventDefault()}
      >
        {startDate ? 'Book Now' : 'Select a Date'}
      </Link>

      <div className="mt-4 space-y-3 text-sm text-gray-600">
        <div className="flex items-center">
          <FiCalendar className="mr-2 text-primary-600" />
          <span>Free cancellation up to 7 days before</span>
        </div>
        <div className="flex items-center">
          <FiClock className="mr-2 text-primary-600" />
          <span>Duration: {packageData.duration}</span>
        </div>
      </div>
    </div>
  )
}

export default PackageBookingCard
