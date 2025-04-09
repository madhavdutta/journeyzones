import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiCalendar, FiUsers, FiCreditCard, FiLock, FiArrowLeft } from 'react-icons/fi'

function BookingPage() {
  const { packageId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [packageData, setPackageData] = useState(null)
  const [bookingInfo, setBookingInfo] = useState({
    travelers: 2,
    date: new Date().toISOString().split('T')[0],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    agreeTerms: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBookingComplete, setIsBookingComplete] = useState(false)
  const [bookingReference, setBookingReference] = useState('')

  useEffect(() => {
    document.title = 'Book Your Trip | Journey Zones'
    window.scrollTo(0, 0)
    
    // Simulate API call to get package data
    setTimeout(() => {
      // This is sample data - in a real app, you would fetch this from your API
      setPackageData({
        id: packageId,
        title: 'Golden Triangle Tour',
        destination: 'India',
        location: 'Delhi, Agra, Jaipur',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
        duration: '6 days',
        price: 899,
        rating: 4.8,
        reviews: 124
      })
      setLoading(false)
    }, 800)
  }, [packageId])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setBookingInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Validate contact info
    if (!bookingInfo.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!bookingInfo.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!bookingInfo.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(bookingInfo.email)) newErrors.email = 'Email is invalid'
    if (!bookingInfo.phone.trim()) newErrors.phone = 'Phone number is required'
    
    // Validate payment info
    if (bookingInfo.paymentMethod === 'credit-card') {
      if (!bookingInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
      else if (!/^\d{16}$/.test(bookingInfo.cardNumber.replace(/\s/g, ''))) 
        newErrors.cardNumber = 'Card number must be 16 digits'
      
      if (!bookingInfo.cardName.trim()) newErrors.cardName = 'Name on card is required'
      if (!bookingInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
      else if (!/^\d{2}\/\d{2}$/.test(bookingInfo.expiryDate)) 
        newErrors.expiryDate = 'Expiry date must be in MM/YY format'
      
      if (!bookingInfo.cvv.trim()) newErrors.cvv = 'CVV is required'
      else if (!/^\d{3,4}$/.test(bookingInfo.cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits'
    }
    
    // Validate terms agreement
    if (!bookingInfo.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Simulate API call to process booking
      setTimeout(() => {
        setIsSubmitting(false)
        setIsBookingComplete(true)
        setBookingReference('BK' + Math.floor(100000 + Math.random() * 900000))
      }, 2000)
    }
  }

  const calculateTotal = () => {
    if (!packageData) return 0
    return packageData.price * bookingInfo.travelers
  }

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

  if (isBookingComplete) {
    return (
      <div className="pt-24 pb-20">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 font-display">Booking Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Thank you for booking with Journey Zones. Your booking has been confirmed.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Booking Reference</h2>
                <p className="text-2xl font-mono">{bookingReference}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <h3 className="font-medium text-gray-700">Package</h3>
                  <p>{packageData.title}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Destination</h3>
                  <p>{packageData.destination}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Travel Date</h3>
                  <p>{new Date(bookingInfo.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Travelers</h3>
                  <p>{bookingInfo.travelers}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Total Amount</h3>
                  <p className="font-bold">${calculateTotal()}</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              A confirmation email has been sent to {bookingInfo.email} with all the details of your booking.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/profile" className="btn btn-primary">
                View My Bookings
              </Link>
              <Link to="/" className="btn btn-secondary">
                Return to Home
              </Link>
            </div>
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
          <Link to={`/packages/${packageId}`} className="inline-flex items-center text-primary-600 hover:text-primary-700">
            <FiArrowLeft className="mr-2" />
            <span>Back to Package</span>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 font-display">Book Your Trip</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Package Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Trip Summary</h2>
                <div className="flex items-start">
                  <img 
                    src={packageData.image} 
                    alt={packageData.title} 
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{packageData.title}</h3>
                    <p className="text-gray-600">{packageData.location}</p>
                    <p className="text-gray-600">{packageData.duration}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Travel Date
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={bookingInfo.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Travelers
                    </label>
                    <div className="relative">
                      <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        id="travelers"
                        name="travelers"
                        value={bookingInfo.travelers}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={bookingInfo.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      required
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={bookingInfo.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      required
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={bookingInfo.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={bookingInfo.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      required
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows="3"
                      value={bookingInfo.specialRequests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Payment Information</h2>
                  <div className="flex items-center text-gray-600">
                    <FiLock className="mr-1" />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="credit-card"
                        name="paymentMethod"
                        value="credit-card"
                        checked={bookingInfo.paymentMethod === 'credit-card'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="credit-card" className="ml-2 block text-sm text-gray-700">
                        Credit Card
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={bookingInfo.paymentMethod === 'paypal'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="paypal" className="ml-2 block text-sm text-gray-700">
                        PayPal
                      </label>
                    </div>
                  </div>
                </div>
                
                {bookingInfo.paymentMethod === 'credit-card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <div className="relative">
                        <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={bookingInfo.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full pl-10 pr-4 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                        />
                      </div>
                      {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={bookingInfo.cardName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      />
                      {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={bookingInfo.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-2 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      />
                      {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={bookingInfo.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className={`w-full px-4 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      />
                      {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                    </div>
                  </div>
                )}
                
                {bookingInfo.paymentMethod === 'paypal' && (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="mb-4">You will be redirected to PayPal to complete your payment after submitting this form.</p>
                    <img 
                      src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" 
                      alt="PayPal" 
                      className="h-10 mx-auto"
                    />
                  </div>
                )}
              </div>
              
              {/* Terms and Conditions */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={bookingInfo.agreeTerms}
                    onChange={handleInputChange}
                    className={`h-4 w-4 text-primary-600 focus:ring-primary-500 ${errors.agreeTerms ? 'border-red-500' : 'border-gray-300'} rounded`}
                  />
                  <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <Link to="#" className="text-primary-600 hover:text-primary-700">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="#" className="text-primary-600 hover:text-primary-700">
                      Cancellation Policy
                    </Link>
                  </label>
                </div>
                {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>}
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-full py-3 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </form>
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="font-bold">{packageData.title}</h3>
                <p className="text-gray-600">{packageData.location}</p>
                <p className="text-gray-600">{packageData.duration}</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Travel Date</span>
                  <span>{new Date(bookingInfo.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Travelers</span>
                  <span>{bookingInfo.travelers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per person</span>
                  <span>${packageData.price}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Including all taxes and fees</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <h3 className="font-bold mb-2">Cancellation Policy</h3>
                <p className="text-gray-600 mb-2">
                  Free cancellation up to 7 days before the travel date. Cancellations made within 7 days of travel are subject to a 50% fee.
                </p>
                <Link to="#" className="text-primary-600 hover:text-primary-700">
                  Read full policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
