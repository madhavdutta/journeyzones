import { Link } from 'react-router-dom'

function Logo({ color = 'text-primary-600' }) {
  return (
    <Link to="/" className={`flex items-center font-bold text-2xl ${color}`}>
      <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
      </svg>
      <span className="font-display">Journey</span>
      <span className="text-luxury-gold">Zones</span>
    </Link>
  )
}

export default Logo
