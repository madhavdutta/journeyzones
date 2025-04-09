import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | Journey Zones'
  }, [])

  return (
    <div className="pt-24 pb-20 flex items-center justify-center min-h-[70vh]">
      <div className="container max-w-2xl text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-primary-600 mb-6">404</h1>
        <h2 className="text-3xl font-bold mb-4 font-display">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for seems to have wandered off on its own adventure.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
          <Link to="/packages" className="btn btn-secondary">
            Explore Packages
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
