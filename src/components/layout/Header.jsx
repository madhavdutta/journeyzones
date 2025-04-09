import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiUser, FiSearch } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import Logo from '../ui/Logo'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, signOut } = useAuth()
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error.message)
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="z-10">
          <Logo color={isScrolled ? 'text-primary-600' : 'text-primary-600'} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-1">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/packages" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Packages
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/packages" 
            className="hidden md:flex items-center text-gray-700"
          >
            <FiSearch className="mr-1" />
            <span>Search</span>
          </Link>

          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/profile" 
                className="flex items-center text-gray-700"
              >
                <FiUser className="mr-1" />
                <span>Profile</span>
              </Link>
              <button 
                onClick={handleSignOut}
                className="btn btn-primary py-2 px-4"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                to="/login" 
                className="py-2 px-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Log in
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary py-2 px-4"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="z-10 md:hidden" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >{/* Mobile Menu Button */}
          <button 
            className="z-10 md:hidden" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6 text-gray-700" />
            ) : (
              <FiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 z-0 flex flex-col items-center justify-center bg-white transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <nav className="flex flex-col items-center space-y-6 text-xl">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-gray-800 hover:text-primary-600 ${isActive ? 'text-primary-600 font-medium' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/packages" 
              className={({ isActive }) => 
                `text-gray-800 hover:text-primary-600 ${isActive ? 'text-primary-600 font-medium' : ''}`
              }
            >
              Packages
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-gray-800 hover:text-primary-600 ${isActive ? 'text-primary-600 font-medium' : ''}`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-gray-800 hover:text-primary-600 ${isActive ? 'text-primary-600 font-medium' : ''}`
              }
            >
              Contact
            </NavLink>
            
            {user ? (
              <>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => 
                    `text-gray-800 hover:text-primary-600 ${isActive ? 'text-primary-600 font-medium' : ''}`
                  }
                >
                  Profile
                </NavLink>
                <button 
                  onClick={handleSignOut}
                  className="btn btn-primary"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-800 hover:text-primary-600"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
