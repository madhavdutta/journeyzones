import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit2, FiLogOut } from 'react-icons/fi'

function ProfilePage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  
  // Sample booking data - in a real app, this would come from your API
  const [bookings, setBookings] = useState([
    {
      id: 'B12345',
      packageName: 'Golden Triangle Tour',
      destination: 'India',
      startDate: '2023-10-15',
      endDate: '2023-10-21',
      status: 'Confirmed',
      price: 899,
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80'
    },
    {
      id: 'B12346',
      packageName: 'Thailand Island Hopping',
      destination: 'Thailand',
      startDate: '2023-12-05',
      endDate: '2023-12-13',
      status: 'Pending',
      price: 1099,
      image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    }
  ])
  
  // Sample user profile data - in a real app, this would come from your API
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    dateOfBirth: '1985-06-15',
    profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg'
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)

  useEffect(() => {
    document.title = 'My Profile | Journey Zones'
    window.scrollTo(0, 0)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error.message)
    }
  }
  
  const handleEditProfile = () => {
    setIsEditing(true)
    setEditedProfile(profile)
  }
  
  const handleSaveProfile = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    // In a real app, you would save the profile to your backend here
  }
  
  const handleCancelEdit = () => {
    setIsEditing(false)
  }
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <img 
                  src={profile.profilePicture} 
                  alt={profile.fullName} 
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-bold">{profile.fullName}</h2>
                <p className="text-gray-600">{profile.email}</p>
              </div>
              
              <nav className="space-y-1">
                <button
                  className={`w-full flex items-center px-4 py-2 text-left rounded-lg ${
                    activeTab === 'profile' 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FiUser className="mr-3" />
                  <span>My Profile</span>
                </button>
                <button
                  className={`w-full flex items-center px-4 py-2 text-left rounded-lg ${
                    activeTab === 'bookings' 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <FiCalendar className="mr-3" />
                  <span>My Bookings</span>
                </button>
                <button
                  className="w-full flex items-center px-4 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-100"
                  onClick={handleSignOut}
                >
                  <FiLogOut className="mr-3" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">My Profile</h2>
                  {!isEditing && (
                    <button
                      onClick={handleEditProfile}
                      className="flex items-center text-primary-600 hover:text-primary-700"
                    >
                      <FiEdit2 className="mr-1" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={editedProfile.fullName}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={editedProfile.email}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          disabled
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={editedProfile.phone}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={editedProfile.dateOfBirth}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={editedProfile.address}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={handleCancelEdit}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="btn btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <FiUser className="w-5 h-5 text-primary-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p className="mt-1">{profile.fullName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiMail className="w-5 h-5 text-primary-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                        <p className="mt-1">{profile.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiPhone className="w-5 h-5 text-primary-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                        <p className="mt-1">{profile.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiCalendar className="w-5 h-5 text-primary-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                        <p className="mt-1">{formatDate(profile.dateOfBirth)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiMapPin className="w-5 h-5 text-primary-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Address</h3>
                        <p className="mt-1">{profile.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
                
                {bookings.length > 0 ? (
                  <div className="space-y-6">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                          <div className="md:col-span-1">
                            <img 
                              src={booking.image} 
                              alt={booking.packageName} 
                              className="w-full h-48 object-cover"
                            />
                          </div>
                          <div className="md:col-span-2 p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold">{booking.packageName}</h3>
                                <p className="text-gray-600">{booking.destination}</p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                booking.status === 'Confirmed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status}
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className="flex items-center text-sm text-gray-600 mb-1">
                                <FiCalendar className="mr-2" />
                                <span>
                                  {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium">Booking ID:</span>
                                <span className="ml-2">{booking.id}</span>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="text-lg font-bold">
                                ${booking.price}
                              </div>
                              <div className="space-x-3">
                                <button className="btn btn-secondary py-1 px-4 text-sm">
                                  View Details
                                </button>
                                {booking.status === 'Pending' && (
                                  <button className="btn bg-red-50 text-red-600 hover:bg-red-100 py-1 px-4 text-sm">
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">No bookings found</h3>
                    <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
                    <button
                      onClick={() => navigate('/packages')}
                      className="btn btn-primary"
                    >
                      Browse Packages
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
